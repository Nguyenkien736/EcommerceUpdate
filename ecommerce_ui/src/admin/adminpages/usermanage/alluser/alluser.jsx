import "./alluser.css"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import Datatable from "../../../admincomponents/itemlist/itemlist"
import UserTable from "../../../admincomponents/usertable/usertable"

const AllUser = () => {
  return (
    <div className="list-allitem">
      <AdminSidebar/>
      <div className="listContainer-allitem">
        <AdminNavbar/>
        <UserTable></UserTable>
        
      </div>
    </div>
  )
}

export default AllUser