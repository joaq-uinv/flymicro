import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Form = ({ isChecked, closeModal }) => {
  //set state with the inital values of the input fields
  const [flight, setFlight] = useState({
    origin: "",
    destination: "",
    price: 0,
    availability: 0,
    date: "",
  });
  //set state of the chosen flight i.e the data submitted in the form
  const [selected, setSelected] = useState([]);

  const handleChange = (e) =>
    //update the value of the input fields every time they are modified
    setFlight({ ...flight, [e.target.name]: e.target.value }); //spread operator to store each input update in the the state

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //persist data to db
    const res = await fetch("http://localhost:5000/api/v1/flights/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
    //parse response
    const { data } = await res.json();
    //populate the state with the data submitted in the form
    setSelected(data);
    //redirect to purchase
    history.push("/purchase");
  };

  //don't show modal if isChecked has an opposite value to the current value
  if (!isChecked) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal_container" onClick={closeModal} />

      <div className="modal_container_sec">
        <form onSubmit={handleSubmit}>
          <div className="text_inputs">
            <div className="input_container">
              <label htmlFor="origin">Origen</label>
              <input
                type="text"
                name="origin"
                value={flight.origin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="destination">Destino</label>
              <input
                type="text"
                name="destination"
                value={flight.destination}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="number_inputs">
            <div className="input_container">
              <label htmlFor="passengers">Cantidad de Pasajeros</label>
              <input
                type="number"
                name="availability"
                value={flight.availability}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="price">Precio de Cada Pasaje</label>
              <input
                type="number"
                name="price"
                value={flight.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="date_input">
            <div className="input_container">
              <label htmlFor="date">Fecha de partida</label>
              <input
                type="date"
                name="date"
                value={flight.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button className="form_btn" type="submit">
            Siguiente
          </button>
        </form>
      </div>
    </>,
    document.querySelector("#portal")
  );
};

export default Form;
