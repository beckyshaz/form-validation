const postalCodes = {
    DZ:"^\d{5}$",
    US:"^\d{5}([\-]?\d{4})?$",
    AU:"^\d{4}$",
    BE:"^[1-9]{1}[0-9]{3}$",
    CA:"^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$",
    CN:"^\d{6}$",
    ES:"^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$",
    GE:"^\d{4}$",
    ET: "^\d{4}$",
    KE:"^\d{5}$",
}

const form = document.querySelector(".form");

const emailInput = document.getElementById("mail");

const passwordInput = document.getElementById("password");

const confirmPswdInput = document.getElementById("confirmPassword");

const selectCountryInput = document.getElementById("country");


const postalCodeInput = document.getElementById("postalCode");


const submitBtn = document.querySelector(".submitBtn");


emailInput.addEventListener("input", () => {
   if (emailInput.validity.valid) {
    emailInput.setCustomValidity("");
    
   }else {
    CheckError();
   }

})

selectCountryInput.addEventListener("change", (event) =>{
    const countryCode = event.target.value;
    console.log(countryCode);

}) 


postalCodeInput.addEventListener("input", (event) => {
    const userPostalCode = event.target.value;
    console.log(userPostalCode);
})


function CheckError() {
    emailInput.setCustomValidity("");
   if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity("Please provide your email");
   }
   else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("Entered Value needs to be an email");
   }
   emailInput.reportValidity();
  
}

let touched = false;

passwordInput.addEventListener("blur", () => {
    touched = true;
    if (passwordInput.validity.valid) {
     passwordInput.setCustomValidity("");
     
    }else {
     checkPswdError();
    }
 
 });
 

 passwordInput.addEventListener("input", () => {
   if (touched) {
        if (!passwordInput.validity.valid) {
            passwordInput.setCustomValidity("");
    
            
           }else {
           // passwordInput.setCustomValidity();
            checkPswdError();
           }
    }
    
 
 });



function checkPswdError() {
    passwordInput.setCustomValidity("");
    if (passwordInput.validity.valueMissing) {
        passwordInput.setCustomValidity("please enter a password");

    }
    else if (passwordInput.validity.tooShort) {
        passwordInput.setCustomValidity(`The password you entered is too short,
             password should be atleast ${passwordInput.minLength} characters, you entered ${passwordInput.value.length}`);
    
    }
    passwordInput.reportValidity();

}

confirmPswdInput.addEventListener("input", () => {
    if (confirmPswdInput.validity.valid) {
     confirmPswdInput.setCustomValidity("");
     
    }else {
     checkConfirmPswdError();
    }
 
 })

function checkConfirmPswdError() {
    const pswd = passwordInput.value;
    console.log(pswd);
    const confirmPswd = confirmPswdInput.value;
    console.log(confirmPswd);
    if (confirmPswdInput.validity.valueMissing) {
        confirmPswdInput.setCustomValidity("Confirm entered password");
    }
    else if (confirmPswdInput.value !== passwordInput.value) {
        confirmPswdInput.setCustomValidity("entered password should be the same as the previously entered password");
        
    }else {
        confirmPswdInput.setCustomValidity("");
    }
    confirmPswdInput.reportValidity();


}