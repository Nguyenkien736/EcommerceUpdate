import '../displaybody/displaybody.css'
import Itemtab from "../itemtab/itemtab";

import axios from "axios"
import { useState,useEffect } from 'react';


export default function Displaybody({yourpick}){
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const pages = [1,2,3]
    const [itemlist,setItemlist] = useState([])
    useEffect(()=>{
        const fetchdata = async ()=>{
            const response = await axios.get('/item/bestsellers/1')
            setItemlist(response.data)
        }
        fetchdata()  

    },[])


    return(
        <div className="displaybody">
            <div>
                <h1>Your Picks</h1>
            </div>
            <div className='itemtabsWrapper'>
                {
                    itemlist.map((element)=>(
                            <Itemtab iteminfo={element}>

                            </Itemtab>
                    )
                    )

                }
                
            </div>
            
        </div>
    )

}