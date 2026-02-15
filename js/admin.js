
function adminLogin() {
    const pass = document.getElementById("adminPass").value;
    if(pass === "admin123") {
        alert("Admin Login Successful");
    } else {
        alert("Wrong Password");
    }
}
