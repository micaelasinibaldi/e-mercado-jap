let infousuarios = [];
if (localStorage.getItem('InfoUsuarios')) {
    infousuarios = JSON.parse(localStorage.getItem('InfoUsuarios'));
}
console.log(infousuarios); 

let conteoID = 0;
if (localStorage.getItem('conteoID')) {
    conteoID = JSON.parse(localStorage.getItem('conteoID'));
}

let nombre1 =  document.getElementById("primerNombre");
let nombre2 = document.getElementById("segundoNombre");
let apellido1 = document.getElementById("primerApellido");
let apellido2 = document.getElementById("segundoApellido");
let email = document.getElementById("E-mail");
email.value = localStorage.getItem("email");
let cambiarImagenPerfil = document.getElementById("cambiarImagenPerfil");
let imgActual = document.getElementById("imgActual");
let divImg = document.getElementById("divImg");

for (let i=0; i < infousuarios.length; i++){

    if (infousuarios[i].Email.includes(email.value)){

        nombre1.value = infousuarios[i].Nombre;
        nombre2.value = infousuarios[i].Nombre2;
        apellido2.value = infousuarios[i].Apellido2;
        apellido1.value = infousuarios[i].Apellido;
        if (infousuarios[i].Image === undefined){

            imgActual.src = "/img/img_perfil.png";
        } else{
            imgActual.src = infousuarios[i].Image;
        }
        
    }
}

cambiarImagenPerfil.addEventListener('change', function(e) {
    var file = cambiarImagenPerfil.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            divImg.innerHTML = "";

            var img = new Image();
            img.src = reader.result;
            img.id= "imgActualizada";
            img.classList.add("img-perfil");

            divImg.appendChild(img);
        }

        reader.readAsDataURL(file); 
    } else {
        document.getElementById("avisoImg").innerHTML = "Archivo no soportado!";
        document.getElementById("avisoImg").classList.add("seleccionpago");
    }

   
});


function actualizarInfoUsuarios() {
    localStorage.setItem('InfoUsuarios', JSON.stringify(infousuarios));
}



function crearID() {
    conteoID++;
    localStorage.setItem('conteoID', JSON.stringify(conteoID))
    return conteoID;
}


function guardarcambios(){

   let mailexiste = false;

   for (let i=0; i < infousuarios.length; i++){
       if (infousuarios[i].Email.includes(email.value)){         mailexiste = true;
           infousuarios[i].Nombre = nombre1.value;
           infousuarios[i].Nombre2 = nombre2.value;
           infousuarios[i].Apellido2 = apellido2.value;
           infousuarios[i].Apellido = apellido1.value;
           infousuarios[i].Email = email.value;
           infousuarios[i].Image = imgActualizada.src;

           console.log(imgActualizada.src);
           
       } 
   }

    if  (mailexiste == false){
       
     let usuario = {
             "Id": crearID(),
             "Nombre": (nombre1.value),
             "Nombre2": (nombre2.value),
             "Apellido": (apellido1.value),
             "Apellido2": (apellido2.value),
             "Email": (email.value),
             "Image": (imgActual.src),
         };
     
         infousuarios.push(usuario);
   
    }
    console.log(infousuarios);
    actualizarInfoUsuarios();
}

(function () {
    'use strict'
  
   
    var forms = document.querySelectorAll('.needs-validation')
  
   
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

