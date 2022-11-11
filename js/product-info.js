let productoInfo = [];
let productoComentarios = [];
let divComentarios = document.getElementById('comentarios');
let listacart = [];

 if (localStorage.getItem("prodCarrito") !== null) listacart = JSON.parse(localStorage.getItem("prodCarrito"));

function redirigirProductosID(id) {
    localStorage.setItem("productosID", id);
    window.location = "product-info.html";   
 }


 function agregarcart(){
    let botonCarrito = document.getElementById("btnCarrito");

    listacart.push(productoInfo);
    localStorage.setItem("prodCarrito", JSON.stringify(listacart));

    botonCarrito.style.backgroundColor = "blue";
    botonCarrito.style.border = "1px solid blue";
    botonCarrito.style.boxShadow = "none";
    botonCarrito.innerHTML = `Agregado al carrito`;    
 }

 function comentar(){
    let comentario = document.getElementById("comentario");
    let puntuacion = document.getElementById("puntaje");
    let usuario = localStorage.getItem("email");
    var fecha = new Date();
    var fechaAbreviada = fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+ fecha.getDate();
    let arroba = usuario.search("@")

   
    let innerComment = '';
        
        innerComment +=
       `<div class="score">`;
            for (let e=1; e <= 5; e++){
                innerComment += `<span class="fa fa-star`;
                if (puntuacion.value >= e){innerComment += ` checked`;}
                innerComment += `"></span>`;

        };
        innerComment +=
        `</div>`;

        innerComment +=
            `<p><strong> ` + usuario.substring(0,arroba) + `</strong> -` + fechaAbreviada +` - ` + comentario.value + `</p> 
            `;
        
    divComentarios.innerHTML += innerComment;

    comentario.value = " ";
    puntuacion.value = 5;

       
}
 

document.addEventListener('DOMContentLoaded', function(){

    const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/'+localStorage.getItem("productosID")+'.json';
    const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/`+localStorage.getItem("productosID")+'.json';
    let divProductoInfo = document.getElementById('container-Productoinfo');
    let divImagenes = document.getElementById('imagenes');
    let divProductosRelacionados = document.getElementById('productos-relacionados')

  
   function mostrarImagenes(){
     
    let carrousel = ''; 

        carrousel +=
        `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">

        `;
        carrousel += 
        `<div class="carousel-item active">
        <img src="` + productoInfo.images[0] + `" class="d-block w-100" alt="...">
      </div>`;

      
        for (let i=1; i < productoInfo.images.length; i++) {
            
            carrousel += 
            `        
            <div class="carousel-item">
            <img src="` + productoInfo.images[i] + `" class="d-block w-100" alt="...">
          </div> `;
        }
         
        carrousel +=
        `</div>`;

        carrousel +=
        `
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
    </div>`;
       
       divImagenes.innerHTML = carrousel;
        
    }

function mostrarComentarios(){
    for (let i=0; i < productoComentarios.length; i++) {
        let innerComment = '';
        
        innerComment +=
       `<div class="score">`;
            for (let e=1; e <= 5; e++){
                innerComment += `<span class="fa fa-star`;
                if (productoComentarios[i].score >= e){innerComment += ` checked`;}
                innerComment += `"></span>`;

        };
        innerComment +=
        `</div>`;

        innerComment +=
            `<p><strong> ` + productoComentarios[i].user + `</strong> - `+ productoComentarios[i].dateTime.substring(0, 9) + ` - ` + productoComentarios[i].description + `</p> 
            `;
        
        divComentarios.innerHTML += innerComment;
       
    }}

    function mostrarProductosRelacionados(){

    for (let i=0; i < productoInfo.relatedProducts.length; i++) {
        divProductosRelacionados.innerHTML +=
        `<div class="col-3" onclick="redirigirProductosID(${productoInfo.relatedProducts[i].id})">

            <img src="${productoInfo.relatedProducts[i].image}" alt="product image" class="img-thumbnail"></img>
            <p>${productoInfo.relatedProducts[i].name}</p>

        </div>`;
        
    }
    }
    
    


    function mostrarProductoInfo (){       
        
        divProductoInfo.innerHTML  += 
            `
            <div>
                <div class="text-center p-4">
                    <h3> ${productoInfo.name}</h3>
                </div>
                <div class="float-end">
                <a href="/products.html" class="previous">&laquo; Volver al listado</a>
                </div>
            </div>
            <div class="col">
                 <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><strong>Precio:</strong> <span class="text-muted">`  + productoInfo.currency + productoInfo.cost + `</span></p>
                        <p><strong>Descripción:</strong><span class="text-muted"> ` + productoInfo.description + `</span> </p>
                        
                        <p><strong>Categoría:</strong><span class="text-muted"> ` + productoInfo.category + `</span> </p>
                        
                        <p><strong>Cantidad de vendidos</strong><span class="text-muted"> ` + productoInfo.soldCount + `</span></p>
                         
                    </div>
                </div>
            </div> 
                
        `;
       
    }

    fetch(PRODUCT_INFO_URL) 
        .then(respuesta => respuesta.json()) 
        .then(datos => {
        
        productoInfo = datos;
        mostrarProductoInfo();
        mostrarImagenes();
        console.log(productoInfo);
        mostrarProductosRelacionados()
        
    });

    fetch(PRODUCT_INFO_COMMENTS_URL) 
    .then(respuesta => respuesta.json()) 
    .then(datos => {
    
    productoComentarios = datos;
    
    mostrarComentarios();
    
}); 
})
