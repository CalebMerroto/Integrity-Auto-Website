// src/Components/Admin_Portal/Screens/AdminHomeScreen
import "../../Styles/Home.css"
import PageBlock from "./PageBlock"

function Home(){
    const size = 300
    const pageID = {pageName: "home"}
    return (
        <div className="admin-home">
            <h1 className="">Integrity Auto</h1>
            <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
            <PageBlock order={"text"} picSize={size} image="test2" parentID={pageID}/>
            <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
        </div>
    )
}

export default Home;