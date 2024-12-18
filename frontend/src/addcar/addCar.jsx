import React, { useState } from "react";
import "./addCar.css";
import { Link} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster

const AddCar = () => {
  const initialCarState = {
    carName: "",
    CIN: "",
    status: "",
    lastUpdate: "",
  };

  const [car, setCar] = useState(initialCarState);
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!car.carName || !car.CIN || !car.status) {
      toast.error("Please Fill In All Fields.", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/car", {
        ...car,
        lastUpdate: new Date().toISOString(),
      });
      toast.success("Car Added Successfully!", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Failed To Add Car. Please Try Again With Different CIN.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addCar">
      <Toaster /> 
      <Link to="/cars" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Car</h3>
      <form className="addCarForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="carName">Car Name:</label>
          <input
            type="text"
            id="carName"
            onChange={inputHandler}
            name="carName"
            autoComplete="off"
            placeholder="Enter Car Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="CIN">CIN:</label>
          <input
            id="CIN"
            onChange={inputHandler}
            name="CIN"
            autoComplete="off"
            placeholder="Enter CIN"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            onChange={inputHandler}
            name="status"
            autoComplete="off"
            placeholder="Enter Car Status"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;