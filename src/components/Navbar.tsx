import Logo from "../assets/stackline_logo.svg";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <div className='nav-container'>
            <img src={Logo} alt='Stackline Logo' />
        </div>
    )
}

export default Navbar;