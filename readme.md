# Proyecto Administrador de Ventas

Bienvenidos! Este es el segundo trabajo que realicé en Ada ITW. Se trata de un CRUD de ventas (por las siglas en inglés de _Create, Read, Update, Delete_, o en español, "crear, leer, actualizar y eliminar").

Para la realización del trabajo se utilizaron datos locales (que consisten de un array de objetos con 20 ventas) por lo que cualquier cambio realizado se perderá al actualizar la página.

## Funcionalidades:

### Módulo de Ventas por Sucursal

![Módulo ventas por sucursal](/imagenes/Modulo-ventas-por-sucursal.jpg)

Este primer módulo contiene una tabla con el detalle de las sucursales y del total de las ventas realizada en cada una. La información de esta tabla se actualiza automáticamente al crear una venta nueva y al editar o eliminar ventas ya existentes.

### Módulo de Reportes

![Módulo reportes](/imagenes/Modulo-reportes.jpg)

En este módulo se muestra información adicional respectiva a las ventas, en este caso cuál fue el componente más vendido y la vendedora que más ingresos generó. Al igual que sucede con el módulo de ventas por sucursal, esta sección también se actualiza automáticamente según los cambios que se hagan en las ventas.

### Módulo Ventas

![Módulo ventas](/imagenes/Modulo-ventas.jpg)

En este módulo tenemos la tabla en donde se detallan las ventas realizadas, además de un botón en la parte superior derecha que nos permite agregar ventas nuevas. Los datos presentados en esta tabla son:

- La __fecha__ en la que se realizó la venta
- La __vendedora__ que realizó la venta
- La __sucursal__ donde se realizó la venta
- Los __componentes__ que se vendieron
- El __precio total__ que resulta de la suma de los precios de dichos componentes

Además, la tabla consta de una columna de __Acciones__ con dos botones: uno para editar y otro para eliminar cada una de las ventas.

Nótese que las ventas se encuentran ordenadas por fecha, de más reciente a más antigua.

## Acciones:

### Nueva venta

![Modal nueva venta](/imagenes/Modal-nueva-venta.jpg)

Al hacer click en el botón __Nueva venta__, se abre una ventana modal con un formulario para poder seleccionar los datos para cargar una venta nueva. Si se completan los datos de la venta y se hace click en el botón de Guardar, se agregará a la tabla una nueva venta. Si en cambio se hace click en el botón de cancelar, se cerrará esta ventana para volver a visualizar la tabla sin modificaciones. 

### Editar venta

![Modal editar venta](/imagenes/Modal-editar-venta.jpg)

La ventana de Editar venta se abre al hacer click en el __ícono de editar__ (verde) que se encuentra en la tabla asociado a cada venta. Al completar cada opción del formulario y hacer click en el botón de guardar, se modificará la venta ya existente con los nuevos datos. Por el contrario, el botón de cancelar cerrará la ventana sin modificar la venta.

### Eliminar venta

![Modal eliminar venta](/imagenes/Modal-eliminar-venta.jpg)

Por último al hacer click sobre el __ícono de eliminar__ (rojo) de cada venta, se abrirá una ventana en la que se pide confirmación para proceder con la acción. El botón de eliminar dentro de esta ventana borrará la venta de la tabla, mientras que el botón de cancelar solo cerrará la ventana. 

## Conclusión

Este trabajo práctico fue hasta el momento el más desafiante que realicé, y si bien hay muchas cosas que mejorar, estoy satisfecha con el resultado y con todo lo que aprendí y progrecé haciéndolo. Muchas gracias por llegar y quedarse hasta el final. Saludos!