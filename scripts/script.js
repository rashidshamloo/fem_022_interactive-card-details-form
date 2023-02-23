/* variable declarations */

// default card info
const defaultCardName = "Jane Appleseed";
const defaultCardNumber = "0000000000000000";
const defaultCardMonth = "00";
const defaultCardYear = "00";
const defaultCardCvc = "000";

// messages
const emptyMessage = "Can't be blank";
const wrongFormatMessage = "Wrong format, numbers only";
const wrongLengthMessage = "Please enter 16 digits";
const wrongMonthMessage = "Month should be less than 13";
const wrongNameMessage = "Cardholder name can't have numbers";

// set form elements
const cardForm = document.getElementById("card-form");
const cardHolderName = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("card-number");
const cardMonth = document.getElementById("card-month");
const cardYear = document.getElementById("card-year");
const cardCvc = document.getElementById("card-cvc");

// set card image elements
const cardImageHolderName = document.getElementById("cc-name");
const cardImageNumber = document.getElementById("cc-number");
const cardImageExp = document.getElementById("cc-exp");
const cardImageCvc = document.getElementById("cc-cvc");

/* initialization */

// add event listener to the form
cardForm.addEventListener("submit", validateForm);

// add event listener to input fields
cardHolderName.addEventListener("input", updateCardHolderName);
cardNumber.addEventListener("input", updateCardNumber);
cardMonth.addEventListener("input", updateCardMonth);
cardYear.addEventListener("input", updateCardYear);
cardCvc.addEventListener("input", updateCardCvc);

/* function declarations */

// resets the form
function resetForm() {
  // clear all error messages
  clearErrorMessages();
  // reset the form input fields
  cardForm.reset();
  // set card image values to default
  cardImageHolderName.textContent = defaultCardName;
  cardImageNumber.textContent = formatCardNumber(defaultCardNumber);
  cardImageExp.textContent = defaultCardMonth + "/" + defaultCardYear;
  cardImageCvc.textContent = defaultCardCvc;
  // hide the success element
  document.getElementById("success").style.display = "";
  document.getElementById("success").setAttribute("aria-hidden", true);
  // show the form
  cardForm.style.display = "";
  cardForm.removeAttribute("aria-hidden");
  //return false to pevent the href from activating
  return false;
}

// validates the form
function validateForm(event) {
  // prevent the default action
  event.preventDefault();
  // clear error messages
  clearErrorMessages();
  // get form data
  let formData = new FormData(cardForm);
  // validate each form data entry
  let error = false;
  for (let dataEntry of formData.entries()) {
    // set field name and value
    let filedName = dataEntry[0];
    let fieldValue = dataEntry[1];
    // if the input field is empty, show the empty message
    if (!fieldValue.trim()) {
      error = true;
      showErrorMessage(filedName, "empty");
    }
    // if card number field contains anything but numbers,
    // show the wrong format message
    else if (
      filedName === "card-number" &&
      !/^\d+$/.test(fieldValue.replaceAll(" ", ""))
    ) {
      error = true;
      showErrorMessage(filedName, "wrongFormat");
    }
    //if card number field length is less than 16,
    //show the wrong length error
    else if (
      filedName === "card-number" &&
      fieldValue.trim().replaceAll(" ", "").length !== 16
    ) {
      error = true;
      showErrorMessage(filedName, "wrongLength");
    }
    // if the input field is one of the other digit only fields
    // and it contains anything other than a number,
    // show the wrong format message
    else if (
      filedName !== "cardholder-name" &&
      filedName !== "card-number" &&
      !/^\d+$/.test(fieldValue)
    ) {
      error = true;
      showErrorMessage(filedName, "wrongFormat");
    }
    // if month field is bigger than 12 show error message
    else if (filedName === "card-month" && fieldValue > 12) {
      error = true;
      showErrorMessage(filedName, "wrongMonth");
    }
    // if name has numbers, show error
    else if (filedName === "cardholder-name" && /\.*\d+\.*/.test(fieldValue)) {
      error = true;
      showErrorMessage(filedName, "wrongName");
    }
  }
  // if there's no error, show the success element and hide the form
  if (!error) {
    document.getElementById("success").style.display = "flex";
    document.getElementById("success").removeAttribute("aria-hidden");
    cardForm.style.display = "none";
    cardForm.setAttribute("aria-hidden", true);
  }
}

