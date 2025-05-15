import { NavLink} from "react-router-dom";
import type { RouteItem } from "../../types";
import { useAuth } from "../../hooks";

const Menu = () => {
    const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
      isActive ? "font-bold text-red-600" : "text-blue-600";
    
    const routes: RouteItem[] = [];
    
    routes.push(
        {to: '/', text: 'Home', private: false},
        {to: '/blog', text: 'Blog', private: false},
        {to: '/profile', text: 'Profile', private: true},
        {to: '/login', text: 'Login', private: false},
        {to: '/logout', text: 'Log Out', private: true},
        {to: '/signup', text: 'Sign Up', private: false},
    );

    const { signOut } = useAuth();
    const isAuthenticated = !signOut;
    const filteredRoutes = routes.filter((route) => {
      if (route.private) {
        return isAuthenticated;
      }

      if (route.to === "/login" || route.to === "/signup") {
        return !isAuthenticated;
      }
      return true;
    });
    
    return (
      <nav className="bg-white p-4 shadow-md w-full rounded-b-md mb-2">
        <ul className="flex space-x-4">
          {filteredRoutes.map((route) => (
            <li key={route.to}>
              <NavLink
                to={route.to}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-semibold" : "text-gray-700"
                }
              >
                {route.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
};

export default Menu;
