import React, { useState, useEffect } from "react";

const ServiceForm = ({ addService, updateService, editingService }) => {
  const [service, setService] = useState({ id: null, name: "", description: "" });

  useEffect(() => {
    if (editingService) {
      setService(editingService);
    }
  }, [editingService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service.id) {
      updateService(service);
    } else {
      addService({ ...service, id: Date.now() });
    }
    setService({ id: null, name: "", description: "" });
  };

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={service.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={service.description}
        onChange={handleChange}
        required
      />
      <button type="submit">{service.id ? "Update Service" : "Add Service"}</button>
    </form>
  );
};

export default ServiceForm;
