// backend/middleware/ServiceMiddleware.js
const ServiceInfo = require('../models/ServiceSchema');
const ServicesOnDay = require('../models/ServiceDaySchema');

// Helper: Build Date from yyyy-dd-mm
function parseDate(dateStr) {
    const [year, day, month] = dateStr.split('-');
    return {
        date: new Date(`${year}-${month}-${day}T00:00:00`),
        day,
        month,
        year
    };
}

// Middleware: Read and normalize date
function readDay(req, res, next) {
    let dateStr = req.query.date || req.params.date || req.body.date;
    if (!dateStr) {
        if (!req.today) {
            return res.status(400).json({ error: 'No date provided' });
        } else {
            req.date = req.today;
            const [year, month, day] = [
                req.date.getFullYear().toString(),
                String(req.date.getMonth() + 1).padStart(2, '0'),
                String(req.date.getDate()).padStart(2, '0')
            ];
            req.year = year;
            req.month = month;
            req.day = day;
            return next();
        }
    }


    const { date, day, month, year } = parseDate(dateStr);
    req.date = date;
    req.day = day;
    req.month = month;
    req.year = year;
    next();
}

// Middleware: Extract license plate
function getLicense(req, res, next) {
    const license =
        req.query.license || req.params.license ||
        (req.body.vehicle && req.body.vehicle.license);
    if (!license) {
        return res.status(400).json({ error: 'License number not provided' });
    }
    req.license = license;
    next();
}


// Middleware: Find or create a ServiceDay document
async function findServiceDay(req, res, next) {
    const { date, day, month, year } = req;

    let serviceDay = await ServicesOnDay.findOne({ date });

    if (!serviceDay) {
        serviceDay = new ServicesOnDay({ date });
        if (!serviceDay) {
            res.status(500).json({error: `Failed to create new service day for ${day}/${month}/${year}`})
        }
        await serviceDay.save();
    }

    req.ServiceDay = serviceDay;
    next();
}

// Middleware: Create a new service and add to ServiceDay
async function newService(req, res, next) {
    const { vehicle, servicesNeeded } = req.body;
    const { date, ServiceDay, day, month, year } = req;

    if (ServiceDay.isFull) {
        return res.status(400).json({
            error: `${day}/${month}/${year} is full. No further services can be scheduled.`
        });
    }

    const newService = new ServiceInfo({
        vehicle,
        servicesNeeded,
        scheduledDate: date
    });

    const savedService = await newService.save();

    ServiceDay.appointments.push(savedService._id);

    if (ServiceDay.appointments.length >= 3) {
        ServiceDay.isFull = true;
    }

    await ServiceDay.save();

    req.savedService = savedService;
    next();
}


// Middleware: Change scheduled date of a service by license plate
async function ChangeServiceDate(req, res, next) {
    const { license, date } = req;

    const updatedService = await ServiceInfo.findOneAndUpdate(
        { "vehicle.license": license },
        { scheduledDate: date },
        { new: true }
    );

    if (!updatedService) {
        return res.status(404).json({
            error: `No service scheduled for a vehicle with plate ${license}`
        });
    }

    req.updatedService = updatedService;
    next();
}

// Middleware: Get all services scheduled on a given day
async function getServices(req, res) {
    const { date, day, month, year } = req;

    const services = await ServicesOnDay.findOne({ date }).populate("appointments");

    if (!services) {
        return res.status(404).json({
            error: `No services scheduled on ${day}/${month}/${year}`
        });
    }

    res.status(200).json(services)
}

async function markCompleted(req, res) {
    const {date, license} = req
    const updatedService = await ServiceInfo.findOneAndUpdate(
        { "vehicle.license": license },
        { completedDate: date },
        { new: false }
    );

    
    if (!updatedService) {
        return res.status(404).json({ error: `No service found for vehicle with plate ${license}` });
    }

    await updatedService.save()
    
    res.status(200).send(`service of vehicle with plate ${license} was completed on ${day}/${month}/${year}`)
}

const ServiceInfo = require('../models/ServiceSchema');
const ServicesOnDay = require('../models/ServiceDaySchema');

async function deleteService(req, res) {
    const { date, license } = req;

    const deletedService = await ServiceInfo.findOneAndDelete({
        scheduledDate: date,
        "vehicle.license": license
    });

    if (!deletedService) {
        return res.status(404).json({
            error: `No service found for vehicle ${license} on the specified date`
        });
    }

    // Clean up reference from ServicesOnDay
    const serviceDay = await ServicesOnDay.findOne({ date });
    if (serviceDay) {
        serviceDay.appointments = serviceDay.appointments.filter(
            id => !id.equals(deletedService._id)
        );

        // Optionally mark day as not full if now below capacity
        if (serviceDay.appointments.length < 3) {
            serviceDay.isFull = false;
        }

        await serviceDay.save();
    }

    res.status(200).json({ message: "Service canceled successfully" });
}

// Export all middleware
module.exports = {
    newService,
    ChangeServiceDate,
    getServices,
    readDay,
    findServiceDay,
    getLicense,
    markCompleted,
    deleteService,
};
