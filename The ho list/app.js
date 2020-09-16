function Patient(name, number, bp, rr, sugar, dx) {
  this.name = name;
  this.number = number;
  this.bp = bp;
  this.rr = rr;
  this.sugar = sugar;
  this.dx = dx;
}

//ADD TO LOCAL STORAGE
function Store() {}

Store.prototype.getPatient = function () {
  let patients;

  if (localStorage.getItem('patients') === null) {
    patients = [];
  } else {
    patients = JSON.parse(localStorage.getItem('patients'));
  }
  return patients;
};

//
Store.prototype.addPatient = function (patient) {
  const patients = Store.prototype.getPatient();
  patients.push(patient);
  localStorage.setItem('patients', JSON.stringify(patients));
};

Store.prototype.displayPatient = function () {
  const patients = Store.prototype.getPatient();
  patients.forEach(function (patient) {
    const ui = new UI();

    ui.addPatient(patient);
  });
};

Store.prototype.removePatient = function (dx) {
  const patients = Store.prototype.getPatient();

  patients.forEach(function (patient, index) {
    if (patient.dx === dx) {
      patients.splice(index, 1);
    }
  });
  localStorage.setItem('patients', JSON.stringify(patients));
};
function UI() {}

UI.prototype.addPatient = function (patient) {
  const list = document.getElementById('list');

  //CREATE TABLE ROWS
  const row = document.createElement('tr');
  row.innerHTML = `<td>${patient.name}</td>
  <td>${patient.number}</td>
  <td>${patient.bp}</td>
  <td>${patient.rr}</td>
  <td>${patient.sugar}</td>
  <td>${patient.dx}</td>
  <td ><a href="#"><i class="material-icons red-text delete">delete</i></a></td>`;

  list.appendChild(row);
};

UI.prototype.clearfield = function () {
  document.getElementById('patient-name').value = '';
  document.getElementById('hospital-no').value = '';
  document.getElementById('sys').value = '';
  document.getElementById('dia').value = '';
  document.getElementById('rr').value = '';
  document.getElementById('blood-sugar').value = '';
  document.getElementById('diagnosis').value = '';
};

UI.prototype.delete = function (target) {
  if (target.className === 'material-icons red-text delete') {
    target.parentElement.parentElement.parentElement.remove();
  }
  console.log(target);
};

// UI.prototype.showAlert = function (message, className, color, background) {
//   //CREATING ALERT IF NAME IS NOT FILLED
//   const div = document.createElement('div');

//   //GIVING DIV A CLASSNAME
//   div.className = `alert ${className}`;

//   //APPENING NEW MESSAGE TO CREATED DIV
//   div.appendChild(document.createTextNode(message));

//   //INSERT ALERT IF NAME IS NOT FILLED
//   const container = document.querySelector('.container');

//   const form = document.querySelector('form');
//   container.insertBefore(div, form);

//   setTimeout(function () {
//     div.remove();
//   }, 3000);

//   div.style.color = color;
//   div.style.backgroundColor = background;
// };

//DOM CONTENT LOADED EVENT LISTENER
document.addEventListener('DOMContentLoaded', Store.prototype.displayPatient());

//EVENT LISTENERS
document.querySelector('form').addEventListener('submit', function (e) {
  const name = document.getElementById('patient-name').value;
  const number = document.getElementById('hospital-no').value;
  const bp = `${document.getElementById('sys').value}/${
    document.getElementById('dia').value
  }`;
  const rr = document.getElementById('rr').value;
  const sugar = document.getElementById('blood-sugar').value;
  const dx = document.getElementById('diagnosis').value;

  //Instatiate from patient
  const patient = new Patient(name, number, bp, rr, sugar, dx);

  const ui = new UI();

  if (name === '') {
    // ui.showAlert('Please insert patients name', 'error', 'red', 'grey');
    M.toast({
      html: `<p class="red-text"> Please insert Patient's Name <i class="material-icons">error</i></p>`,
      classes: 'rounded',
      displayLength: 1000,
    });
  } else {
    M.toast({
      html: `<p class="green-text"> Patient Added <i class="material-icons">done</i></p>`,
      classes: 'rounded',
      displayLength: 1000,
    });
    ui.addPatient(patient);
    ui.clearfield();
    //ui.delete();
    const uiStore = new Store();
    uiStore.addPatient(patient);
  }

  e.preventDefault();
});

document.getElementById('list').addEventListener('click', function (e) {
  const ui = new UI();

  ui.delete(e.target);
  const uiStore = new Store();
  uiStore.removePatient(
    e.target.parentElement.parentElement.previousElementSibling.textContent
  );

  e.preventDefault();
});
