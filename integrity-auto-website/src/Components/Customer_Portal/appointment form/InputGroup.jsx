export default function InputGroup({labelText,placeholder,inType,width="230px"}) {
    return (
        <div className="formGroup">
            <label className="formItem-inputLabel" >{labelText}</label>
            <div 
                className="formItem-inputSpace std-box std-center"
                style={{width:width}}
            >
                <input
                    type={inType}
                    className="formItem-inputText std-in"
                    name={inType}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}