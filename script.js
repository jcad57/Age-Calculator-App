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
function calcAge(day, month, year) {
  // Get the current date
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  // Process
  let yearOutput = 0;
  let monthOutput = 0;
  let dayOutput = 0;
  // Calc month and year
  if (month > currentMonth) {
    monthOutput = currentMonth + (12 - month);
    yearOutput = currentYear - year - 1;
  } else {
    yearOutput = currentYear - year;
  }
  // Calc day
  if (!(currentMonth === 2 || currentMonth === 4 || currentMonth === 11)) {
    if (day <= currentDay) {
      dayOutput = currentDay - day;
    } else {
      dayOutput = 1 * (day - currentDay);
    }
    if (currentMonth === 2 && day > currentDay) {
      dayOutput = 1 * (day - 28);
    } else {
      dayOutput = currentDay - day;
    }
    if (currentMonth === 4 || currentMonth === 11) {
      dayOutput = 1 * (day - 30);
    } else {
      dayOutput = currentDay - day;
    }
  }
  // Output results to DOM
  document.querySelector(".output--years").textContent = yearOutput;
  document.querySelector(".output--days").textContent = dayOutput;
  document.querySelector(".output--months").textContent = monthOutput;
  console.log(`${yearOutput} years, ${monthOutput} months, ${dayOutput} days`);
  console.log(typeof yearOutput, typeof monthOutput, typeof dayOutput);
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
    document.querySelector(".input--day").value = "";
    document.querySelector(".input--month").value = "";
    document.querySelector(".input--year").value = "";
    calcAge(dayInput, monthInput, yearInput);
  }
});

//   function calcAge(day, month, year) {
//     const date = new Date();
//     const yearCurrent = date.getFullYear();
//     const monthCurrent = date.getMonth();
//     const dayCurrent = date.getDate();
//     if (monthCurrent < )
//     const yearOutput = yearCurrent - year;
//     return yearOutput;
//   }
//   // Validate Input and process

// });
