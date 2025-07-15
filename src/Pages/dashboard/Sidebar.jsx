import { NavLink } from "react-router";



import { IoHome } from "react-icons/io5";
import { FaUserEdit, FaPlus, FaRegListAlt, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
// import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
//   const { user } = useAuth();

  const navItems = [
    { to: "/", icon: <IoHome />, label: "Home" },
  
    { to: "/dashboard/organizer/profile", icon: <FaUserEdit />, label: "Organizer Profile" },
    { to: "/dashboard/organizer/add-camp", icon: <FaPlus />, label: "Add A Camp" },
    { to: "/dashboard/organizer/manage-camps", icon: <FaRegListAlt />, label: "Manage my Camps" },
    { to: "/dashboard/organizer/manage-registered-camps", icon: <FaUsers />, label: " Manage Registered Camps" },
    { to: "/dashboard/participant/registered-camps", icon: <FaUsers />, label: "Registered participant Camps" },
    { to: "/dashboard/participant/payment-history", icon: <FaUsers />, label: "Payment history" },
  ];

  return (
    <div className="drawer lg:drawer-open">
      {/* Toggle Button for Mobile */}
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="sidebar-toggle"
          className="btn bg-green-800 text-white drawer-button lg:hidden m-4 w-fit"
        >
          ☰ Menu
        </label>
      </div>

      {/* Sidebar content */}
     {/* Sidebar content */}
<div className="drawer-side z-40">
  <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
  <aside className="w-64 sticky top-0 h-screen bg-white border-r shadow-md p-4">
    <div className="text-2xl font-bold text-green-800 mb-6">
      MCMS
    </div>

    <nav className="flex flex-col gap-3">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md font-semibold border transition duration-200 ${
              isActive
                ? "bg-green-800 text-white"
                : "bg-white text-green-800 border-green-800 hover:bg-green-50"
            }`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
</div>

    </div>
  );
};

export default Sidebar;
