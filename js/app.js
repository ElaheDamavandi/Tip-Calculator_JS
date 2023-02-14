 // Grab elements functions
 const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(
    `Somthing went, make sure that ${selector} exists or is typed correctly.`
  );
};

const selectAllElements = (selector) => {
  const element = document.querySelectorAll(selector);
  if (element) return element;
  throw new Error(
    `Somthing went, make sure that ${selector} exists or is typed correctly.`
  );
};

//Set up a service array
const services = [{
  value: 1,
  title: "great - 20%"
},{
  value: 2,
  title: "good - 10%"
},{
  value: 3,
  title: "bad - 2%"
}]

//Validate the feedback 
const validateInputs = (bill, countOfCustomer, selectedService) => {
  let isValidate = false;
  const feedback = selectElement('.feedback');
  feedback.innerHTML = '';


  if(bill === '' || bill === '0'){
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Bill amount cannot be black</p>`
    isValidate = true;
  }

  if(countOfCustomer <= '0'){
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Number of customer can not be 0 or under 0!</p>`
    isValidate = true;
  }

  if(selectedService === 0){
    feedback.classList.add('showItem', 'alert-danger');
    feedback.innerHTML += `<p>Please select an service!</p>`;
    isValidate = true;
  }

  return isValidate;
}

const tipCaculation = (bill, countOfCustomer, selectedService) => {
  tipPercent = 0;


  if(selectedService === '1'){
    tipPercent = 0.2;
  } else if(selectedService === '2'){
    tipPercent = 0.1;
  } else {
    tipPercent = 0.02;
  }
    const tipAmount = Number(bill)*tipPercent;
    const totalAmount = Number(bill) + Number(tipAmount);
    const eachPerson = Number(totalAmount) / Number(countOfCustomer);


    return [tipAmount, totalAmount, eachPerson];
};

//Create option function
const createOption = (title, value) => {
  const option = document.createElement('option');
  option.textContent = title;
  option.value = value;
  const select = selectElement('#input-service');
  select.appendChild(option);
}

//Creating options with 
services.forEach(service => {
  createOption(service.title, service.value);
})   

const inputForm = selectElement('form');
inputForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const customerBill = selectElement('#input-bill');
  const countOfCustomer = selectElement('#input-users');
  const optionService = selectElement('#input-service');

  let billCost = customerBill.value;
  let customerCounter = countOfCustomer.value;
  let selectedOption = optionService.value;

  const isEmpty = validateInputs(billCost, customerCounter, selectedOption);
 


  if(!isEmpty){
    const loader = selectElement('.loader');
    const resultsDOM = selectElement('.results');
    const tipResultsDOM = selectElement('#tip-amount');
    const totalAmountDOM = selectElement('#total-amount');
    const eachPersonDOM = selectElement('#person-amount');
  
    //calculate result
    const results = tipCaculation(billCost, customerCounter, selectedOption);
    loader.classList.add('showItem');
    setTimeout(() =>{
      loader.classList.remove('showItem');
      tipResultsDOM.textContent = `${results[0].toFixed(2)}`
      totalAmountDOM.textContent = `${results[1].toFixed(2)}`
      eachPersonDOM.textContent = `${results[2].toFixed(2)}`
      resultsDOM.classList.add('showItem');
    }, 2000)
  
  };

});