// shows the error message for an element
function showErrorMessage(element, type) {
  // get error message element
  let messageElement = document
    .getElementById(element)
    .parentElement.getElementsByClassName("error-message")[0];
  // show red border
  document.getElementById(element).classList.add("border-error");
  // show the appropriate message based on type
  switch (type) {
    // if message type is empty, show the empty message
    case "empty":
      messageElement.textContent = emptyMessage;
      break;
    // if message type is wrong format, show the wrong format message
    case "wrongFormat":
      messageElement.textContent = wrongFormatMessage;
      break;
    // if message type is wrong length, show the wrong length message
    case "wrongLength":
      messageElement.textContent = wrongLengthMessage;
      break;
    // if month is wrong, show the wrong month message
    case "wrongMonth":
      messageElement.textContent = wrongMonthMessage;
      break;
    // if name is wrong, show the wrong name message
    case "wrongName":
      messageElement.textContent = wrongNameMessage;
      break;
    // if type is none of the above, return -1 as error
    default:
      return -1;
  }
}

// clears the error messages for the form
function clearErrorMessages() {
  // empty all error messages
  let errorMessageElements = cardForm.getElementsByClassName("error-message");
  for (element of errorMessageElements) element.textContent = "";
  // remove all red borders
  let inputGroupElements = cardForm.getElementsByTagName("input");
  for (element of inputGroupElements) element.classList.remove("border-error");
}

// updates card holder name
function updateCardHolderName(event) {
  // get input element
  let inputElement = event.target;
  // if input is empty, set to default value
  if (!inputElement.value.trim())
    cardImageHolderName.textContent = defaultCardName;
  // else set it to the input value
  else cardImageHolderName.textContent = inputElement.value;
}

// updates card number
function updateCardNumber(event) {
  // get input element
  let inputElement = event.target;
  // format the input field
  inputElement.value = formatCardNumber(inputElement.value.replaceAll(" ", ""));
  // if input is empty, set to default value
  if (!inputElement.value.trim())
    cardImageNumber.textContent = formatCardNumber(defaultCardNumber);
  // else set it to the input value
  else cardImageNumber.textContent = inputElement.value;
}

// updates card month
function updateCardMonth(event) {
  // get input element
  let inputElement = event.target;
  // if input is empty, set to default value
  if (!inputElement.value.trim()) cardImageExp.textContent = defaultCardMonth;
  // else set it to the input value
  else
    cardImageExp.textContent =
      inputElement.value.padStart(2, "0") + cardImageExp.textContent.slice(2);
}

// updates card year
function updateCardYear(event) {
  // get input element
  let inputElement = event.target;
  // if input is empty, set to default value
  if (!inputElement.value.trim()) cardImageExp.textContent = defaultCardYear;
  // else set it to the input value
  else
    cardImageExp.textContent =
      cardImageExp.textContent.slice(0, 3) +
      inputElement.value.padStart(2, "0");
}
// updates card cvc
function updateCardCvc(event) {
  //get input element
  let inputElement = event.target;
  //if input is empty, set to default name
  if (inputElement.value.trim()) cardImageCvc.textContent = defaultCardCvc;
  // else set it to the input value
  cardImageCvc.textContent = inputElement.value;
}

// formats the card number by inserting space every 4 characters
function formatCardNumber(text) {
  let formattedString = "";
  // go through text one character at a time and
  // insert a space every 4 characters
  for (let i = 0; i < text.length; i++) {
    if (i % 4 == 0) formattedString += " ";
    formattedString += text[i];
  }
  // return the formatted string
  return formattedString;
}
