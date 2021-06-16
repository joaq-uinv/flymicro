import { Link } from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";
import "./styles.css";

//! agregar estilo adaptativo

const Header = () => {
  return (
    <header>
      <Link to="/" className="title_link">
        <h1>
          <GiCommercialAirplane style={{ marginRight: ".5rem" }} /> flymicro
        </h1>
      </Link>
      <ul className="nav">
        <li>
          <Link to="/about" className="link">
            Quiénes Somos
          </Link>
        </li>
        <li>
          <Link to="/flights" className="link">
            Vuelos
          </Link>
        </li>
        <li>
          <Link to="/help" className="link">
            Ayuda
          </Link>
        </li>
        <li>
          <Link to="/contact" className="last_link">
            Contactanos
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
