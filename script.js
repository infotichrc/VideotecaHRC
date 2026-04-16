const catalogo = [
    {
        id: 1,
        titulo: "Cómo mover al paciente en la cama",
        categoria: "mover", // <-- Aseguramos que se llame 'categoria'
        tags: "postrado, mover, cama, kinesiologo, espalda, fuerza, girar",
        profesional: "Kinesiología",
        videoUrl: "vB-fR3n9lWk",
        explicacion: "En este video enseñamos a girar al paciente de lado y a sentarlo sin que usted se lastime la espalda. Es vital para evitar que al paciente le salgan heridas (escaras)."
    },
    {
        id: 2,
        titulo: "Cómo bañar a alguien que no se puede levantar",
        categoria: "aseo",
        tags: "baño, limpieza, aseo, enfermera, higiene, tina, esponja",
        profesional: "Enfermería",
        videoUrl: "M2_H0P9O25Y",
        explicacion: "Paso a paso para lavar el cuerpo del paciente usando toallas húmedas y jabón neutro, manteniendo la privacidad y el calor del paciente."
    },
    {
        id: 3,
        titulo: "Cuidado de la piel (evitar heridas)",
        categoria: "aseo",
        tags: "heridas, escaras, piel, parches, crema, llagas",
        profesional: "Enfermería",
        videoUrl: "M2_H0P9O25Y",
        explicacion: "Consejos sobre qué cremas usar y cada cuántas horas hay que cambiar de posición al familiar para que su piel no sufra."
    },
    {
        id: 4,
        titulo: "Alimentación por sondas (Gastrostomía)",
        categoria: "comida",
        tags: "comida, sonda, guatita, nutricionista, leche, suplemento, manguera",
        profesional: "Nutricionista",
        videoUrl: "dQw4w9WgXcQ",
        explicacion: "Si su familiar se alimenta por un tubito a la guatita, aquí explicamos cómo pasar el alimento y cómo limpiar la zona para evitar infecciones."
    },
    {
        id: 5,
        titulo: "Consejos para el cuidador (Salud Mental)",
        categoria: "animo",
        tags: "cansancio, estres, pena, psicologo, ayuda, agotamiento",
        profesional: "Psicología / Servicio Social",
        videoUrl: "dQw4w9WgXcQ",
        explicacion: "Cuidar a un enfermo es agotador. Aquí le damos consejos para que usted también descanse y pida ayuda cuando la necesite."
    }
];

const videoGrid = document.getElementById('videoGrid');
const searchInput = document.getElementById('searchInput');
let filtroActual = 'all'; // Variable para recordar qué botón está presionado

function cargarVideos() {
    const textoBusqueda = searchInput.value.toLowerCase();
    videoGrid.innerHTML = '';
    
    const filtrados = catalogo.filter(item => {
        // CORRECCIÓN: Usamos item.categoria (con 'i') para que coincida con el objeto
        const cumpleFiltro = filtroActual === 'all' || item.categoria === filtroActual;
        
        const cumpleBusqueda = item.titulo.toLowerCase().includes(textoBusqueda) || 
                               item.tags.toLowerCase().includes(textoBusqueda);
                               
        return cumpleFiltro && cumpleBusqueda;
    });

    if(filtrados.length === 0) {
        videoGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">
            No encontramos videos sobre eso. Intente con otra palabra o cambie la categoría.
        </p>`;
        return;
    }

    filtrados.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="video-box">
                <iframe src="https://www.youtube.com/embed/${item.videoUrl}" allowfullscreen></iframe>
            </div>
            <div class="card-content">
                <h3>${item.titulo}</h3>
                <button class="btn-info" onclick="abrirInfo(${item.id})">Leer instrucciones detalladas</button>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

// Lógica del Modal (Ventana emergente)
const modal = document.getElementById("infoModal");
function abrirInfo(id) {
    const item = catalogo.find(v => v.id === id);
    document.getElementById('modalTitle').innerText = item.titulo;
    document.getElementById('modalMeta').innerText = "Información preparada por: " + item.profesional;
    document.getElementById('modalBody').innerHTML = `<p>${item.explicacion}</p>`;
    modal.style.display = "block";
}

// Cerrar modal
document.querySelector('.close').onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }

// Escuchar cuando el usuario escribe en el buscador
searchInput.addEventListener('input', () => {
    cargarVideos();
});

// Escuchar cuando el usuario hace clic en los botones de categoría
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        // Quitar clase activa al anterior y ponerla al nuevo
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        // Actualizar el filtro y recargar
        filtroActual = btn.dataset.filter;
        cargarVideos();
    };
});

// Carga inicial al abrir la página
cargarVideos();