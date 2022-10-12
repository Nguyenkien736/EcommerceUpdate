import Topbar from "../../components/topbar/topbar"
import "../successfulorderpage/successorder.css"
import Genrebar from "../../components/genrebar/genrebar"
import Slideshow from "../../components/slidebanner/slide"
import Displaybody from "../../components/displaybody/displaybody"
import Footer from "../../components/botbar/botbar"
export default function SuccessOrderPage() {
    return (
        <div className="homepagebody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <Slideshow></Slideshow>
            <div className="ordersuccessbody">

                <div className="card">
                    <div className="checkmarkWrapper">
                        <i className="checkmark">✓</i>
                    </div>
                    <h1 className="successTitle">Success</h1>
                    <p className="promt">We received your purchase request;<br /> we'll be in touch shortly!</p>

                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
