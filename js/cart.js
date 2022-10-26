let articuloscart = [];
let DivTablaCarrito = document.getElementById("container");
let DivCostos = document.getElementById("costos");
//let DivEnvio = document.getElementById("tipoEnvio");
let DivTotal = document.getElementById("total");
let numtarjetacred = document.getElementById('numtarjetacred');
let codtarjetacred = document.getElementById('codtarjeta');
let venctarjetacred = document.getElementById('venctarjeta');
let numtarjetadebito = document.getElementById('numtarjetatranf');
let seleccionpago = document.getElementById('formaPago');
let tarjetaselec = document.getElementById('flexRadiotarjeta');
let debitoselec = document.getElementById('flexRadiodebito');

function setValue() {
  let cantValue = document.getElementById('cant').value;
  let subtotal = document.getElementById('subtotal');


  if (cantValue > 1) {
    subtotal.innerHTML =

      `${cantValue * articuloscart[0].unitCost}`;
  } else {
    subtotal.innerHTML =
      `${articuloscart[0].unitCost}`;
  }

}


function envio() {
  let subtotalGen = document.getElementById('subtotalGeneral').textContent;
  let CalculoEnvio = document.getElementById('calEnvio');
  let premium = document.getElementById('premium');
  let express = document.getElementById('express');
  let standar = document.getElementById('standar');

  if (express.checked == true) {
    CalculoEnvio.innerHTML =
      `${Math.round(parseInt(subtotalGen) * 0.07)}`;

  } else if (standar.checked == true) {
    CalculoEnvio.innerHTML =
      ` ${Math.round(parseInt(subtotalGen) * 0.05)}`;
  } else if (premium.checked == true) {
    CalculoEnvio.innerHTML =
      `${Math.round(parseInt(subtotalGen) * 0.15)}`;

  }
}

function subTotGen() {
  let artSubtotal = document.getElementById('subtotal').textContent;
  let subtotalGen = document.getElementById('subtotalGeneral');

  subtotalGen.innerHTML =
    `${artSubtotal}`;
}

function totalCambio() {
  let totalT = document.getElementById('totalNum');
  let envioT = document.getElementById('calEnvio').textContent;
  let subtotalGen = document.getElementById('subtotalGeneral').textContent;
  console.log(envioT);
  console.log(subtotalGen);
  totalT.innerHTML = `
  <p> USD ${Math.round(parseInt(subtotalGen) + parseInt(envioT))}</p>
  `;
}


function modalCredito() {

  numtarjetadebito.disabled = true;
  numtarjetacred.disabled = false;
  codtarjetacred.disabled = false;
  venctarjetacred.disabled = false;

}

function modalTransferencia() {

  numtarjetacred.disabled = true;
  codtarjetacred.disabled = true;
  numtarjetadebito.disabled = false;
  venctarjetacred.disabled = true;


}

function cerrarpago() {

  if (tarjetaselec.checked && numtarjetacred.value !== '' && codtarjetacred.value !== '' && venctarjetacred.value !== '') {

    seleccionpago.innerHTML =
      `<p> Tarjeta de crédito</p>`;

  } else if (debitoselec.checked && numtarjetadebito.value !== '') {

    seleccionpago.innerHTML =

      `<p> Transferencia bancaria</p>`;

  } else {

    seleccionpago.innerHTML =
      `<p>No ha seleccionado</p>
      <div class="seleccionpago">
      Debe seleccionar una forma de pago.
      </div>`;
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
                <td><input class="img-cart"  type="number" id="cant" min="1" max"100" value="1"  onchange="setValue();subTotGen();envio();totalCambio();"></input></td>
                <td>
                  <div class="moneda">
                    <p id="usd">USD</p>
                    <p id="subtotal">${articuloscart[0].unitCost}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>`;
  }

  function costos() {
    let artSubtotal = document.getElementById('subtotal').textContent;

    DivCostos.innerHTML = `
    <hr>
    <h6>Costos</h6>
    <div class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
          <p>Subtotal</p>
          <small class="text-muted">Precio unitario del producto por cantidad</small>
        </div>
        <div class="precio-unitario">
            <p>USD</p>
            <p id="subtotalGeneral">${artSubtotal}</p>
        </div>
      </div>
    </div>
    
    <div class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
          <p>Costo de envio</p>
          <small class="text-muted">Segun el tipo de envio</small>
        </div>
        <div class="precio-unitario">
          <p class="precio-unitario">USD </p>
          <p class="precio-unitario" id="calEnvio"> ${parseInt(artSubtotal) * 0.15}</p>
        </div>
      </div>
    </div>
`;
  }

  function total() {
    let artSubtotal = document.getElementById('subtotalGeneral').textContent;
    let costEnvio = document.getElementById('calEnvio').textContent;

    console.log(artSubtotal);
    console.log(costEnvio);
    DivTotal.innerHTML = `
    
    <div class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
          <p>Total ($)</p>
        </div>
      <div class="precio-unitario">
        <p class="precio-unitario" id="totalNum">USD${Math.round(parseInt(artSubtotal) + parseInt(costEnvio))}</p>
      </div>
    </div>
    

    `

  }

  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    let alertsucces = document.getElementById('success')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            alertsucces.innerHTML =
              `<div class="alert alert-success" role="alert">
          Has comprado con éxito!
        </div>`
          }

          form.classList.add('was-validated')
        }, false)


      })

  })()







  fetch(CART_INFO_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {

      articuloscart = datos.articles;

      console.log(articuloscart);
      tablaArticulos();
      costos();
      total();

    });

})