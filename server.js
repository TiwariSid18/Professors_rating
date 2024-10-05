const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Initialize app
const app = express();
const port = 3000;

// Use body-parser to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // change to your MySQL username
  password: 'Tiwari1@', // change to your MySQL password
  database: 'professor_rating' // your DB name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Admission_page.html');
});

// Handle form submissions
app.post('/submit-rating', (req, res) => {
    const { professor_name, course_name, rating, take_again, comments, rated_by } = req.body;
  
    console.log('Received form data:', req.body); // Log the form data
  
    const query = `
      INSERT INTO professor_ratings (professor_name, course_name, rating, take_again, comments, rated_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [professor_name, course_name, rating, take_again, comments, rated_by], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        return res.status(500).send('Failed to submit rating');
      }
  
      res.send('Rating submitted successfully!');
    });
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
