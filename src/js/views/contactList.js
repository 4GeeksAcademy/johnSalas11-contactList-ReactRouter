// ContactList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
            .then(response => response.ok ? response.json() : fetch("https://playground.4geeks.com/contact/agendas/JohnSalas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "JohnSalas" }),
            }).then(res => res.json()))
            .then(data => setAgenda(data));
    }, []);

    useEffect(() => {
        if (agenda?.slug) {
            fetch(`https://playground.4geeks.com/contact/agendas/${agenda.slug}/contacts`)
                .then(response => response.json())
                .then(data => setContacts(data.contacts || []));
        }
    }, [agenda]);
    
    console.log("Agenda:", agenda);
    
    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/JohnSalas/contacts/${id}`, { method: "DELETE" })
            .then(() => {
                setContacts(contacts.filter(contact => contact.id !== id));
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
        .then(response => response.json())
        .then(data => {
            setContacts(contacts.map(contact => contact.id === data.id ? data : contact));
            setShowModal(false);
        });
    };

    const handleEdit = (contact) => {
        setEditContact(contact);
        setShowModal(true);
    };

    const handleDeleteModalOpen = (contact) => {
        setContactToDelete(contact);
        setShowDeleteModal(true);
    };

    return (
        <div className="container">
            <h1>Lista de Contactos</h1>
            <Link to="/addContact">+ Nuevo contacto</Link>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id} className="card m-4 p-5">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Address:</strong> {contact.address}</p>
                        <p><strong>ID:</strong> {contact.id}</p>
                        <button onClick={() => handleEdit(contact)}>Editar</button>
                        <button onClick={() => handleDeleteModalOpen(contact)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            {showModal && (
                <EditContactModal
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    handleUpdate={handleUpdate}
                    editContact={editContact}
                />
            )}
            {showDeleteModal && (
                <DeleteContactModal
                    showModal={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={handleDelete}
                    contactId={contactToDelete?.id}
                />
            )}
        </div>
    );
};
