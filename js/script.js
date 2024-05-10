const mysql = require('mysql');
const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'users',
});

async function login() {
  var royal_email = document.getElementById("royal_email").value;
  var password = document.getElementById("password").value;

  if (!royal_email) {
    alert("Please fill with a valid email or username.")
    return
  }

  if (!password) {
    return
  }

  try {
    await db.connect();
    const sql = 'SELECT * FROM users WHERE (username = ? or email = ?) AND password = ?';
    const [rows, field] = await db.query(sql, [royal_email, password, password]);

    if (rows.length > 0) {
      alert("Successfully logged in.");
      console.log("Successful login for: " + royal_email);
      window.location.href = "profile.html";
    } else {
      alert("Please fill with a valid email or username.");
    }
    await db.end();
  }
  catch (error) {
    console.error(error);
    alert('Something went wrong, please try again later.');
  }

  // Debug message
  alert("Successfully logged in.");

  console.log("Login button clicked");
}

function register() {
  window.location.href = "registration.html";
}

async function signup() {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (password.trim() === "" || confirmPassword.trim() === "") {
    return
  }

  // TODO: implementar mais notifications abaixo
  if (password.includes(' ')) {
    alert("Password should not contain spaces")
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    // alert("Please enter a valid email address");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await db.connect();
    const sql = 'INSERT INTO users (firstName, secondName, username, email, password) VALUES (?,?,?,?,?)';
    await db.query(sql, [firstName, lastName, username, email, password]);
    await db.end();

    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    alert("Something went wrong, please try again later.");
  }
}

function back_button() {
  window.location.href = "index.html";
}

app.get('/generate', (req, res) => {
  const secret = speakeasy.generateSecret({length: 20});
  QRCode.toDataURL(secret.otpauth_url, (err,data_url) => {
    if (err) {
      res.status(500).send('Error while generating QRCode.')
    } else {
      res.send('<img src="${data_url}">');
    }
  });
});

app.get('/authenticate', (req, res) => {
  const { secret, token } = req.query;
  const verified = speakeasy.totp.verify({
    secret: secret,
    encrypt: 'base32',
    token: token,
    window: 1
  });
  if (verified) {
    res.send('Authenticated.');
  } else {
    res.send('Invalid Token.');
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  var toggleButton = document.querySelector("#" + inputId + " + .toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.src = "assets/hide.png";
  } else {
    passwordInput.type = "password";
    toggleButton.src = "assets/show.png";
  }
}
