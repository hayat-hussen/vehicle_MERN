import express from "express";

import {
  create,
  deleteCar,
  getAllCar,
  getCarById,
  update
} from "../controller/carController.js";

const router = express.Router();

router.post("/car", create);
router.get("/cars", getAllCar);
router.get("/car/:id",getCarById );
router.put("/update/car/:id", update);
router.delete("/delete/car/:id", deleteCar);

export default router;