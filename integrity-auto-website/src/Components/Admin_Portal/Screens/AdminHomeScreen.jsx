// src/Components/Admin_Portal/Screens/AdminHomeScreen
import PageBlock from "../Sub-Components/PageBlock"
import "../Styles/Home.css"
import ImageSelect from "../Sub-Components/ImageSelect"

function AdminHomeScreen(){
    const size = 300
    const pageID = {pageName: "home"}
    return (
        <div className="admin-home">
            <ImageSelect id={pageID} />
            <h1 className="">Integrity Auto</h1>
            <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
            <PageBlock order={"text"} picSize={size} image="test2" parentID={pageID}/>
            <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
        </div>
    )
}

export default AdminHomeScreen