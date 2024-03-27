const submitButton = document.querySelector(".button");

// Validate basic input information (blank, outside scope, etc.)
function validateInput(day, month, year) {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  console.log(
    `Todays date (MM/DD/YYYY): ${currentMonth}/${currentDay}/${currentYear}`
  );
  let isValid;
  let errorCode;
  if (
    !(
      day >= 1 &&
      day <= 31 &&
      month >= 1 &&
      month <= 12 &&
      year >= 0 &&
      year <= 2024
    )
  ) {
    isValid = false;
    errorCode = 1;
  } else {
    // Validate if in the future...
    if (month > currentMonth && year >= currentYear) {
      isValid = false;
      errorCode = 3;
    } else {
      //Validate days based on month (April = 30 days..etc)
      if ((month === 4 && day > 30) || (month === 11 && day > 30)) {
        isValid = false;
        errorCode = 2;
      } else {
        isValid = true;
      }
    }
  }
  return errorCode;
}

// Removes the error message when you start typing a new input
function detectTyping() {
  document.querySelector(".input--day").addEventListener("click", function () {
    document.querySelector(".error").classList.add("hidden");
  });
  document
    .querySelector(".input--month")
    .addEventListener("click", function () {
      document.querySelector(".error").classList.add("hidden");
    });
  document.querySelector(".input--year").addEventListener("click", function () {
    document.querySelector(".error").classList.add("hidden");
  });
}

// Calculate the age!
function calcAge(birthDay, birthMonth, birthYear) {
  // Get current date & set variables
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1; // 0 index base
  const currentDay = date.getDate();
  const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;

  let monthOut, dayOut;
  let yearOut = currentYear - birthYear;

  if (currentMonth >= birthMonth) {
    monthOut = currentMonth - birthMonth;
  } else {
    yearOut--;
    monthOut = 12 + currentMonth - birthMonth;
  }

  if (currentDay >= birthDay) {
    dayOut = currentDay - birthDay;
  } else {
    monthOut--;
    dayOut = 31 + currentDay - birthDay;

    if (ageOut < 0) {
      ageOut = 11;
      yearOut--;
    }
  }

  // Output results to DOM
  document.querySelector(".output--years").textContent = yearOut;
  document.querySelector(".output--days").textContent = dayOut;
  document.querySelector(".output--months").textContent = monthOut;
  console.log(`${yearOut} years, ${monthOut} months, ${dayOut} days`);
  console.log(typeof yearOut, typeof monthOut, typeof dayOut);
}
// Detect submission and process accordingly
submitButton.addEventListener("click", function () {
  // Array of error codes
  detectTyping();
  const errorCode = [
    "",
    "Invalid date entered",
    "That month only has 30 days",
    "Date is in the future",
  ];
  const dayInput = Number(document.querySelector(".input--day").value);
  const monthInput = Number(document.querySelector(".input--month").value);
  const yearInput = Number(document.querySelector(".input--year").value);
  const errorMessage = document.querySelector(".error");

  const error = validateInput(dayInput, monthInput, yearInput);
  if (error > 0) {
    // Display error message and reset values
    errorMessage.classList.remove("hidden");
    document.querySelector(".input--day").value = "";
    document.querySelector(".input--month").value = "";
    document.querySelector(".input--year").value = "";
    document.querySelector(".output--years").textContent = "--";
    document.querySelector(".output--days").textContent = "--";
    document.querySelector(".output--months").textContent = "--";
    console.log(errorCode[error]);
  } else {
    // Everything checks out -- Calculate age!
    console.log(
      `Valid date entered (MM/DD/YYYY): ${monthInput}/${dayInput}/${yearInput}`
    );
    calcAge(dayInput, monthInput, yearInput);
  }
});

