// html elements 

var signupEamil = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupName = document.getElementById("signupName");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var loginBtn = document.querySelector(".login");
var signupBtn = document.querySelector(".signup");
var logoutBtn = document.querySelector(".logout");
// app variables 

var signUpArray = [];
if (localStorage.getItem("users") != null){
    signUpArray = JSON.parse(localStorage.getItem("users")) 
}
var user = localStorage.getItem("user")
if (user){
    document.getElementById("username").innerHTML = "Welcome " + user
}

// functions 

function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}
function isExist(){
    for (var i=0; i<signUpArray.length; i++){
        if(signUpArray[i].email.toLowerCase() == signupEamil.value.toLowerCase()){
            return false
        }
    }
}
function signUp(){
    if (isEmpty() == false){
        document.getElementById("exist").innerHTML = `
        <p class="text-danger">All inputs is required </p> 
        `
        return false
    }

    var signup = {
        name : signupName.value,
        email : signupEamil.value,
        password : signupPassword.value,
    } 
    if (signUpArray.length == 0){
        signUpArray.push(signup);
        localStorage.setItem("users" , JSON.stringify(signUpArray));
        document.getElementById("exist").innerHTML = `
        <p class="text-success">Success</p>
         ` 
         return false
    }
    if (isExist() == false){
        document.getElementById("exist").innerHTML = `
        <p class="text-danger"> email already exist</p>
        `
    }else{
        signUpArray.push(signup);
        localStorage.setItem("users", JSON.stringify(signUpArray));
        document.getElementById("exist").innerHTML = `
        <p class="text-success">Success</p>
         `
    }

    clearInput();
}
function clearInput(){
    signupName.value = "";
    signupEamil.value = "";
    signupPassword.value = "";
}
function isLoginEmpty(){
    if ( signinEmail.value == "" || signinPassword.value == ""){
        return false
    }
    else{
        return true
    }
}
function login(){
    if(isLoginEmpty() == false){
        document.getElementById("incorrect").innerHTML = `
        <p class="text-danger">All inputs required</p>`
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() != email.toLowerCase() || signUpArray[i].password.toLowerCase() != password.toLowerCase()){
            document.getElementById("incorrect").innerHTML = `
            <p class="text-danger">email or password is incorrect</p>
            `
        }
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {           
            localStorage.setItem("user", signUpArray[i].name);
            location.assign("home.html")
        }
    }

    
}
function logout(){
    localStorage.removeItem("user")
}


