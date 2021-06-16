import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";
import { SiGooglecalendar } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import "./styles.css";

const Selected = () => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/flights/");
        const { data } = await res.json();
        //populate the state with the last elem i.e the last posted flight
        setSelected(data[data.length - 1]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const history = useHistory();

  const handleClick = async (id) => {
    const res = await fetch(`http://localhost:5000/api/v1/flights/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await res.json();
    //redirect to home page
    history.push("/");
    return data;
  };

  return (
    <section className="card_container">
      <div className="selected_card">
        <p className="title">Tu vuelo</p>
        <div className="locations">
          <MdFlightTakeoff />
          <p style={{ marginLeft: ".5rem" }}>
            {selected.origin} a {selected.destination}
          </p>
        </div>
        <div className="departure">
          <SiGooglecalendar />
          <p style={{ marginLeft: ".5rem" }}>{selected.date}</p>
        </div>
        <div className="passengers">
          <FaUserCircle />
          <p style={{ marginLeft: ".5rem" }}>{selected.availability}</p>
        </div>
        <div className="total">
          <h3>Total</h3>
          <p style={{ marginLeft: ".5rem" }}>$ {selected.price}</p>
        </div>
      </div>
      <button onClick={() => handleClick(selected._id)}>Finalizar</button>
    </section>
  );
};

export default Selected;
