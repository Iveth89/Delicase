//var searchParams = new URLSearchParams(window.location.search);
  var  pr_id = sessionStorage.getItem('pr_id');
var urlApi = 'https://delicase.vercel.app';
 
function cargaProducto(pr_id = 0) {
var cont=0;
    fetch(urlApi + '/general/getProducto?pr_id='+pr_id).then(response => response.json()).then(function (data) {
        document.getElementById('imagen').src='/assets/imagenes/'+ data.pr_imagen;
        document.getElementById('titulo').innerHTML= data.pr_nombre;
        document.getElementById('descripcion').innerHTML= data.pr_descripcion 

        document.getElementById('agregar').addEventListener('click',function(){

            agregaProductoCarrito(data);
        });
    }).catch((e)=>{
        cont++;
                if(pr_id==null){
                 window.location.href=window.location.origin;
                }
                //if(cont<3)
               //  window.location.reload();
      
     		        	bootbox.alert("Algo salio mal al cargar el detalle verifique su conexion e intentelo nuevamente");
    });
}
$(document).ready( function() {
cargaProducto(pr_id);
 });
