import "../../../Styles/AppointmentForm.css"
import Checkable from "./Checkable";
import InputGroup from "./InputGroup";

const US_STATE_ABBREVIATIONS = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];


export default function AppointmentForm() {
    return (
        <form>
            <h2>Customer Info:</h2>
            <div className="formSection-hor">
                <div className="formSection-vert">
                    <InputGroup
                        labelText="Name"
                        placeholder="name"
                        inType="text"
                        />
                    <div className="formGroup">
                        <label className="formItem-inputLabel">Phone</label>
                        <div className="formItem-inputSpace std-box std-center">
                            <input
                                type="tel"
                                className="formItem-inputText std-in"
                                name="phone"
                                placeholder="(___) ___-____"
                                style={{width:"140px"}}
                                />
                            <label className="formItem-inputSubLabel" htmlFor="allowText">Allow Texting</label>
                            <div className="formItem-wrapper std-box std-center">
                                <input
                                    type="checkbox"
                                    id="allowText"
                                    name="allowText"
                                    className="formItem-checkbox std-in"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="formSection-vert">
                    <InputGroup
                        labelText="Date"
                        placeholder="00/00/0000"
                        inType="date"
                        />
                    <InputGroup
                        labelText="Email"
                        placeholder="name@example.com"
                        inType="email"
                        />
                </div>
            </div>
            <InputGroup
                labelText="Address"
                placeholder="name@example.com"
                inType="text"
                width="587px"
                />
            <div className="formSection-hor">
                <InputGroup 
                    labelText="City"
                    placeholder="city"
                    inType="text"
                    width="150px"
                    />
                <div className="formGroup">
                    <label className="formItem-inputLabel">State</label>
                    <div 
                        className="formItem-inputSpace std-box std-center" 
                        style={{ width: "70px" }}
                        >
                        <select
                            className="formItem-inputText std-in"
                            name="state"
                            >
                            <option value="">--</option>
                            {US_STATE_ABBREVIATIONS.map((abbr) => (
                                <option key={abbr} value={abbr}>
                                {abbr}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <InputGroup 
                    labelText="Zip"
                    placeholder="00000"
                    inType="number"
                    width="119px"
                    />
            </div>
            <h2>Vehicle Info:</h2>
            <div className="formSection-hor">
                <div className="formSection-vert">
                    <InputGroup
                        labelText="Year"
                        placeholder="0000"
                        inType="text"
                    />
                    <InputGroup
                        labelText="Make"
                        placeholder="Company Name"
                        inType="text"
                    />
                    <InputGroup
                        labelText="Model"
                        placeholder="Model"
                        inType="text"
                    />
                </div>
                <div className="formSection-vert">
                    <InputGroup
                        labelText="Color"
                        placeholder="black"
                        inType="text"
                    />
                    <InputGroup
                        labelText="Milage"
                        placeholder="3485459"
                        inType="text"
                    />
                    <InputGroup
                        labelText="License No."
                        placeholder="---"
                        inType="text"
                    />
                </div>
            </div>
            <h2>Check / Repair the Following</h2>
            <div className="formSection-hor">
                <div className="formSection-vert">
                    <Checkable labelText="Lubricant Service" />
                    <Checkable labelText="Air Cleaner" />
                    <Checkable labelText="Oil Leaks" />
                    <Checkable labelText="Oil & Filter" />
                    <Checkable labelText="Engine Tune-Up" />
                    <Checkable labelText="Transmission Service" />
                </div>
                <div className="formSection-vert">
                    <Checkable labelText="State Inspection" />
                    <Checkable labelText="Balance Wheels" />
                    <Checkable labelText="Rotate Tires" />
                    <Checkable labelText="Align Front End" />
                    <Checkable labelText="Service A/C" />
                    <Checkable labelText="Service Breaks" />
                </div>
            </div>
            <h2>Other Services Desired / Description of Problem</h2>
            <textarea className="std-in" style={{width:"600px", height:"300px"}}/>
        </form>
    );
}
