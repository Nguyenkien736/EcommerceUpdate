import "../genrebar/genrebar.css"
// queries gerre and display link
import { Link } from "react-router-dom"
export default function Genrebar(){
    return(
        <div className="genreBody">
            <Link className="link" to="#">
                <div>
                Best Seller
                </div>
            </Link>
            <Link className="link" to='#'>
                <div>
                Best Rated
                </div>
            </Link>
            <Link className="link" to="#">
                <div>
                New Books
                </div>
            </Link>
            <Link className="link" to="#">
                <div>
                    For you
                    

                </div>
            </Link>
            <Link className="link" to='#'>
                <div>
                Genre
                </div>
            </Link>

        </div>
    )
}