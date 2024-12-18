import React, { useEffect, useState } from "react";
import "./updateCar.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateCar = () => {
  const initialCarState = {
    carName: "",
    CIN: "",
    status: "",
    lastUpdate: "",
  };

  const [car, setCar] = useState(initialCarState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/car/${id}`);
        setCar(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch car details. Please try again.", { position: "top-right" });
      }
    };
    fetchCar();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/update/car/${id}`, car);
      toast.success(response.data.message, { position: "top-right" }); // Show toast immediately
      setTimeout(() => {
        navigate("/cars"); 
      }, 1500); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to update car. Please try again.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addCar">
      <Toaster />
      <Link to="/cars" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Update Car</h3>
      <form className="addCarForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="carname">Car Name:</label>
          <input
            type="text"
            id="carname"
            value={car.carName}
            onChange={inputHandler}
            name="carName"
            autoComplete="off"
            placeholder="Enter Car Name"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="CIN">CIN:</label>
          <input
            type="text"
            id="CIN"
            value={car.CIN}
            onChange={inputHandler}
            name="CIN"
            autoComplete="off"
            placeholder="Enter CIN"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            value={car.status}
            onChange={inputHandler}
            name="status"
            autoComplete="off"
            placeholder="Enter status"
            required
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

export default UpdateCar;