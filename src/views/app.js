const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signUp = document.getElementById("sign-up");
const formSignUp = document.getElementById("formSignUp");
const formSignIn = document.getElementById("formSignIn");
const formConfigAccount = document.getElementById("formConfigAccount");
const formEmailVerify = document.getElementById("verify-form");
const messageSignUn = document.getElementById("message-signUp");
const messageSignIn = document.getElementById("message-signIn");
const logoutButton = document.getElementById("logout");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password_signup").value;
  const password2 = document.getElementById("password_signup-2").value;
  const branch = document.getElementById("branch-store").value;

  if (password !== password2) {
    messageSignUn.innerText = "Las contraseñas no coinciden";
    setTimeout(() => {
      messageSignUn.innerText = "";
    }, 3000);
    document.getElementById("password_signup").value = "";
    document.getElementById("password_signup-2").value = "";
    messageSignUn.style.color = "red";
    return;
  }

  fetch("/singup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, branch }),
  })
    .then(async (res) => {
      if (!res.ok) {
        messageSignUn.innerHTML = await res.text();
        messageSignUn.style.color = "red";

        setTimeout(() => {
          const click = document.getElementById("sign-in-btn");
          click.click();
          messageSignUn.innerHTML = "";
        }, 3000);

        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password_signup").value = "";
        document.getElementById("password_signup-2").value = "";
        document.getElementById("branch-store").value = "";
      } else {
        console.log(res);
        messageSignUn.innerHTML = "Usuario registrado correctamente";
        messageSignUn.style.color = "green";

        document.getElementById("userName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password_signup").value = "";
        document.getElementById("password_signup-2").value = "";
        document.getElementById("branch-store").value = "";

        setTimeout(() => {
          messageSignUn.innerHTML = "";
          const click = document.getElementById("sign-in-btn");
          click.click();
        }, 2000);
      }
    })
    .catch((error) => console.error(error));
});

formSignIn.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const password2 = document.getElementById("login-password-2").value;

  if (password !== password2) {
    messageSignIn.innerText = "Las contraseñas no coinciden";
    document.getElementById("login-password").value = "";
    document.getElementById("login-password-2").value = "";
    setTimeout(() => {
      messageSignIn.innerText = "";
    }, 3000);
    messageSignIn.style.color = "red";
    return;
  }

  fetch("/singin", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then( async (res) => {
      if (!res.ok) {
        const responseData = await res.text()

        messageSignIn.innerHTML = responseData;
        messageSignIn.style.color = "red";

        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";
        document.getElementById("login-password-2").value = "";

        if (responseData === "User not found, Please register first") {
          console.log("Hello")
          document.getElementById("sign-up-btn").click();
        }

        setTimeout(() => {
          messageSignIn.innerHTML = "";
        },2000)

      } else {
        messageSignIn.innerHTML = "User logged in";
        messageSignIn.style.color = "green";
        setTimeout(() => {
          window.location.href = `/emailverify?email=${email}`;
        }, 5000);
      }
    })
    .catch((error) => console.error(error));
});

// formConfigAccount.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const newNameUser = document.getElementById("userName-config").value;
//   const newBranch = document.getElementById("branch-store-config").value;
//   const LastPassword = document.getElementById("password_config").value;
//   const newPassword1 = document.getElementById("password_config-1").value;
//   const newPassword2 = document.getElementById("password_config-2").value;
//   const updateMessage = document.getElementById("message-config").value;

//   if (newPassword1 !== newPassword2) {
//     updateMessage.innerText = "New password match";
//     setTimeout(() => {
//       updateMessage.innerText = "";
//     }, 2000);
//   }

//   fetch("/config", {
//     method: "post",
//     headers: {
//       "Content-Type": "aplication/json",
//     },
//     body: JSON.stringify(newNameUser, newBranch, newPassword1),
//   })
//     .then(async (res) => {
//       if (!res.ok) {
//         updateMessage.innerText = await res.text();
//         setTimeout(() => {
//           updateMessage.innerText = "";
//         }, 2000);
//       } else {
//         updateMessage.innerHTML = await res.text();
//         setTimeout(() => {
//           updateMessage.innerHTML = "";
//         });
//       }
//     })
//     .catch((error) => console.log(error));
// });

function mostrarAnimacionPagoExitoso() {
  const animationElement = document.getElementById("payment-animation");
  animationElement.classList.remove("hidden");

  // Oculta la animación después de 3 segundos
  setTimeout(() => {
    animationElement.classList.add("hidden");
  }, 5000);
}
