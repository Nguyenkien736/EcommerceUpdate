
import Genrebar from "../../components/genrebar/genrebar"
import Itemtab from "../../components/itemtab/itemtab"
import Topbar from "../../components/topbar/topbar"
import "../searchpage/searchpage.css"
export default function Searchpage(){
    const searchResult = ["Harry portter","toi la ai", "ai la toi"]
    return (
        <div className="searchpagebody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <div className="resdisplay">
                <ht></ht>
                <div className="header"> We find 3 result for "keywords"</div>
            <div className="searchResultWrapper">
                {
                        searchResult.map((res,index)=>(
                            <Itemtab></Itemtab>
                        ))
                }
            </div>
            </div>
        </div>
    )

}