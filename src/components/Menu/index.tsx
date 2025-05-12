import { NavLink, Link } from "react-router-dom";

const Menu = () => {
    const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
      isActive ? "font-bold text-red-600" : "text-blue-600";
    
    const routes = [];
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

            {/* <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li> */}
          
            {/* <li>
              <NavLink to="/" className={getLinkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={getLinkClasses}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={getLinkClasses}>
                Profile
              </NavLink>
            </li> */}
           
          </ul>
        </nav>
    );
};

export default Menu;
