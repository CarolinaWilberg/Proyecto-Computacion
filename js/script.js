//-----------------------VARIABLES GLOBALES-----------------------

//BLOQUE VENTAS POR SUCURSAL
const ventasCentro = document.querySelector('#ventas-centro')
const ventasCaballito = document.querySelector('#ventas-caballito')
//BLOQUE REPORTES
const productoEstrella = document.querySelector('#producto-estrella')
const mejorVendedora = document.querySelector('#mejor-vendedora')
//BLOQUE VENTAS
const btnNuevaVenta = document.querySelector("#btn-nueva-venta")
//MODALES
const modalAgregar = document.querySelector("#modal-agregar")
const modalEditar = document.querySelector("#modal-editar")
const modalEliminar = document.querySelector("#modal-eliminar")
//FORMULARIO MODALES
const selectVendedora = document.querySelector("#select-vendedora")
//BOTONES MODALES
const btnCancelar = document.querySelector("#btn-cancelar")
const btnGuardarNueva = document.querySelector("#btn-guardar-nueva")
const btnGuardarCambio = document.querySelector("#btn-guardar-cambio")
const btnEliminar = document.querySelector("#btn-eliminar")


//-------------------------VALORES PRECARGADOS---------------------
const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];

const ventas = [
   [1, new Date(2019, 1, 4), "Grace", "Centro", ["Monitor GPRS 3000", "Motherboard ASUS 1500"]],
   [2, new Date(2019, 0, 1), "Ada", "Centro", ["Monitor GPRS 3000", "Motherboard ASUS 1500"]],
   [3, new Date(2019, 0, 2), "Grace", "Caballito", ["Monitor ASC 543", "Motherboard MZI"]],
   [4, new Date(2019, 0, 10), "Ada", "Centro", ["Monitor ASC 543", "Motherboard ASUS 1200"]],
   [5, new Date(2019, 0, 12), "Grace", "Caballito", ["Monitor GPRS 3000", "Motherboard ASUS 1200"]],
]

const precios = [
   ["Monitor GPRS 3000",200] ,
   ["Motherboard ASUS 1500",120 ],
   ["Monitor ASC 543", 250 ],
   ["Motherboard ASUS 1200", 100 ],
   ["Motherboard MZI", 30 ],
   ["HDD Toyiva", 90 ],
   ["HDD Wezter Dishital", 75 ],
   ["RAM Quinston", 110 ],
   ["RAM Quinston Fury", 230 ],
]


//----------------------FUNCIONALIDAD BOTONES---------------------
btnNuevaVenta.addEventListener('click', () => {
  modalAgregar.style.display = 'block';
})

btnCancelar.addEventListener('click', () =>{
  modalAgregar.style.display = 'none';
})


//-------------RELLENANDO FORMULARIOS DE LAS MODALES---------------
let cargarVendedora = () =>{
  for (let i=0; i<vendedoras.length; i++){
  const valorVendedora = document.createElement('option')
  valorVendedora.innerHTML = vendedoras[i]
  selectVendedora.appendChild('valorVendedora')
}
return vendedoras;
}

cargarVendedora()
