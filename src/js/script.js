// Control System
const login = document.getElementById("login");
const register = document.getElementById("register");
const backLogin = document.getElementById("backLogin");
const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const landingPage = document.getElementById("landingPage");
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
const validEmail = document.getElementById("validEmail");
const validPassword = document.getElementById("validPassword");
const loading = document.getElementById("loading");
const waitingText = document.getElementById("waitingText");

// Login Page Section
function loginSubmit(url, data, error) {
  let database = new XMLHttpRequest();

  database.onreadystatechange = function () {
    if (database.readyState === 4) {
      if (database.status === 200) {
        loading.classList.toggle("hidden");
        setTimeout(() => {
          data(database.response);
        }, 3000);
      } else if (database.status === 404) {
        error();
      }
    }
  };

  database.open("get", url);
  database.send();
}

const namaUser = document.getElementById("nama");
const imageUser = document.querySelectorAll(".imageProfile");
login.addEventListener("click", () => {
  if (loginEmail.value <= 0 && loginPassword.value <= 0) {
    alert("Email atau Password tidak boleh kosong!!");
  } else {
    loginSubmit(
      "./json/database.json",
      (result) => {
        let inc = JSON.parse(result);
        let valid = inc.find(
          (obj) =>
            loginEmail.value === obj.email &&
            loginPassword.value === obj.password
        );
        loading.classList.toggle("hidden");
        setTimeout(() => {
          if (valid) {
            landingPage.classList.add("left-0");
            landingPage.classList.remove("left-[-100%]");
            loginPage.classList.remove("right-0");
            loginPage.classList.add("right-[-100%]");
            namaUser.innerHTML = `${valid.nama}`;
            imageUser.forEach((e) => {
              e.setAttribute("src", valid.gambar);
            });
            waitingText.innerHTML = "Berhasil Login";
          } else {
            alert("Email atau password salah!!");
          }
        }, 500);

        // for (let i = 0; i < inc.length; i++) {
        //   if (
        //     loginEmail === inc[i].email &&
        //     loginPassword === inc[i].password
        //   ) {
        //     landingPage.classList.add("left-0");
        //     landingPage.classList.remove("left-[-100%]");
        //     loginPage.classList.remove("right-0");
        //     loginPage.classList.add("right-[-100%]");
        //   } else {
        //     alert("Email atau password salah!!");
        //   }
        // }
      },
      () => {
        console.log("Error salah url");
      }
    );
  }
});

// Register Page Section
register.addEventListener("click", () => {
  registerPage.classList.add("top-0");
  registerPage.classList.remove("top-[-100%]");
  loginPage.classList.add("bottom-[-100%]");
  loginPage.classList.remove("bottom-0");
  loginPage.classList.remove("right-0");
});
backLogin.addEventListener("click", () => {
  registerPage.classList.remove("top-0");
  registerPage.classList.add("top-[-100%]");
  loginPage.classList.remove("bottom-[-100%]");
  loginPage.classList.add("bottom-0");
  loginPage.classList.add("right-0");
});

const registerNow = document.getElementById("registerNow");
function insertData() {
  const data = {
    id: 5,
    nama: "Dicky",
    email: "dicky@gmail.com",
    password: "dicky1234",
  };

  const jsonString = JSON.stringify(data);
  localStorage.setItem("myData", jsonString);
}

registerNow.addEventListener("click", () => {
  insertData();
});
