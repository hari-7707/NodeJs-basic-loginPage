let signIn = document.getElementById("signIn");
let registerIn = document.getElementById("registerIn");
let sDiv = document.getElementById("sDiv");
let rDiv = document.getElementById("rDiv");

signIn.addEventListener("click", () => {
  signIn.classList.remove("passive");
  signIn.classList.add("active");
  registerIn.classList.remove("active");
  registerIn.classList.add("passive");
  rDiv.classList.add("removeDisplay");
  sDiv.classList.remove("removeDisplay");
  event.preventDefault();
});
registerIn.addEventListener("click", () => {
  registerIn.classList.remove("passive");
  registerIn.classList.add("active");
  signIn.classList.remove("active");
  signIn.classList.add("passive");
  sDiv.classList.add("removeDisplay");
  rDiv.classList.remove("removeDisplay");
  event.preventDefault();
});
const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

async function sendCredentials() {
  const formData = new FormData(loginForm);

  try {
    const res = await fetch("http://localhost:3000/authenticate/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        emailId: formData.get("emailId"),
        password: formData.get("password"),
      }),
    });
    let myobj = await res.json();
    console.log(myobj.user);
    if (res.status === 200) {
      sessionStorage.setItem("userData", JSON.stringify(myobj.user));

      userdetails(myobj);
    } else {
      document.getElementById("error").innerHTML =
        "Invalid emailId or password";
    }
  } catch (e) {
    console.log(e);
  }
}

async function createUser() {
  const formData = new FormData(signupForm);
  const organizationType = document.getElementById("organizationType");
  try {
    const res = await fetch("http://localhost:3000/authenticate/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        organizationType:
          organizationType.options[organizationType.selectedIndex].text,
        organizationName: formData.get("organizationName"),
        pancardNumber: formData.get("pancardNumber"),
        phoneNumber: formData.get("phoneNumber"),
        emailId: formData.get("emailId"),
        password: formData.get("password"),
      }),
    });
    console.log(await res.json());
  } catch (e) {
    console.log(e);
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendCredentials();
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createUser();
});

function userdetails(s) {
  // window.open("userdetails.html", "_blank");
  location.href = "userdetails.html";
}
