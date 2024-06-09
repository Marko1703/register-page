const formEl = document.querySelector('.form')
const firstNameEl = document.querySelector('.first-name');
const lastNameEl = document.querySelector('.last-name');
const emailEl = document.querySelector('.email');
const passwordEl = document.querySelector('.password');
const cpasswordEl = document.querySelector('.cpassword');

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
});

const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {
    const inputGroup = input.parentElement;
    
    inputGroup.classList.remove('success');
    inputGroup.classList.add('error');

    const error = inputGroup.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const inputGroup = input.parentElement;

    inputGroup.classList.remove('error');
    inputGroup.classList.add('success');

    const error = inputGroup.querySelector('small');
    error.textContent = '';
}

const checkFirstName = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const firstName = firstNameEl.value.trim();

    if (!isRequired(firstName)) {
        showError(firstNameEl, 'First name cannot be blank.');
    } else if (!isBetween(firstName.length, min, max)) {
        showError(firstNameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
}

const checkLastName = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'Last name cannot be blank.');
    } else if (!isBetween(lastName.length, min, max)) {
        showError(lastNameEl, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    
    const confirmPassword = cpasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(cpasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(cpasswordEl, 'Confirm password does not match');
    } else {
        showSuccess(cpasswordEl);
        valid = true;
    }

    return valid;
};

formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        alert("Form submitted successfully!");
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

formEl.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first-name':
            checkFirstName();
            break;
        case 'last-name':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'cpassword':
            checkConfirmPassword();
            break;
    }
}));

