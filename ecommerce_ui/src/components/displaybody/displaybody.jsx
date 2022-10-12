import '../displaybody/displaybody.css'
import Itemtab from "../itemtab/itemtab";

import axios from "axios"
import { useState, useEffect } from 'react';


export default function Displaybody({ yourpick,numpage }) {

    const arr = [1, 2, 3, 4, 5, 6]
    const pages = [1, 2, 3]
    
    const page = parseInt(numpage)
    const [itemlist, setItemlist] = useState([])
    const [itemNum,setItemNum] = useState(0)
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get('/item/bestsellers/'+numpage)
            const res2 = await axios.get('/item/countitem')
            setItemlist(response.data)
            setItemNum(res2.data.count)
        }
        fetchdata()

    }, [])


    return (
        <div className="displaybody">
            <div>
                <h1>Your Picks</h1>
            </div>
            <div className='itemtabsWrapper'>
                {
                    itemlist.map((element) => (
                        <Itemtab iteminfo={element}>

                        </Itemtab>
                    )
                    )

                }

            </div>
            <div class="center">
  {

    page==1?(
        <div class="pagination">
   
        <a href={page}>&laquo;</a>
       
        <a href={page} class="active">{page}</a>
        <a href={page+1} hidden={itemNum<page+1?true:false}>{page+1}</a>
        <a href={page+2} hidden={itemNum<page+2?true:false}>{page+2}</a>
        <a href={page+3} hidden={itemNum<page+3?true:false}>{page+3}</a>
        <a href={page+4} hidden={itemNum<page+4?true:false}>{page+4}</a>
        <a href={page+5} hidden={itemNum<page+5?true:false}>{page+5}</a>
        <a href={page+1}>&raquo;</a>
        </div>

    ): page<itemNum-4?(
        
            
        
        <div class="pagination">
   
        <a href={page-1}>&laquo;</a>
        <a href={page-1}>{page-1}</a>
        <a href={page} class="active">{numpage}</a>
        <a href={page+1} hidden={itemNum<page+1?true:false}>{page+1}</a>
        <a href={page+2} hidden={itemNum<page+2?true:false}>{page+2}</a>
        <a href={page+3} hidden={itemNum<page+3?true:false}>{page+3}</a>
        <a href={page+4} hidden={itemNum<page+4?true:false}>{page+4}</a>
        <a href={page+1}>&raquo;</a>
        </div>

    ):(
        <div class="pagination">
             <a href={page-1}>&laquo;</a>
        <a href={itemNum-5} class={page==itemNum-5?"active":""} hidden={itemNum-5<=0?true:false}>{itemNum-5}</a>
        <a href={itemNum-4} class={page==itemNum-4?"active":""} hidden={itemNum-4<=0?true:false}>{itemNum-4}</a>
        <a href={itemNum-3} class={page==itemNum-3?"active":""} hidden={itemNum-3<=0?true:false}>{itemNum-3}</a>
        <a href={itemNum-2} class={page==itemNum-2?"active":""} hidden={itemNum-2<=0?true:false}>{itemNum-2}</a>
        <a href={itemNum-1} class={page==itemNum-1?"active":""} hidden={itemNum-1<=0?true:false}>{itemNum-1}</a>
        <a href={itemNum} class={page==itemNum?"active":""}>{itemNum}</a>
        <a href={itemNum}>&raquo;</a>
            
        </div>
        
    )
  }
 
</div>

        </div>
    )

}