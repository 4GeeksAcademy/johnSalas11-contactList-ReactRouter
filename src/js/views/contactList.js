import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/contactListStyles.css";
import { EditContactModal } from "./EditContactModal";
import { DeleteContactModal } from "./DeleteContactModal";

export const ContactList = () => {
    const [agenda, setAgenda] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        fetch("https://playground.4geeks.com/contact/agendas/JohnSalas", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.ok ? response.json() :
                fetch("https://playground.4geeks.com/contact/agendas/JohnSalas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: "JohnSalas" }),
                }).then((response) => response.json())
            )
            .then((agendaData) => setAgenda(agendaData));
    }, []);

    useEffect(() => {
        if (agenda?.slug) {
            fetch(`https://playground.4geeks.com/contact/agendas/${agenda.slug}/contacts`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => setContacts(data.contacts || []));
        }
    }, [agenda]);

    const handleDelete = (contactId) => {
        fetch(`https://playground.4geeks.com/contact/agendas/JohnSalas/contacts/${contactId}`, {
            method: "DELETE",
        }).then(() => {
            setContacts(contacts.filter((contact) => contact.id !== contactId));
            setShowDeleteModal(false);
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedContact = { ...editContact };
        fetch(`https://playground.4geeks.com/contact/agendas/JohnSalas/contacts/${editContact.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedContact),
        })
            .then((response) => response.json())
            .then((updatedData) => {
                setContacts((prevContacts) =>
                    prevContacts.map((contact) =>
                        contact.id === updatedData.id ? updatedData : contact
                    )
                );
                setShowModal(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (contact) => {
        setEditContact(contact);
        setShowModal(true);
    };

    const handleDeleteModalOpen = (contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="container">
            <h1>Lista de Contactos</h1>
            <Link to="/addContact">+ Nuevo contacto</Link>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id} className="card m-4 p-5">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Address:</strong> {contact.address}</p>
                        <p><strong>ID:</strong> {contact.id}</p>
                        <Link className="btn btn-primary" onClick={() => handleEdit(contact)}>Editar</Link>
                        <Link className="btn btn-primary" onClick={() => handleDeleteModalOpen(contact)}>Eliminar</Link>
                    </li>
                ))}
            </ul>

            {showModal && (
                <EditContactModal
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    handleUpdate={handleUpdate}
                    editContact={editContact}
                    handleChange={handleChange}
                />
            )}

            {showDeleteModal && (
                <DeleteContactModal
                    showModal={showDeleteModal}
                    handleClose={handleDeleteModalClose}
                    handleDelete={handleDelete}
                    contactId={contactToDelete?.id}
                />
            )}
        </div>
    );
};
