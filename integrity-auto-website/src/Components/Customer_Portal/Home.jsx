// src/Components/Admin_Portal/Screens/AdminHomeScreen
import "../../Styles/Home.css"
import PageBlock from "./PageBlock"

function Home(){
    const size = 300
    const pageID = {pageName: "home"}
    return (
        <div>
            <h1 className="header">Integrity Auto</h1>
            <div>
                <div>

                </div>
                <div className="home">
                    <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
                    <PageBlock order={"text"} picSize={size} image="test2" parentID={pageID}/>
                    <PageBlock order={"pic"} picSize={size} image="test2" parentID={pageID}/>
                </div>
            </div>
        </div>
    )
}

export default Home;