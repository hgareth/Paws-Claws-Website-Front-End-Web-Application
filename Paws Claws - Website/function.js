

document.addEventListener("DOMContentLoaded", function () {
    // Function to update date and time
    function dateTime() {
        const date = new Date();
        const fullDate = date.toLocaleString('en-US', {
            day: 'numeric',
            month: "long",
            year: 'numeric',
        });

        const fullTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        const timeHeader = document.querySelector(".timeHeader");
        if (timeHeader) {
            timeHeader.innerHTML = `${fullDate} ${fullTime}`;
        }
    }
    setInterval(dateTime, 1000);
    dateTime();

    // Function to validate forms dynamically
    function validateForm(event) {
        event.preventDefault(); // Prevent default form submission

        const form = event.target; // Identify the form being submitted
        let isValid = true;

        // Clear previous error messages
        form.querySelectorAll(".error-message").forEach(error => error.remove());

        // Validate based on form ID
        if (form.id === "findPetsForm") {
            isValid = validateFindPetsForm(form);
        } else if (form.id === "giveAwayForm") {
            isValid = validateGiveAwayForm(form);
        }

        // If valid, allow submission
        if (isValid) {
            alert(`${form.id} submitted successfully!`);
            // form.submit(); // Uncomment this line if you want actual form submission
        }
    }

    // Function to validate 'Find Pets' form
    function validateFindPetsForm(form) {
        let isValid = true;

        if (!isRadioSelected(form, "pet-type")) {
            showError(form, "dog", "Please select a pet type.");
            isValid = false;
        }

        if (!isRadioSelected(form, "gender")) {
            showError(form, "male", "Please select a gender.");
            isValid = false;
        }

        if (!isCheckboxSelected(form, "getalong")) {
            showError(form, "Dogs", "Please select at least one 'Gets Along With' option.");
            isValid = false;
        }

        return isValid;
    }

    // Function to validate 'Give Away' form
    function validateGiveAwayForm(form) {
        let isValid = true;

        if (!isRadioSelected(form, "pet-type")) {
            showError(form, "dog", "Please select a pet type.");
            isValid = false;
        }

        const breed = form.querySelector("#giveaway-breed");
        if (!breed || breed.value.trim() === "") {
            showError(form, "giveaway-breed", "Please enter a breed.");
            isValid = false;
        }

        const age = form.querySelector("#giveaway-age");
        if (!age || age.value === "") {
            showError(form, "giveaway-age", "Please select an age range.");
            isValid = false;
        }

        if (!isRadioSelected(form, "gender")) {
            showError(form, "giveaway-male", "Please select a gender.");
            isValid = false;
        }

        if (!isCheckboxSelected(form, "getalong")) {
            showError(form, "Dogs", "Please select at least one 'Gets Along With' option.");
            isValid = false;
        }

        const ownerName = form.querySelector("#giveaway-owner-name");
        if (!ownerName || ownerName.value.trim() === "") {
            showError(form, "giveaway-owner-name", "Please enter your name.");
            isValid = false;
        }

        const email = form.querySelector("#giveaway-owner-email");
        if (!email || email.value.trim() === "" || !validEmail(email.value)) {
            showError(form, "giveaway-owner-email", "Please enter a valid email.");
            isValid = false;
        }

        const petInfo = form.querySelector("#giveaway-comment");
        if (!petInfo || petInfo.value.trim() === "") {
            showError(form, "giveaway-comment", "Please enter a comment.");
            isValid = false;
        }

        return isValid;
    }

    // Function to check if a radio button is selected
    function isRadioSelected(form, name) {
        return form.querySelector(`input[name="${name}"]:checked`) !== null;
    }

    // Function to check if at least one checkbox is selected
    function isCheckboxSelected(form, name) {
        return form.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
    }

    // Function to show error messages correctly
    function showError(form, inputId, message) {
        const inputElement = form.querySelector(`#${inputId}`);
        if (inputElement) {
            // Remove existing error if already present
            const existingError = inputElement.parentElement.querySelector(".error-message");
            if (existingError) existingError.remove();

            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.style.color = "red";
            errorDiv.style.fontSize = "0.9rem";
            errorDiv.style.marginTop = "5px";
            errorDiv.innerText = message;
            inputElement.parentElement.appendChild(errorDiv);
        } else {
            console.error(`Element with id '${inputId}' not found`);
        }
    }

    // Function to validate email format
    function validEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Attach event listener to both forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener("submit", validateForm);
    });
});
