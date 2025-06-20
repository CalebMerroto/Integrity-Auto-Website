import PageBlock from "./PageBlock"


function AdminHomeScreen(){
    const size = 300

    return (
        <div className="admin_home" style={{alignContent:"center"}}>
            <h1>Integrity Auto</h1>
            <PageBlock order={"pic"} picSize={size} uuid="test2"/>
            <PageBlock order={"text"} picSize={size} uuid="test2"/>
            <PageBlock order={"pic"} picSize={size} uuid="test2"/>
        </div>
    )
}

export default AdminHomeScreen