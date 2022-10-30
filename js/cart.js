let articuloscart = [];
let articuloscarrito = JSON.parse(localStorage.getItem("prodCarrito"));;
let DivTablaCarrito = document.getElementById("container");
let DivTotal = document.getElementById("total");
let numtarjetacred = document.getElementById('numtarjetacred');
let codtarjetacred = document.getElementById('codtarjeta');
let venctarjetacred = document.getElementById('venctarjeta');
let numtarjetadebito = document.getElementById('numtarjetatranf');
let seleccionpago = document.getElementById('formaPago');
let tarjetaselec = document.getElementById('flexRadiotarjeta');
let debitoselec = document.getElementById('flexRadiodebito');
let sumasubtotales = [];
let CalculoEnvio = document.getElementById('calEnvio');
let premium = document.getElementById('premium');
let express = document.getElementById('express');
let standar = document.getElementById('standar');
let subtotalGen = document.getElementById('subtotalGeneral');
let costEnviototal = 0;
let costEnvio = 0.15;
let subtotal = 0;
let total = 0;

console.log(articuloscarrito);

function setValue() {

  let subtotalParcial = 0;
  subtotal = 0;

  for (let i = 0; i < articuloscarrito.length; i++) {

    let subtotalProd = DivTablaCarrito.getElementsByTagName("p")[i];
    let cant = DivTablaCarrito.getElementsByTagName("input")[i].value;

    if (cant >= 1 && articuloscarrito[i].currency == 'USD') {
      subtotalParcial = cant * parseInt(articuloscarrito[i].cost);

    } else if (cant >= 1 && articuloscarrito[i].currency !== 'USD') {

      subtotalParcial = cant * (parseInt(articuloscarrito[i].cost) / 40);
    }
    else {
      subtotalParcial = parseInt(articuloscarrito[i].cost);
    }
    subtotal += subtotalParcial;
    subtotalProd.innerHTML = `${subtotalParcial}`;
  }

  subtotalGen.innerHTML = `${subtotal}`;
  envio(costEnvio);
}


function envio(porcentaje) {
  console.log('subtotal ' + subtotal);
  console.log('porcentaje ' + porcentaje);
  costEnvio = porcentaje;
  costEnviototal = Math.round(subtotal * porcentaje);
  CalculoEnvio.innerHTML = `${costEnviototal}`;
  mostrartotal();
}


function mostrartotal() {
  let totalT = document.getElementById('totalNum');
  total = subtotal + costEnviototal;
  totalT.innerHTML = `USD${total}`;
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

    var contenidoTabla = '';

    contenidoTabla +=

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
            <tbody>`;
    for (let i = 0; i < articuloscarrito.length; i++) {

      contenidoTabla +=

        `
              <tr>
                <td><img src="${articuloscarrito[i].images[0]}" alt="product image" class="img-cart td-img"></td>
                <td>${articuloscarrito[i].name}</td>
                <td>${articuloscarrito[i].currency}  ${articuloscarrito[i].cost}</td>
                <td><input class="img-cart"  type="number" id="cant" min="1" max"100" value="1"  onchange="setValue();"></input></td>
                <td> 
                  `;
      if (articuloscarrito[i].currency !== 'USD') {
        contenidoTabla +=
          `<div class="moneda">
                        <span>USD</span>
                          <p>${parseInt(articuloscarrito[i].cost) / 40}</p>
                        </div>
                        `;
      } else {
        contenidoTabla +=
          `<div class="moneda">
                      <span>USD</span>
                      <p>${articuloscarrito[i].cost}</p> </div>
                      `;
      }

      contenidoTabla +=
        `</td></tr>`;

    }

    contenidoTabla +=
      `</tbody>
        </table>`;

    DivTablaCarrito.innerHTML = contenidoTabla;

    DivTotal.innerHTML = `
    
    <div class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
          <p>Total ($)</p>
        </div>
      <div class="precio-unitario">
        <p class="precio-unitario" id="totalNum">USD${total}</p>
      </div>
    </div>
    
    `;

  }

  (function () {
    'use strict'


    var forms = document.querySelectorAll('.needs-validation')
    let alertsucces = document.getElementById('success')

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
        </div>`;
          }

          form.classList.add('was-validated')
        }, false)

      })

  })()

  fetch(CART_INFO_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {

      articuloscart = datos.articles;

      tablaArticulos();
      setValue();
    });

})