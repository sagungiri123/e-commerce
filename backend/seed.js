const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    const adminName = process.env.ADMIN_NAME || "Super Admin";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
    const existingAdmin = await User.findOne({ email: adminEmail });


    if (existingAdmin) {
      console.log("⚠️  Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      userName: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🌱 Admin created successfully:");
    console.log(`   Name  : ${admin.userName}`);
    console.log(`   Email : ${admin.email}`);
    console.log(`   Role  : ${admin.role}`);
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
  }
};

module.exports = createAdmin;
