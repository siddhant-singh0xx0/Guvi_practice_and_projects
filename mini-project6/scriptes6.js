class registration {
  constructor(name, email, aadhar, type) {
    this.name = name;
    this.email = email;
    this.aadhar = aadhar;
    this.type = type;
  }
}

class Display {
  add(registration) {
    let tableBody;
    tableBody = document.getElementById("tableBody");
    let uilist = `<tr>
      <td>${registration.name}</td>
      <td>${registration.email}</td>
      <td>${registration.aadhar}</td>
      <td>${registration.type}</td>
      </tr>
      `;
    tableBody.innerHTML += uilist;
  }

  clear() {
    let registrationForm = document.getElementById("registerform");
    registrationForm.reset();
  }

  validate(registration) {
    if (
      registration.name.length < 2 ||
      registration.email.length < 5 ||
      registration.aadhar.length < 12
    ) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById("showmessage");
    message.innerHTML = `<div class="alert alert-${type}" role="alert">
       ${displayMessage}
      </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
  }
}

// main function
let registrationForm = document.getElementById("registerform");
registrationForm.addEventListener("submit", registrationFormSubmit);

function registrationFormSubmit(e) {
  console.log("form is getting submitted");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let aadhar = document.getElementById("aadhar").value;
  let male = document.getElementById("male");
  let female = document.getElementById("female");

  let gender = male.checked ? male.value : female.checked ? female.value : "";

  e.preventDefault();

  let data = new registration(name, email, aadhar, gender);
  console.log(data);
  let display = new Display();

  if (display.validate(data)) {
    display.add(data);
    display.clear();
    display.show("success", "Registration is Success");
  } else {
    display.show(
      "danger",
      "Registration is failed please fill out the form properly..."
    );
    display.clear();
  }
}

let searchForm = document.querySelector('form[role="search"]');
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = searchForm
    .querySelector('input[type="search"]')
    .value.toLowerCase();
  let tableRows = document.querySelectorAll("#tableBody tr");

  tableRows.forEach((row) => {
    let rowText = row.innerText.toLowerCase();
    if (rowText.includes(searchInput)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
