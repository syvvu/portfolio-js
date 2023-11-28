document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const MAX_LENGTH = 200;
    const WARNING_THRESHOLD = 20;

    let form_errors = [];

    function logError(error) {
      form_errors.push(error);
    }

    function validateInput(input) {
      if (input.id === "name") {
        if (input.value.trim() === "") {
          input.setCustomValidity("Name is required.");
          logError("Name is required.");
        } else {
          input.setCustomValidity("");
        }
      }

      if (input.id === "email") {
        if (input.validity.typeMismatch || input.validity.patternMismatch) {
          input.setCustomValidity("Please enter a valid email address.");
          logError("Email address must be valid.");
        } else {
          input.setCustomValidity("");
        }
      }

      if (input.id === "comments") {
        if (input.value.trim().length < 10) {
          input.setCustomValidity(
            "Comments must be at least 10 characters."
          );
          console.log("1");
          logError("Comments must be at least 10 characters.");
        } else {
          input.setCustomValidity("");
        }
      }
    }

    function updateUI(input) {
      const output = input.nextElementSibling;
      validateInput(input);
      if (input.checkValidity()) {
        input.style.borderColor = "green";
        output.textContent = "";
      } else {
        input.style.borderColor = "red";
        output.textContent = input.validationMessage;
      }
    }

    function updateCommentsUI() {
      const remaining = MAX_LENGTH - commentsInput.value.length;
      const infoOutput =
        commentsInput.nextElementSibling.nextElementSibling;

      infoOutput.textContent = `${remaining} characters remaining.`;
      if (remaining <= WARNING_THRESHOLD) {
        infoOutput.style.color = "orange";
        commentsInput.style.borderColor = "orange";
        commentsInput.setCustomValidity("");
      } else {
        infoOutput.style.color = "blue";
        commentsInput.style.borderColor = "initial";
        commentsInput.setCustomValidity("");
      }
    }

    function flashInput(input) {
      input.classList.add("flash-error");
      setTimeout(() => {
        input.classList.remove("flash-error");
      }, 1000);
    }

    function isInputValid(input) {
      const regex = /^[A-Za-z0-9 .,!?-]*$/;
      return regex.test(input);
    }

    nameInput.addEventListener("input", function () {
      updateUI(nameInput);
    });

    emailInput.addEventListener("input", function () {
      updateUI(emailInput);
    });

    commentsInput.addEventListener("input", function () {
      const currentChar =
        commentsInput.value[commentsInput.value.length - 1] || "";
      const errorOutput = commentsInput.nextElementSibling;

      updateCommentsUI();
      updateUI(commentsInput);

      if (!isInputValid(currentChar)) {
        errorOutput.textContent = "Illegal character detected!";
        errorOutput.classList.add("fade-out");
        flashInput(commentsInput);
        logError("Illegal character detected.");
        setTimeout(() => {
          errorOutput.textContent = "";
          errorOutput.classList.remove("fade-out");
          updateUI(commentsInput);
        }, 3000);
      } else if (commentsInput.value.trim().length < 10) {
        commentsInput.setCustomValidity(
          "Comments must be at least 10 characters."
        );
        logError("Comments must be at least 10 characters.");
      }
    });

    form.addEventListener("submit", function (event) {
      document.getElementById("formErrors").value =
        JSON.stringify(form_errors);
      if (!form.checkValidity()) {
        event.preventDefault();
        [nameInput, emailInput, commentsInput].forEach(updateUI);
      }
    });
  });