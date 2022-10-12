import "../searchbar/searchbar.css"
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from "@mui/material";
import { useState } from "react";
import Itemcue from "../itemcue/itemcue";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import{ Redirect} from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function Searchbar(){

    const [inp,setInp] = useState("");
    const [listItem,setListItem] = useState([]);
    const [buttonClicked,setButtonClicked] = useState(false)
    useEffect(()=>{

        async function fetchdata() {
            const response = await axios.get("/item/getitem-with-cue/"+inp)
            setListItem([])
            if(response.status==200)
            setListItem(response.data)
            console.log(response.data)
        }
        if(inp != "")
        fetchdata()
        else{
            setListItem([]);
        }
    },[inp])
    function handleClickCue(){
        setListItem([]);
    }
    function handleInputEnterd(event){
        if (event.key === "Enter") {
            console.log('Enter key pressed')
          }
    }
    function handleSearchButton(){
        setButtonClicked(!buttonClicked)
    }
    function handleOnInputChange(){
       
    }
    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);
    
        // console.log(message);
    
        if (event.key === 'Enter') {
          // 👇️ your logic here
          setButtonClicked(!buttonClicked);
          window.location.href="http://localhost:3000/searchpage/"+inp
        }
      };

    
    return(
        <div className="outSideWrapper">
            {
                
            }
        {
            
          // buttonClicked&&(<Navigate to={"/searchpage/"+inp}></Navigate>)
            
        }
        <div className="searchBody">
           

           <Grid container direction="row" alignItems="center" className="gridparent">
               <Grid item className="buttonWrapper">
                   <div className="searchButton" onClick={handleSearchButton}>
                       <Link to={"/searchpage/"+inp}>
                   <SearchIcon className="searchbutton"/>
                   </Link>
                   </div>
                   
               </Grid>
               <Grid item className="fieldWrapper">
                   <input id="search" className="searchfield" placeholder="Search your books" value={inp} onKeyDown={handleKeyDown} onChange={(e)=>setInp(e.target.value)&&handleOnInputChange()} ></input>
                   
               </Grid>
              
           </Grid>
           
           </div>
           {

           listItem.length!=0 && listItem.map((item)=>(
               <Itemcue item={item} cb={handleClickCue}></Itemcue>
           ))
           }
        
        </div>
    )
}