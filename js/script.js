//-----------------------VARIABLES GLOBALES-----------------------

//BLOQUE VENTAS POR SUCURSAL
const ventasCentro = document.querySelector('#ventas-centro')
const ventasCaballito = document.querySelector('#ventas-caballito')
//BLOQUE REPORTES
const productoEstrella = document.querySelector('#producto-estrella')
const mejorVendedora = document.querySelector('#mejor-vendedora')
//BLOQUE VENTAS
const tablaVentas = document.querySelector('#tbody-ventas')
const btnNuevaVenta = document.querySelector("#btn-nueva-venta")
//MODALES
const modalAgregar = document.querySelector("#modal-agregar")
const modalEditar = document.querySelector("#modal-editar")
const modalEliminar = document.querySelector("#modal-eliminar")
//FORMULARIO MODALES
const selectVendedora = document.querySelector("#select-vendedora")
const selectComponente = document.querySelector('#select-componente')
const selectSucursal = document.querySelector('#select-sucursal')
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

const sucursales = ["Centro", "Caballito"];


//----------AGREGO DATOS PRECARGADOS A LA TABLA DE VENTAS---------

const precioMaquina = (array) => {
  let suma = 0
  for (let precio of precios) {
    array.forEach(element => {
      precio.includes(element) ? suma += precio[1] : false
    })
  }
  return suma;
}

const precargadosTablaVentas = () => {
  for (let i=0 ; i<ventas.length ; i++){
    const filaVenta = document.createElement('tr')
    for (j=1 ; j<ventas[i].length ; j++){
      filaVenta.innerHTML = `<td>${ventas[i][1].toLocaleDateString()}</td> <td>${ventas[i][2]}</td> <td>${ventas[i][3]}</td><td>${ventas[i][4]}</td> <td>${precioMaquina(ventas[i][4])}</td> <td><i class="fas fa-edit icono i-editar"></i><i class="fas fa-trash-alt icono i-eliminar"></i></td>` 
    }
    tablaVentas.appendChild(filaVenta)
  }
  return ventas;
}
precargadosTablaVentas()

/*************************************************************
MODAL AGREGAR NUEVA VENTA
**************************************************************/ 

//-----RELLENANDO LAS OPCIONES DEL FORMULARIO CON DATOS PRECARGADOS------

//Vendedoras
let cargarVendedora = () =>{
  for (let i=0; i<vendedoras.length; i++){
    const valorVendedora = document.createElement('option')
    valorVendedora.innerHTML = vendedoras[i]
    selectVendedora.appendChild(valorVendedora)
  }
  return vendedoras;
}
cargarVendedora()

//Componentes
let cargarComponente = () => {
  for (let i=0; i<precios.length;i++){
    for (let j=0; j<precios[i][0][j].length;j++){
      const valorComponente = document.createElement('option')
      valorComponente.innerHTML = precios[i][0]
      selectComponente.appendChild(valorComponente)
    }
  }
  return precios;
}
cargarComponente()

//Sucursales
let cargarSucursal = () =>{
  for (let i=0; i<sucursales.length; i++){
    const valorSucursal = document.createElement('option')
    valorSucursal.innerHTML = sucursales[i]
    selectSucursal.appendChild(valorSucursal)
  }
  return sucursales;
}
cargarSucursal()

//-------------------FUNCIONALIDAD BOTONES----------------------
btnNuevaVenta.addEventListener('click', () => {
  modalAgregar.style.display = 'block';
})

btnCancelar.addEventListener('click', () => {
  modalAgregar.style.display = 'none';
})




