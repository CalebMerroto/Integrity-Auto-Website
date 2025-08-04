// backend/routes/ServiceRoutes.js
const express = require("express");
const router = express.Router();
const ServicesOnDay = require("../models/ServiceDaySchema"); 
const { getToday } = require('../middleware/middleware')
const { 
    readDay, 
    findServiceDay, 
    getLicense, 
    newService, 
    markCompleted, 
    ChangeServiceDate, 
    getServices,
    deleteService,
} = require('../middleware/ServiceMiddleware')


router.get('/all/onDay/:date',
    readDay, 
    getServices
)
router.get('/availability/:date',
    readDay, 
    async (req, res) => {
        const { date } = req;

        let serviceDay = await ServicesOnDay.findOne({ date });
        if (!serviceDay || !serviceDay.isFull) {
            res.status(200).json({isOpen: true})
        }
        res.status(200).json({isOpen: false})   
    }
)
router.post('/new/onDay/:date', 
    readDay, 
    findServiceDay, 
    newService
)
router.post('/complete/:license/:date', 
    getLicense, 
    getToday, 
    readDay, 
    markCompleted
)
router.put('/reschedule/:license/:date',
    getLicense,
    readDay,
    ChangeServiceDate,
    (req, res) => {
        const { license, day, month, year } = req
        res.status(200).json({
            message: `servicing for vehicle ${license} rescheduled for ${day}/${month}/${year}`
        })
    }
)
router.post('/cancel/:license/:date',
    readDay,
    getLicense,
    deleteService
)
router.put('/override/fullStatus/:date',
    readDay,
    findServiceDay,
    async (req, res) => {
        const { ServiceDay } = req;
        ServiceDay.isFull = false;
        await ServiceDay.save();
        res.status(200).json({ message: "ServiceDay full status overridden to false." });
    }
);

module.exports = router;
