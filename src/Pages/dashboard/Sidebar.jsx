import { NavLink } from "react-router"; // Updated: make sure you're using react-router **dom**
import {
  IoHome
} from "react-icons/io5";
import {
  FaUserEdit,
  FaPlus,
  FaRegListAlt,
  FaUsers,
  FaHistory,
  FaChartBar,
} from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";

const Sidebar = () => {
  const { role, isRoleLoading } = useUserRole();

  // Show loading during role fetch
  if (isRoleLoading) {
    return (
      <div className="text-center text-green-700 py-10 font-semibold">
        Loading Sidebar...
      </div>
    );
  }

  // Common items (like Home)
  const commonNav = [
    {
      to: "/",
      icon: <IoHome />,
      label: "Home",
    },
  ];

  // Organizer/Admin routes
  const organizerNav = [
    {
      to: "/dashboard/organizer/profile",
      icon: <FaUserEdit />,
      label: "Organizer Profile",
    },
    {
      to: "/dashboard/organizer/add-camp",
      icon: <FaPlus />,
      label: "Add A Camp",
    },
    {
      to: "/dashboard/organizer/manage-camps",
      icon: <FaRegListAlt />,
      label: "Manage Camps",
    },
    {
      to: "/dashboard/organizer/manage-registered-camps",
      icon: <FaUsers />,
      label: "Manage Registered Camps",
    },
  ];

  // Participant routes
  const participantNav = [
    {
      to: "/dashboard/participant/analytics",
      icon: <FaChartBar />,
      label: "Analytics",
    },
    {
      to: "/dashboard/participant/profile",
      icon: <FaUserEdit />,
      label: "Participant Profile",
    },
    {
      to: "/dashboard/participant/registered-camps",
      icon: <FaUsers />,
      label: "Registered Camps",
    },
    {
      to: "/dashboard/participant/payment-history",
      icon: <FaHistory />,
      label: "Payment History",
    },
  ];

  // Select routes based on role
  let navItems = [...commonNav];
  if (role === "admin" || role === "organizer") {
    navItems = [...navItems, ...organizerNav];
  } else if (role === "participant") {
    navItems = [...navItems, ...participantNav];
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="sidebar-toggle"
          className="btn bg-green-800 text-white drawer-button lg:hidden m-4 w-fit"
        >
          ☰ Menu
        </label>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
        <aside className="w-64 sticky top-0 h-screen bg-white border-r shadow-md p-4">
          <div className="text-2xl font-bold text-green-800 mb-6">MCMS</div>

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
