const postalCodes = [
    { DZ: "^\\d{5}$" },
    { US: "^\\d{5}([\-]?\\d{4})?$" },
    { AU:"^\\d{4}$" },
    { BE:"^[1-9]{1}[0-9]{3}$" },
    { CA:"^([ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\\d[ABCEGHJKLMNPRSTVWXYZ]\\d)$" },
    { CN:"^\\d{6}$" },
    { ES:"^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$" },
    { GE:"^\\d{4}$" },
    { ET: "^\\d{4}$" },
    { KE:"^\\d{5}$" },
]

const form = document.querySelector(".form");

const emailInput = document.getElementById("mail");

const passwordInput = document.getElementById("password");

const confirmPswdInput = document.getElementById("confirmPassword");

const countryInput = document.getElementById("country");


const postalCodeInput = document.getElementById("postalCode");


const submitBtn = document.querySelector(".submitBtn");


emailInput.addEventListener("input", () => {
   if (emailInput.validity.valid) {
    emailInput.setCustomValidity("");
    
   }else {
    CheckError();
   }

})



countryInput.addEventListener("change", () =>{
   
    checkPostalCodeAndCountry(countryInput, postalCodeInput);

}) 

postalCodeInput.addEventListener("input", () => {
   
    checkPostalCodeAndCountry(countryInput, postalCodeInput);
    
});




function checkPostalCodeAndCountry(countrysInput, codeInput) {
    if (countrysInput.value === "") {
        countrysInput.setCustomValidity("please choose your country");
        countrysInput.reportValidity();
    }

    

    if (countrysInput.value === "" && codeInput.value !== "") {
        countrysInput.setCustomValidity("please choose your country");
        countrysInput.reportValidity();
        

    }

    if (countrysInput.value !== "" && codeInput.validity.valueMissing) {
        codeInput.setCustomValidity("please enter your country code");
        codeInput.reportValidity();
        

    }

    if (countrysInput.value !== "" && codeInput.value !== "") {
        const postalCodeObject = postalCodes.find((codeObj) => codeObj[countrysInput.value]);
        console.log(postalCodeObject);
        
        const pattern = postalCodeObject[countrysInput.value];
        console.log(pattern);
        
        //console.log(postalCodeInput.value);
        
        const postalCodeOBjRegexPattern = new RegExp(pattern);
        
        console.log(postalCodeOBjRegexPattern);
        
        const isValid = postalCodeOBjRegexPattern.test(codeInput.value);
        
        if (isValid) {
            countrysInput.validity.valid;
            
            countrysInput.setCustomValidity("");

            codeInput.validity.valid;

            codeInput.setCustomValidity("");
        }else {
            codeInput.setCustomValidity(`The postal code for ${countrysInput.value} is invalid`);
            codeInput.reportValidity();
   }

   console.log(isValid);


    }

   
}

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
        if (passwordInput.validity.valid) {
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
    if (passwordInput.validity.tooShort) {
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

    const pswdSuccessSpan = document.querySelector(".passwordSuccess");

    confirmPswdInput.setCustomValidity("");

    if (confirmPswdInput.validity.valueMissing) {
        confirmPswdInput.setCustomValidity("Confirm entered password");
    }

    if (confirmPswd !== "" &&  confirmPswd !== pswd) {
        confirmPswdInput.setCustomValidity("entered password should be the same as the previously entered password");
        
    }
    if (confirmPswd !== "" && confirmPswd === pswd){
        pswdSuccessSpan.textContent = "Passwords Match";
        
    }
    confirmPswdInput.reportValidity();


}


form.addEventListener("submit", (event) => {
    event.preventDefault();



    if (!emailInput.validity.valid) {
        CheckError();
    }else {emailInput.setCustomValidity("")
    };
    
    
    if (!passwordInput.validity.valid) {
        checkPswdError();
    }else {
        passwordInput.setCustomValidity("");
    }
    
    if (!confirmPswdInput.validity.valid) {
        checkConfirmPswdError();
    }else {
        confirmPswdInput.setCustomValidity("");
    }

    if (!countryInput.validity.valid || !postalCodeInput.validity.valid) {
        checkPostalCodeAndCountry(countryInput, postalCodeInput);

    }else {
        countryInput.setCustomValidity("");
    }
    
    


})