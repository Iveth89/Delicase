var searchParams = new URLSearchParams(window.location.search),
    pr_id = searchParams.get('pr_id');
var urlApi = 'https://delicase.vercel.app';

function cargaProducto(pr_id = 0) {

    fetch(urlApi + '/general/getProducto?pr_id='+pr_id).then(response => response.json()).then(function (data) {
        document.getElementById('imagen').src= data.pr_imagen;
        document.getElementById('titulo').innerHTML= data.pr_nombre;
        document.getElementById('descripcion').innerHTML= data.pr_descripcion 

        document.getElementById('agregar').addEventListener('click',function(){

            agregaProductoCarrito(data);
        });
    }).catch((e)=>{
     		        	bootbox.alert("Algo salio mal al cargar el detalle verifique su conexion e intentelo nuevamente");
    });
}

cargaProducto(pr_id);
