// src/Components/Admin_Portal/Screens/AdminHomeScreen
import PageEditBlock from "../Sub-Components/PageEditBlock"
import "../Styles/Home.css"

function AdminHomeScreen(){
    const size = 300
    const pageID = {pageName: "home"}
    return (
        <div className="admin-home">
            <h1 className="">Integrity Auto</h1>
            <PageEditBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
            <PageEditBlock order={"text"} picSize={size} image="test2" parentID={pageID}/>
            <PageEditBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
        </div>
    )
}

export default AdminHomeScreen