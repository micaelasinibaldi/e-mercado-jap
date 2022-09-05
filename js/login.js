function showAlertEmail() {
    document.getElementById("alert-email").classList.add("show");
    document.getElementById("email").classList.add("borderojo");
    document.getElementById("exclamation-email").classList.add("show")
}

function showAlertPassword() {
    document.getElementById("alert-password").classList.add("show");
    document.getElementById("password").classList.add("borderojo");
    document.getElementById("exclamation-password").classList.add("show")

}

let nombre = document.getElementById('email');
let apellido = document.getElementById('password');

document.getElementById('formLogin').addEventListener('submit', function(evento) {

  
        if (email.value.length == 0){
            showAlertEmail();
            evento.preventDefault();

        }
        if (password.value.length == 0){
            showAlertPassword();
            evento.preventDefault();

        }

        localStorage.setItem("email", email.value);
});

   

  
    
