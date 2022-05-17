import '../genrefilterpage/genrefilter.css'
import Topbar from '../../components/topbar/topbar'
import Genrebar from '../../components/genrebar/genrebar'
import { useState } from 'react'
import Itemtab from '../../components/itemtab/itemtab'

export default function Genrrefilterpage(){
    const genres = ["action","fiction","documentary"]
    const [curgenre,setCurgenre] = useState("action")
    const actionbooks=["Harry potter","misfoutune","gotg"]
    return (
        <div className='genrefilterbody'>
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <div className='filterbody'>
            <div>
                <h2>
                Genre:</h2></div>
            <div className='genrefilter'>
                {
                    genres.map((genre,index)=>(
                        <div>
                            
                            <input type="radio" name='genres' id={genre}></input>
                            <label htmlFor={genre}>{genre}</   label>

                        </div>
                    )

                    )
                }

            </div>
            </div>
            <div className='itemdisplaybody'>
            <div><h2>{curgenre} :</h2></div>
            
            <div className='itemtabsWrapper'>
                {
                    actionbooks.map((book,index)=>(
                        
                            <Itemtab></Itemtab>

                        
                    ))
                }

            </div>
            </div>
            
        </div>
    )
}