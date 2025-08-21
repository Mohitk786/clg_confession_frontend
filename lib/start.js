import { dbConnect } from "./dbConnect.js";
import College from "../models/College.js";
import { colleges } from "../constants/colleges.js"; 

const seedDB = async () => {
  try {
    await dbConnect();

    console.log("Seeding database...", colleges[0]?.name);
   
    await College.deleteMany({});

    await College.insertMany(colleges);

    console.log(" Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  }
};

seedDB();
