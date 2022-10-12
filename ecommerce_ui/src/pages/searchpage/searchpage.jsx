
import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import Genrebar from "../../components/genrebar/genrebar"
import Itemtab from "../../components/itemtab/itemtab"
import Topbar from "../../components/topbar/topbar"
import "../searchpage/searchpage.css"
import { Navigate, useParams } from "react-router-dom"
import { useState } from "react"
import Footer from "../../components/botbar/botbar"



export default function Searchpage() {
    const { searchphrase } = useParams()
    const [itemList, setItemList] = useState([])
    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get("/item/search/?value=" + searchphrase)
            setItemList(response.data)
            console.log(searchphrase)
        }
        fetchdata()

    }, [searchphrase])
    return (
        <div className="searchpagebody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <div className="resdisplay">
                <ht></ht>
                <div className="header"> We find {itemList.length} result for "{searchphrase}"</div>
                <div className="searchResultWrapper">
                    {
                        itemList.map((res, index) => (
                            <Itemtab iteminfo={res}></Itemtab>
                        ))
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    )

}