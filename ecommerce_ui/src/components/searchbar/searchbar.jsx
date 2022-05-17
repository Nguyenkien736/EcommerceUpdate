import "../searchbar/searchbar.css"
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from "@mui/material";
export default function Searchbar(){
    return(
        <div className="searchBody">
            <Grid container direction="row" alignItems="center" className="gridparent">
                <Grid item className="buttonWrapper">
                    <SearchIcon className="searchbutton" />
                </Grid>
                <Grid item className="fieldWrapper">
                    <input className="searchfield" placeholder="Search your books"></input>
                </Grid>
            </Grid>
        </div>
    )
}