import "./AdmNav.css";

function AdmNav() {
    return (
        <>
            <ul className="nav flex-column nav-container">
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">Vartotojas</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Sukurti vartotoja</a></li>
                        <li><a className="dropdown-item" href="#">Vart. sarasas</a></li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">Kategorijos</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Sukurti nauja kategorija</a></li>
                        <li><a className="dropdown-item" href="#">Kategoriju srasas</a></li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Ivykiu zurnalas</a>
                </li>

            </ul>
        </>

    );
}
export default AdmNav;