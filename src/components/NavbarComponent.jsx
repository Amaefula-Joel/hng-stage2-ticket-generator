import '../styles/navbar.css';
function Navbar() {
    return (
        <nav className="navbar flex justify-between items-center sm:px-6 px-3 py-2">
            <a className="navbar-brand" href="/">
                <img src="navbar-logo.png" className="h-7 md:h-10" alt="logo"/>
            </a>
            <ul className="hidden md:flex items-center">
                <li className="nav-item">
                    <a className="duration-200 hover:text-gray-300 text-gray-400 px-2.5 py-3 active" href="/">Events</a>
                </li>
                <li className="nav-item">
                    <a className="duration-200 hover:text-gray-300 text-gray-400 px-2.5 py-3" href="/">My Tickets</a>
                </li>
                <li className="nav-item">
                    <a className="duration-200 hover:text-gray-300 text-gray-400 px-2.5 py-3" href="/">About Projects</a>
                </li>
            </ul>

            <a href="/" className="md:px-4 px-3 py-1.5 text-sm md:text-md bg-gray-200 hover:bg-gray-300 duration-200 rounded-md font-semi-bold">My Ticket <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
        </nav>
    )
}
export default Navbar;