function login() {
  var royal_email = document.getElementById("royal_email").value;
  var password = document.getElementById("password").value;

  if (!royal_email) {
    alert("Please fill with a valid email or username.")
    return
  }gtrgtrg

  if (!password) {
    return
  }

  // Debug message
  alert("Successfully logged in.");

  console.log("Login button clicked");
}

function register() {
  window.location.href = "registration.html";
}

function signup() {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Check if any of the required fields are empty
  if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
    alert("Please fill in all the required fields");
    return;
  }

  if (password.includes(' ')) {
    alert("Password should not contain spaces")
    return;
  }

  // Check if email is null or does not match the pattern
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Essa parte de storage vai ficar infuncional com commits, caso queiram fazer testes simples é só descomittar :]
  // Essa parte vai ser reescrevida com o banco de dados (MongoDB.org)

  // Storage start
  // Create a new user object
  // var newUser = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   username: username,
  //   email: email,
  //   password: password
  // };

  // Load existing profiles or initialize an empty array
  // var existingProfiles = localStorage.getItem("profiles");
  // var profilesArray = existingProfiles ? JSON.parse(existingProfiles) : [];

  // Check if the username or email already exists
  // var userExists = profilesArray.some(function(profile) {
  //   return profile.username === username || profile.email === email;
  // });

  // if (userExists) {
  //   alert("Username or email already exists");
  //   return;
  // }

  // Add the new user to the profiles array
  // profilesArray.push(newUser);

  // Update the profiles in local storage
  // localStorage.setItem("profiles", JSON.stringify(profilesArray));
  // Storage end

  // Redirect to the index page
  window.location.href = "index.html";
}

function back_button() {
  window.location.href = "index.html";
}

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
