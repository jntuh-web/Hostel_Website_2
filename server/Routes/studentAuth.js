const router = require('express').Router();
const Student = require('../Modals/Student');
const bcrypt = require('bcrypt');
const allocatedStudents=require("../Modals/AllocatedList")

// Function to check if an email is a valid Gmail address
function isGmailValid(email) {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

router.post('/register', async (req, res) => {
  try {
    const Password = req.body.password;
    const ConfirmPassword = req.body.confirmPassword;

    const rollNo = req.body.rollNumber;
    const validStudent = await allocatedStudents.findOne({ rollNumber: rollNo });

    if (!validStudent) {
      return res.status(400).json('You are not a hostel student');
    }

    if (Password !== ConfirmPassword) {
      return res.status(400).json('Passwords not matching');
    } else {
      // Check if the email is a valid Gmail address before creating a new student.
      if (!isGmailValid(req.body.email)) {
        return res.status(400).json('Invalid email');
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const newStudent = new Student({
        studentName: req.body.studentName,
        rollNumber: req.body.rollNumber,
        email: req.body.email,
        phone: req.body.phone,
        branch: req.body.branch,
        typeOfCourse: req.body.typeOfCourse,
        dateOfBirth: req.body.dateOfBirth,
        parentPhone: req.body.parentPhone,
        password: hashPassword,
        confirmPassword: hashPassword,
      });

      const student = await newStudent.save();
      return res.status(200).json(student);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const rollNo = req.body.rollNumber;
    const validStudent = await Student.findOne({ rollNumber: rollNo });

    if (!validStudent) {
      return res.status(400).json('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(req.body.password, validStudent.password);

    if (!validPassword) {
      return res.status(400).json('Invalid credentials');
    } else {
      return res.status(200).json(validStudent);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updateStudent);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
