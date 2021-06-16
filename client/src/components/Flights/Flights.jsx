import React, { useState, useEffect } from "react";
import { MdDone } from "react-icons/md";
// import Selected from "../Selected/Selected";
import "./styles.css";
import Form from "../Form/Form";

const Flights = () => {
  //set state with the data fetched from api
  const [flight, setFlight] = useState([]);
  //set state with boolean values to toggle a component
  const [isChecked, setIsChecked] = useState(false);

  const toggleModal = async () => setIsChecked(!isChecked);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch data from api
        const res = await fetch("http://localhost:5000/api/v1/flights");
        //parse response and destructure the data obj
        const { data } = await res.json();
        //populate the state with the fetched data
        setFlight(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <section className="table_container">
      <table>
        <caption>Vuelos Disponibles</caption>
        <thead>
          <tr>
            <th scope="col">Origen</th>
            <th scope="col">Destino</th>
            <th scope="col">Precio</th>
            <th scope="col">Asientos Disponibles</th>
            <th scope="col">Fecha de Partida</th>
            <th scope="col">Continuar</th>
          </tr>
        </thead>
        <tbody>
          {/* create row with cells populated with the data fetched from the api */}
          {flight.map((f) => (
            <tr key={f._id} className="data">
              <>
                <td data-label="Origen">{f.origin}</td>
                <td data-label="Destino">{f.destination}</td>
                <td data-label="Precio">{f.price}</td>
                <td data-label="Asientos Dsiponibles">{f.availability}</td>
                <td data-label="Fecha de Partida">{f.date}</td>
                <td data-label="Seleccionar">
                  <MdDone className="check" onClick={toggleModal} />
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      {/* if isChecked = true, show the component */}
      {isChecked && <Form isChecked={isChecked} closeModal={toggleModal} />}
    </>
  );
};

export default Flights;