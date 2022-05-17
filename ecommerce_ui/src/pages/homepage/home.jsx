import Topbar from "../../components/topbar/topbar"
import "../homepage/home.css"
import Genrebar from "../../components/genrebar/genrebar"
import Slideshow from "../../components/slidebanner/slide"
import Displaybody from "../../components/displaybody/displaybody"
export default function HomePage(){
    return(
        <div className="homepagebody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <Slideshow></Slideshow>
            <Displaybody></Displaybody>
        
        </div>
    )
}
