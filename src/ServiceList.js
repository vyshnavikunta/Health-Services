import React from "react";

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div>
      {services.length === 0 ? (
        <p className="no-services-message">Services not available as of now</p>
      ) : (
        services.map((service) => (
          <div key={service.id} className="service-container">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <button className="edit-service-btn" onClick={() => onEdit(service)}>
              Edit
            </button>
            <button
              className="delete-service-btn"
              onClick={() => onDelete(service.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceList;
