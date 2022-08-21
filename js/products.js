document.addEventListener('DOMContentLoaded', function(){
    const AUTOS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
    
   
    
    fetch(AUTOS_URL) 
    .then(respuesta => respuesta.json()) 
    .then(datos => {
        let divListaAutos = document.getElementById('products');
        divListaAutos.innerHTML +=
        `          
        <div class="text-center p-4">
            <h1>Productos</h1>
            <h5>Verás aquí todos los productos de la categoría <strong>Autos</strong></h5>
        </div>`;

        for (let i=0; i < datos.products.length; i++) {
            divListaAutos.innerHTML  += 
            `
            <div class="list-group-item list-group-item-action">   
                <div class="row">
                    <div class="col-3">
                            <img src="` + datos.products[i].image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4> ` + datos.products[i].name + `-` + datos.products[i].currency + datos.products[i].cost + `</h4> 
                            <p> ` + datos.products[i].description + `</p> 
                            </div>
                            <small class="text-muted">` + datos.products[i].soldCount + ` artículos</small>
                                
                        </div>

                    </div>
                </div>
            </div> 
                
            `
            }});

})

