const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/usermodel'); // Import the user model
const router = express.Router();
const mongoose = require('mongoose');

router.post('/member/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            startDate: req.body.startDate,
            plan: req.body.plan,
            trainer: req.body.trainer || '', 
            fitnessGoals: req.body.fitnessGoals,
            paymentStatus: req.body.paymentStatus
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
});

router.get('/member/getall', async (req, res) => {
    try {
      const members = await User.find().sort({ name:1 });
      res.json(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).json({ message: 'Error fetching members', error: error.message });
    }
  });

  router.post('/member/update', async (req, res) => {
    try {
        const memberId = req.body.id; // assuming member's ID is sent in the request body
        const updateFields = {};

        // Set fields to update based on request data
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.phone) updateFields.phone = req.body.phone;
        if (req.body.gender) updateFields.gender = req.body.gender;
        if (req.body.dob) updateFields.dob = req.body.dob;
        if (req.body.startDate) updateFields.startDate = req.body.startDate;
        if (req.body.plan) updateFields.plan = req.body.plan;
        if (req.body.trainer) updateFields.trainer = req.body.trainer;
        if (req.body.fitnessGoals) updateFields.fitnessGoals = req.body.fitnessGoals;
        if (req.body.paymentStatus) updateFields.paymentStatus = req.body.paymentStatus;

        const result = await User.updateOne(
            { _id: memberId },
            { $set: updateFields }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Member updated successfully' });
        } else {
            res.status(400).json({ message: 'No changes made or member not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Update failed', error: error.message });
    }
});


  router.delete('/member/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Check if the id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid member ID' });
      }
  
      const deletedMember = await User.findByIdAndDelete(id);
  
      if (!deletedMember) {
        return res.status(404).json({ message: 'Member not found' });
      }
  
      res.json({ message: 'Member deleted successfully', deletedMember });
    } catch (error) {
      console.error('Error deleting member:', error);
      res.status(500).json({ message: 'Error deleting member', error: error.message });
    }
  });
  router.get('/member/:id', async (req, res) => {
    const memberId = req.params.id;
    
    try {
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        
        res.json(member); // Sends the member details as a response
    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;