import "./allgenre.css"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import Datatable from "../../../admincomponents/itemlist/itemlist"
import GenreTable from "../../../admincomponents/genretable/genretable"


const AllGenre = () => {
  return (
    <div className="all-genre-wrapper">
      <AdminSidebar/>
      <div className="all-genre-body-wrapper">
        <AdminNavbar/>
        <GenreTable></GenreTable>
      </div>
    </div>
  )
}

export default AllGenre