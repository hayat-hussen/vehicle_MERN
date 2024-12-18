import React, { useEffect, useState } from "react";
import "./car.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cars");
        setCars(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
        toast.error("Failed to fetch cars. Please try again.", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, { position: "top-right" });
    }
  }, [location.state]);

  const deleteCar = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/delete/car/${carId}`);
        
        // Update state after successful deletion
        setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
        
        // Show success toast after deletion
        toast.success(response.data.message, { position: "top-right" });
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete car. Please try again.", { position: "top-right" });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    
    <div className="vehicleTable">
       <Link to="/" type="button" className="btn btn-secondary">
              <i className="fa-solid fa-house"></i> 
            </Link>
      <Link to="/add" className="actionbutton btn btn-primary">
        Add <i className="fa-solid fa-car"></i>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Vehicle Name</th>
            <th scope="col">CIN</th>
            <th scope="col">Status</th>
            <th scope="col">Last Update</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car._id}>
              <td>{index + 1}</td>
              <td>{car.carName}</td>
              <td>{car.CIN}</td>
              <td>{car.status}</td>
              <td>{car.lastUpdate}</td>
              <td className="actionButtons">
                <Link to={`/update/${car._id}`} className="btn btn-info">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button onClick={() => deleteCar(car._id)} className="btn btn-danger">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Car;