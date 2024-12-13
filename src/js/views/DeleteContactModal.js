// DeleteContactModal.js
import React from "react";
import "../../styles/deleteContactStyles.css";


export const DeleteContactModal = ({ showModal, handleClose, handleDelete, contactId }) => {
  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }} aria-hidden={!showModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar este contacto?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(contactId)}>
              Borrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
