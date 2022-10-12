import "./allorder.css"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import Datatable from "../../../admincomponents/itemlist/itemlist"
import OrderTable from "../../../admincomponents/ordertable/ordertable"

const AllOrder = () => {
  return (
    <div className="list-allitem">
      <AdminSidebar/>
      <div className="listContainer-allitem">
        <AdminNavbar/>
        <OrderTable></OrderTable>
      </div>
    </div>
  )
}

export default AllOrder