import "./allitem.css"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import Datatable from "../../../admincomponents/itemlist/itemlist"


const AllItem = () => {
  return (
    <div className="list-allitem">
      <AdminSidebar/>
      <div className="listContainer-allitem">
        <AdminNavbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default AllItem