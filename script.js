let mallaData = [];

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        mallaData = data;
        iniciarInteraccion();
    });

function iniciarInteraccion() {
    const ramos = document.querySelectorAll('.ramo');
    
    ramos.forEach(ramo => {
        ramo.addEventListener('click', (e) => {
            e.stopPropagation();
            seleccionarRamo(ramo.id);
        });
    });

    document.body.addEventListener('click', limpiarMalla);
}

function seleccionarRamo(id) {
    limpiarMalla();
    
    const datos = mallaData.find(r => r.id === id);
    if (!datos) return;

    document.querySelectorAll('.ramo').forEach(r => r.classList.add('inactivo'));

    const actual = document.getElementById(id);
    if (actual) {
        actual.classList.remove('inactivo');
        actual.classList.add('activo');
    }

    datos.req.forEach(reqId => {
        const reqEl = document.getElementById(reqId);
        if (reqEl) {
            reqEl.classList.remove('inactivo');
            reqEl.classList.add('prerrequisito');
        }
    });

    mallaData.forEach(r => {
        if (r.req.includes(id)) {
            const abreEl = document.getElementById(r.id);
            if (abreEl) {
                abreEl.classList.remove('inactivo');
                abreEl.classList.add('abre');
            }
        }
    });
}

function limpiarMalla() {
    document.querySelectorAll('.ramo').forEach(r => {
        r.classList.remove('inactivo', 'activo', 'prerrequisito', 'abre');
    });
}
