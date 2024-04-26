function login() {
  var royal_email = document.getElementById("royal_email").value;
  var password = document.getElementById("password").value;

  if (!royal_email) {
    alert("Please fill with a valid email or username.")
    return
  }

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

var notificationQueue = [];
var notificationHeight = 40;
var notificationOffset = 10;
var startingSpace = 20;

function showNotification(message, inputId) {
  var notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");

  var topPosition = startingSpace + (notificationQueue.length * (notificationHeight + notificationOffset));

  notification.style.top = topPosition + "px";

  document.body.appendChild(notification);

  notificationQueue.push(notification);

  setTimeout(function() {
    notification.offsetHeight;

    notification.classList.add("show");

    setTimeout(function() {
      notification.classList.add("hide");
    }, 3000);
  }, 150 * notificationQueue.length);
}

function fadeOutNotification(notification) {
  notification.addEventListener("transitionend", function() {
    notification.remove();

    var index = notificationQueue.indexOf(notification);
    if (index !== -1) {
      notificationQueue.splice(index, 1);
    }

    updateNotificationPositions();

    if (notificationQueue.length > 0) {
      setTimeout(function() {
        fadeOutNextNotification();
      }, 100);
    }
  });
}

function fadeOutNextNotification() {
  var nextNotification = notificationQueue[0];
  if (nextNotification) {
    fadeOutNotification(nextNotification);
  }
}

function showNextNotification() {
  var nextNotification = notificationQueue[0];
  if (nextNotification) {
    nextNotification.offsetHeight;

    nextNotification.classList.add("show");
  }
}

function signup() {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  notificationQueue = [];

  var notifications = [];

  // Check if any of the required fields are empty and store notifications
  if (!firstName) {
    notifications.push({ message: "Please fill in your first name.", inputId: "first-name" });
  }

  if (!lastName) {
    notifications.push({ message: "Please fill in your last name.", inputId: "last-name" });
  }

  if (!username) {
    notifications.push({ message: "Please fill in your username.", inputId: "username" });
  }

  if (!email) {
    notifications.push({ message: "Please fill in your email.", inputId: "email" });
  }

  if (!password) {
    notifications.push({ message: "Please fill in your password.", inputId: "password" });
  }

  if (!confirmPassword) {
    notifications.push({ message: "Please fill in your confirm password.", inputId: "confirm-password" });
  }

  notifications.forEach(function(notification) {
    showNotification(notification.message, notification.inputId);
  });

  if (notifications.length > 0) {
    return;
  }

  // TODO: implementar mais notifications abaixo
  if (password.includes(' ')) {
    alert("Password should not contain spaces")
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

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
