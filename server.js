const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to handle registration form submission
app.post('/register', (req, res) => {
    const userData = req.body;

    // Save user data to file
    fs.writeFile(path.join(__dirname, 'public', 'userData.json'), JSON.stringify(userData), (err) => {
        if (err) {
            console.error('Error saving user data:', err);
            res.status(500).send('Error saving user data');
        } else {
            console.log('User data saved successfully');

            // Redirect to login page after a 3-second countdown
            setTimeout(() => {
                res.redirect('/login.html');
            }, 3000);
        }
    });
});

// Endpoint to handle login form submission
app.post('/login.html', (req, res) => {
    const { email, password } = req.body;

    // Read user data from file
    fs.readFile(path.join(__dirname, 'public', 'userData.json'), (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            res.status(500).send('Error reading user data');
        } else {
            const userData = JSON.parse(data);

            // Check if email and password match
            if (userData.email === email && userData.password === password) {
                res.status(200).send('Congratulations! You are our official member.');
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
