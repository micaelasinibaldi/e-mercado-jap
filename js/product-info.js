let productoInfo = [];
let  productoComentarios = [];

function redirigirProductosID(id) {
    localStorage.setItem("productosID", id);
    window.location = "product-info.html";   
 }

 let listacart = [];

 if (localStorage.getItem("prodCarrito") !== null) listacart = JSON.parse(localStorage.getItem("prodCarrito"));
 
 console.log(listacart);

 function agregarcart(){

    listacart.push(productoInfo);
    localStorage.setItem("prodCarrito", JSON.stringify(listacart));
    
 }


 

document.addEventListener('DOMContentLoaded', function(){

    const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/'+localStorage.getItem("productosID")+'.json';
    const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/`+localStorage.getItem("productosID")+'.json';
    let divProductoInfo = document.getElementById('container-Productoinfo');
    let divImagenes = document.getElementById('imagenes');
    let divComentarios = document.getElementById('comentarios');
    let divProductosRelacionados = document.getElementById('productos-relacionados')

  
   function mostrarImagenes(){
     
       
        for (let i=0; i < productoInfo.images.length; i++) {
       divImagenes.innerHTML +=
       `        
        <img src="` + productoInfo.images[i] + `" alt="product image" class="img-thumbnail"></img> `;
        
    }}

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
            `<p><strong> ` + productoComentarios[i].user + `</strong> - `+ productoComentarios[i].dateTime + ` - ` + productoComentarios[i].description + `</p> 
            `;
        
        divComentarios.innerHTML += innerComment;
       
    }}

    function mostrarProductosRelacionados(){

    for (let i=0; i < productoInfo.relatedProducts.length; i++) {
        divProductosRelacionados.innerHTML +=
        `<div onclick="redirigirProductosID(${productoInfo.relatedProducts[i].id})">

            <img src="${productoInfo.relatedProducts[i].image}" alt="product image" class="img-thumbnail"></img>
            <p>${productoInfo.relatedProducts[i].name}</p>

        </div>`;
        
    }
    }
    


    function mostrarProductoInfo (){       
        
        divProductoInfo.innerHTML  += 
            `
            <h3> ${productoInfo.name}</h3>
            <div class="col">
                 <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <p><strong>Precio</strong></p>
                        <p> `  + productoInfo.currency + productoInfo.cost + `</p> 
                        <p><strong>Descripción</strong></p>
                        <p> ` + productoInfo.description + `</p> 
                        <p><strong>Categoría</strong></p>
                        <p> ` + productoInfo.category + `</p> 
                        <p><strong>Cantidad de vendidos</strong></p>
                        <p> ` + productoInfo.soldCount + `</p> 
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
