var btnCrear = document.getElementById('btnGuardar');
btnCrear.addEventListener('click', function(e) {
    e.preventDefault();
    crearCarpeta();
});

function crearCarpeta() {
    var formulario = document.getElementById('carpetaForm');
    var formData = new FormData(formulario);
    var datos = {}

    for (var key of formData.keys()) {
        if(formData.get(key).trim().length > 0) {
            datos[key] = formData.get(key);
        } else {
            alert('El campo' + key + ' está vacío');
            return;
        }
    }

    fetch('/api/carpetas/create', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        response.status == 200 ? alert('Carpeta creada') : alert('La carpeta no se pudo crear.');
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
        return response.json();
    })
}