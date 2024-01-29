let username = document.getElementById("Username");
let email = document.getElementById("Email");
let password = document.getElementById("password");
let btn = document.getElementById("btn");

function Validator() {
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
        fetch("https://auth-rg69.onrender.com/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((mass) => {
            console.log(mass.message);
            // if (mass.message == "User registered successfully!") {
            //   console.log("olg'a");
            // }
            // if (mass.message == "Failed! Username is already in use!") {

            // }
          })
          .catch((err) => console.log(err));
      }
    } catch (eroor) {
      console.log("hatolik yuz berdi", eroor.message);
    }
  });
