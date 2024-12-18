import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  CIN: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  lastUpdate: { 
    type: String,
    required: true,
  },
});

// Export the Car model
export default mongoose.model("Cars", carSchema); 