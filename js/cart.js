let articuloscart = [];
let DivTablaCarrito = document.getElementById("container");

function setValue() {
  let cantValue = document.getElementById('cant').value;
  let subtotal = document.getElementById('subtotal')


  if (cantValue > 1) {
    subtotal.innerHTML =

      `${articuloscart[0].currency}${cantValue * articuloscart[0].unitCost}`;
  } else {
    subtotal.innerHTML =
      `${articuloscart[0].currency}${articuloscart[0].unitCost}`;
  }

}

document.addEventListener('DOMContentLoaded', function () {


  const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  function tablaArticulos() {


    DivTablaCarrito.innerHTML =

      `<table class="table cart">
            <thead>
              <tr>
                <th scope="col" class="td-img"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col"class="td-img">Cantidad</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="${articuloscart[0].image}" alt="product image" class="img-cart td-img"></td>
                <td>${articuloscart[0].name}</td>
                <td>${articuloscart[0].currency}  ${articuloscart[0].unitCost}</td>
                <td><input class="img-cart"  type="number" id="cant" min="1" max"100" value="1" oninput="setValue()"></input></td>
                <td id="subtotal">${articuloscart[0].currency}${articuloscart[0].unitCost}</td>
              </tr>
            </tbody>
          </table>`;
  }



  fetch(CART_INFO_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {

      articuloscart = datos.articles;

      console.log(articuloscart);
      tablaArticulos();
    });

})