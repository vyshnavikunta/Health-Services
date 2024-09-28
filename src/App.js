import React, { useState } from "react";
import ServiceList from "./ServiceList"; // Import the ServiceList component
import './App.css'; // Assuming the styling is in App.css

const App = () => {
  const [services, setServices] = useState([
    { id: 1, name: "General Checkup", description: "A routine medical checkup.", price: 50 },
    { id: 2, name: "Dental Cleaning", description: "Professional teeth cleaning.", price: 75 },
    { id: 3, name: "Eye Examination", description: "A complete eye exam.", price: 100 }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    name: "",
    description: "",
    price: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsEditing(false);
    setCurrentService({ id: null, name: "", description: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({
      ...currentService,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!currentService.name || !currentService.description || !currentService.price) {
      alert("All fields are required.");
      return;
    }

    alert(isEditing ? "Service updated successfully!" : "Service added successfully!");

    if (isEditing) {
      const updatedServices = services.map((service) =>
        service.id === currentService.id ? currentService : service
      );
      setServices(updatedServices);
    } else {
      const newServiceItem = {
        id: services.length + 1,
        name: currentService.name,
        description: currentService.description,
        price: parseFloat(currentService.price)
      };
      setServices([...services, newServiceItem]);
    }

    setIsFormVisible(false);
    setCurrentService({ id: null, name: "", description: "", price: "" });
    setIsEditing(false);
  };

  const handleEdit = (service) => {
    setIsEditing(true);
    setIsFormVisible(true);
    setCurrentService(service);
  };

  const handleDelete = (id) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  return (
    <div className="container">
      <div className="header">
        {/* Add logo next to title */}
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <h1>Healthcare Services</h1>
      </div>

      <ServiceList services={services} onEdit={handleEdit} onDelete={handleDelete} />

      <button className="add-service-btn" onClick={toggleFormVisibility}>
        {isFormVisible ? "Cancel" : isEditing ? "Edit Service" : "Add Service"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="service-form">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={currentService.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Service Description"
            value={currentService.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Service Price"
            value={currentService.price}
            onChange={handleChange}
          />
          <button type="submit">{isEditing ? "Update Service" : "Submit Service"}</button>
        </form>
      )}
    </div>
  );
};

export default App;
