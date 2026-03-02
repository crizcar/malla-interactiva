let mallaData = [];
let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        mallaData = data;
        iniciarInteraccion();
        cargarAprobados();
    });

function iniciarInteraccion() {
    const ramos = document.querySelectorAll('.ramo');
    
    ramos.forEach(ramo => {
        // Clic izquierdo: Ver ruta
        ramo.addEventListener('click', (e) => {
            e.stopPropagation();
            seleccionarRamo(ramo.id);
        });

        // Clic derecho: Tachar/Aprobar
        ramo.addEventListener('contextmenu', (e) => {
            e.preventDefault(); 
            toggleAprobado(ramo.id);
        });
    });

    document.body.addEventListener('click', limpiarMalla);
}

function toggleAprobado(id) {
    const index = aprobados.indexOf(id);
    if (index === -1) {
        aprobados.push(id);
    } else {
        aprobados.splice(index, 1);
    }
    localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
    cargarAprobados();
}

function cargarAprobados() {
    document.querySelectorAll('.ramo').forEach(r => r.classList.remove('aprobado'));
    aprobados.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('aprobado');
    });
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
