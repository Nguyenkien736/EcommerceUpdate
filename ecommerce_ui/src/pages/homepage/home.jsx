import Topbar from "../../components/topbar/topbar"
import "../homepage/home.css"
import Genrebar from "../../components/genrebar/genrebar"
import Slideshow from "../../components/slidebanner/slide"
import Displaybody from "../../components/displaybody/displaybody"
import Footer from "../../components/botbar/botbar"
import { useParams } from "react-router-dom"
 
 

export default function HomePage() {
    const {numpage} = useParams()
    
    return (
        <div className="homepagebody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <Slideshow></Slideshow>
            <Displaybody numpage={numpage?numpage:1}></Displaybody>
            <Footer></Footer>
        </div>
    )
}
