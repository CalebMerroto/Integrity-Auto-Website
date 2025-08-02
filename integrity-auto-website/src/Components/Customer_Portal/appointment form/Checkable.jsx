export default function Checkable({labelText}){
    return (
        <div className="formItem-checkable">
            <input
                type="checkbox"
                className="formItem-checkbox"
            />
            <label className="formItem-checkableLabel">{labelText}</label>
        </div>
    )
}