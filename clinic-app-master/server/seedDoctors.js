import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Doctor from "./models/doctor.js";

dotenv.config();

const doctorsData = [
  {
    name: "Dr. Sharma",
    email: "sharma@clinic.com",
    password: "password123",
    specialty: "Dentist",
    availableSlots: ["10:00", "11:00", "15:00"]
  },
  {
    name: "Dr. Mehta",
    email: "mehta@clinic.com",
    password: "password123",
    specialty: "Cardiologist",
    availableSlots: ["09:00", "14:00", "16:00"]
  },
  {
    name: "Dr. Kapoor",
    email: "kapoor@clinic.com",
    password: "password123",
    specialty: "Dermatologist",
    availableSlots: ["12:00", "13:00", "15:30"]
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const doc of doctorsData) {
      const existingDoctor = await Doctor.findOne({
        email: doc.email
      });

      if (!existingDoctor) {
        const hashedPassword = await bcrypt.hash(
          doc.password,
          10
        );

        await Doctor.create({
          ...doc,
          password: hashedPassword
        });

        console.log(`${doc.name} added successfully`);
      } else {
        console.log(`${doc.name} already exists`);
      }
    }

    console.log("Doctor setup completed!");

  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

run();