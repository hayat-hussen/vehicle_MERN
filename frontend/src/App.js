import "./App.css"; // Keep your CSS file as is
import AddCar from "./addcar/addCar";
import Car from "./getcar/Car";
import Welcome from "./Welcome"; // Ensure this matches the file name
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Update from "./updatecar/updateCar";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />, // Welcome page at root
    },
    {
      path: "/add",
      element: <AddCar />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
    {
      path: "/cars",
      element: <Car />,
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App; 