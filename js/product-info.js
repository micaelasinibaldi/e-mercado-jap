let productoInfo = [];
let  productoComentarios = [];


document.addEventListener('DOMContentLoaded', function(){

    const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/'+localStorage.getItem("productosID")+'.json';
    const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/`+localStorage.getItem("productosID")+'.json';
    let divProductoInfo = document.getElementById('container-Productoinfo');
    let divImagenes = document.getElementById('imagenes');
    let divComentarios = document.getElementById('comentarios');

  
   function mostrarImagenes(){
    for (let i=0; i < productoInfo.images.length; i++) {
       divImagenes.innerHTML +=
       `
        <img src="` + productoInfo.images[i] + `" alt="product image" class="img-thumbnail"></img>`;
        
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
        
    });

    fetch(PRODUCT_INFO_COMMENTS_URL) 
    .then(respuesta => respuesta.json()) 
    .then(datos => {
    
    productoComentarios = datos;
    
    
   console.log(productoComentarios);
   mostrarComentarios();
}); 
})
