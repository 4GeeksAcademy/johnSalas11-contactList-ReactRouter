import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/addContactStyles.css";

export const AddContact = ({ addContactToList }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://playground.4geeks.com/contact/agendas/JohnSalas/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        address,
        id: parseInt(idNumber),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nuevo Contacto:", data);
        addContactToList(data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error al guardar el contacto:", error);
      });
  };

  return (
    <div className="container">
      <h1>Agregar Contacto</h1>
      <form className="m-3" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Teléfono</label>
          <input
            type="number"
            className="form-control"
            placeholder="+34 XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label">ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="ID"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Guardar Contacto
        </button>
      </form>

      <Link to="/contactList">Volver a la lista de contactos</Link>
    </div>
  );
};
