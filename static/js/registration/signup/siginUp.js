let fristname = document.getElementById("fristname");
let username = document.getElementById("Username");
let email = document.getElementById("Email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");

function Validator() {
  if (!fristname.value) {
    fristname.focus();
    fristname.style.borderColor = "red";
    return false;
  } else {
    fristname.style.borderColor = "white";
  }

  if (!username.value) {
    username.focus();
    username.style.borderColor = "red";
    return false;
  } else {
    username.style.borderColor = "white";
  }

  if (!email.value) {
    email.focus();
    email.style.borderColor = "red";
    return false;
  } else {
    email.style.borderColor = "white";
  }

  if (!password.value) {
    password.focus();
    password.style.borderColor = "red";
    return false;
  } else {
    password.style.borderColor = "white";
  }
  return true;
}

function Clear() {
  fristname.value = "";
  username.value = "";
  email.value = "";
  password.value = "";
}

btn &&
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    try {
      if (Validator()) {
        let user = {
          username: username.value,
          email: email.value,
          password: password.value,
        };
        Clear();
        fetch("https://auth-rg69.onrender.com/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((mass) => {
            if (mass.message == "User registered successfully!") {
              window.location.assign("../index.html");
            }
            if (mass.message == "Failed! Username is already in use!") {
              window.location.assign("./siginIn.html");
              alert("siz oldin ro'yxatdan o'tkansiz");
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (eroor) {
      console.log("hatolik yuz berdi", eroor.message);
    }
  });
