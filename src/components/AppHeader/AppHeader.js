import logo from "../../images/logo.png";
import './AppHeader.css';

function AppHeader() {
    return (
        <div className="header-container">
            <h2>Laboratorio Clinico</h2>
            <img src={logo}/>
        </div>
    );
}

export default AppHeader;
