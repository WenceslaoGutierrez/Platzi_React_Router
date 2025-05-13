import { NavLink} from "react-router-dom";

const Menu = () => {
    const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
      isActive ? "font-bold text-red-600" : "text-blue-600";

    type RouteItem = {
      to: string;
      text: string;
    };
    
    const routes: RouteItem[] = [];
    routes.push(
        {to: '/', text: 'Home'},
        {to: '/blog', text: 'Blog'},
        {to: '/profile', text: 'Profile'},
    );
    return (
        <nav className="bg-white p-4 shadow-md w-full rounded-b-md mb-2">
          <ul className="flex space-x-4">
            {routes.map(route =>(
                <li key={route.to}>
                    <NavLink to={route.to} className={getLinkClasses}>
                        {route.text}
                    </NavLink>
                </li>
            ))}
          </ul>
        </nav>
    );
};

export default Menu;
