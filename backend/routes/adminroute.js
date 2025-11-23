
const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/adminmodel'); // Import the Admin model
const router = express.Router();

// Route to add an admin (for manual addition via Postman)
router.post('/add-admin', async (req, res) => {
  const { email, password } = req.body;
  
  const emailExists = await Admin.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                status: false,
                msg: "Email already exists"
            });
        }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email:email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).send('Admin created successfully');
  } catch (error) {
    res.status(500).send('Error creating admin: ' + error.message);
  }
});

// Route for admin login
router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find the admin by email
      const admin = await Admin.findOne({ email });

      if (!admin) {
          return res.status(400).json({ message: 'Admin not found' });
      }

      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If login successful
      res.status(200).json({ message: 'Login successful' });
  } catch (error) {
      res.status(500).json({ message: 'Error during login: ' + error.message });
  }
});

router.post('/passchange', async (req, res) =>{
    const {email , newpass} = req.body;

    try{
      const admin = await Admin.findOne({ email });

      if(!admin){
        return res.status(400).json({ message: ' Admin Not Found'});
      }
      
      const hashedPassword = await bcrypt.hash(newpass,10);

      admin.password=hashedPassword;
      await admin.save();
      
      res.status(200).json({ message: 'Password successfully changed' });

    }catch (error) {
      res.status(500).json({ message: 'Error occured ' + error.message });
  }

});

module.exports = router;
