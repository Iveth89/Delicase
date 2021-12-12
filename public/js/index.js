var urlApi = 'https://delicase.vercel.app';

function cargaFiltros() {
 fetch(urlApi + '/general/getAllTiposProducto').then(response => response.json()).then(function (data) {
        document.getElementById('filtros').innerHTML='';
  var lista = '';
        data.forEach(function (el) {
           lista+=`
           <div class="col mb-1 text-center">
               <button id="filtro_${el.tp_id}" type="button" class="btn btn-outline-dark w-100" onclick="cargaProductos(${el.tp_id}, '')">
               ${el.tp_nombre}
               <span class="badge bg-dark text-white ms-1 rounded-pill">${el.tp_disponibles}</span>
               </button>
           </div>
           `;
        });
        document.getElementById('filtros').innerHTML=lista;
    });
}


// tp_id = 0 para no aplicar filtro de tipo de producto
function cargaProductos(tp_id = 0, key_words = '') {
    var data =`?tp_id=${tp_id}&key_words=${key_words}`
    

    $('#key_words').val(key_words);
    $('#filtros .btn.active').removeClass('active');
    $(`#filtro_${tp_id}`).addClass('active');

    fetch(urlApi + '/general/getAllProductos'+ data).then(response => response.json()).then(function (data) {
        document.getElementById('productos').innerHTML='';
        var elements='';
        data.forEach(function (el) {
            elements+=`
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="img-responsive" src="/assets/imagenes/${el.pr_imagen}" alt="Now found" />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${el.pr_nombre}</h5>
                            <!-- Product price-->
                            ${el.pr_costo}.00 MXN
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><button class="btn btn-outline-dark mt-auto" onclick="detalleproducto(${el.pr_id})">Detalle</button></div>
                    </div>
                </div>
            </div>
            `;
        });
        document.getElementById('productos').innerHTML=elements;
    });
}
function detalleproducto(id){
    sessionStorage.setItem('pr_id', id);
   window.location.href=window.location.origin+"/detalle.html";
   }
window.addEventListener("load", function(){
    cargaFiltros();
    cargaProductos(0, '');

document.getElementById('limpiar').addEventListener('click',function (ev) {
    cargaProductos(0, '');
});

document.getElementById('buscar').addEventListener("click",function (argument) {
    cargaProductos(0, $('#key_words').val());
});
});
// $.get('http://127.0.0.1:3000/general/getAllProductos/0');
// $.get('http://127.0.0.1:3000/general/getAllTiposProducto');
