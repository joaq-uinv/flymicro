import { useHistory } from "react-router-dom";
import "./styles.css";

const Footer = () => {
  //redirect to /about
  const history = useHistory();
  const handleClick = () => history.push("/about");

  return (
    <footer>
      <div className="footer_inner">
        <h2>Somos Flymicro.com</h2>
        <p>
          Somos los que no dejan que las distancias nos separen de los que más
          queremos. Somos los que hoy estamos acá y mañana podemos estar allá.
          Somos un equipo trabajando para que todos podamos volar.
        </p>
        <button onClick={handleClick}>¡CONOCENOS!</button>
      </div>
    </footer>
  );
};

export default Footer;
