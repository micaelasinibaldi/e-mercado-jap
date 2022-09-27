let productos = [];
let productosTodos = [];
const ORDER_BY_PROD_HCOST = "H$";
const ORDER_BY_PROD_LCOST = "L$";
const ORDER_BY_PROD_REL = "Rel";
let currentProductsArray = [];
let currentSortCriteria = undefined;

function setProductosID(id) {
    localStorage.setItem("productosID", id);
    window.location = "product-info.html"
    console.log(id);    
}

document.addEventListener('DOMContentLoaded', function(){

    const PRODUCTOS_URL = 'https://japceibal.github.io/emercado-api/cats_products/'+localStorage.getItem("catID")+'.json';
    let divListaProductos = document.getElementById('products');
    let rangeFilterCountMin = document.getElementById('rangeFilterCountMin');
    let rangeFilterCountMax = document.getElementById('rangeFilterCountMax');
    let rangeFilterCount = document.getElementById('rangeFilterCount');
    let clearRangeFilter = document.getElementById("clearRangeFilter");

    

    function mostrarProductos (){
        divListaProductos.innerHTML = '';
        for (let i=0; i < productos.length; i++) {
            divListaProductos.innerHTML  += 
            `
            <div onclick="setProductosID(`+ productos[i].id +`)" class="list-group-item list-group-item-action">   
                <div class="row">
                    <div class="col-3">
                            <img src="` + productos[i].image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4> ` + productos[i].name + `-` + productos[i].currency + productos[i].cost + `</h4> 
                            <p> ` + productos[i].description + `</p> 
                            </div>
                            <small class="text-muted">` + productos[i].soldCount + ` vendidos</small>
                                
                        </div>

                    </div>
                </div>
            </div> 
                
            `;
        }

    }

    fetch(PRODUCTOS_URL) 
    .then(respuesta => respuesta.json()) 
    .then(datos => {
        let nombreCat = document.getElementById('nombre-cat');
        nombreCat.innerHTML = datos.catName;
        
        productosTodos = datos.products;
        productos = datos.products;
        mostrarProductos();
          
    });

    clearRangeFilter.addEventListener("click", function(){
        rangeFilterCountMin.value = "";
        rangeFilterCountMax.value = "";

        min = -Infinity;
        max = Infinity;
        productos = productosTodos;
        mostrarProductos();
    });

    rangeFilterCount.addEventListener('click', function() {
        let min;
        if (rangeFilterCountMin.value !== '' && rangeFilterCountMin.value !== undefined) {
            min = rangeFilterCountMin.value;
        } else {
            min = -Infinity;
        };
        let max;
        if (rangeFilterCountMax.value !== '' && rangeFilterCountMax.value !== undefined) {
            max = rangeFilterCountMax.value;
        } else {
            max = Infinity;
        };
        productos = productosTodos.filter(productos => productos.cost >= min && productos.cost <= max);
        mostrarProductos();
    });

    function sortProducts(criteria, array){
        let result = [];
        if (criteria === ORDER_BY_PROD_HCOST){
            result = array.sort(function(a, b) {
                let aCost = parseInt(a.cost);
                let bCost = parseInt(b.cost);
    
                if ( aCost > bCost ){ return -1; }
                if ( aCost < bCost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_PROD_LCOST){
            result = array.sort(function(a, b) {
                let aCost = parseInt(a.cost);
                let bCost = parseInt(b.cost);
    
                if ( aCost < bCost ){ return -1; }
                if ( aCost > bCost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_PROD_REL){
            result = array.sort(function(a, b) {
                let aSoldCount = parseInt(a.soldCount);
                let bSoldCount = parseInt(b.soldCount);
    
                if ( aSoldCount > bSoldCount ){ return -1; }
                if ( aSoldCount < bSoldCount ){ return 1; }
                return 0;
            });
        
        return result;
        }
    }
    
    function sortAndShowProducts(sortCriteria, productosArray){
        currentSortCriteria = sortCriteria;
    
        if(productosArray != undefined){
            currentProductsArray = productosArray;
        }

        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

        mostrarProductos();
    }

    document.getElementById("sortByHCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_HCOST, productosTodos);   
    });


    document.getElementById("sortByLCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_LCOST, productosTodos);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL, productosTodos);
    });   

 
})


