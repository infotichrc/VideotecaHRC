const catalogo = [
    {
    id: 1,
    titulo: "Cómo mover al paciente en la cama",
    categoria: "mover",
    tags: "postrado, mover, cama, kinesiologo, espalda, fuerza, girar, ergonomia",
    profesional: "Kinesiología y Enfermería",
    videoUrl: "BwDZlwmx3Uk",
    explicacion: "Aprenda las técnicas correctas para girar al paciente de lado, subirlo en la cama y sentarlo. Diseñado para proteger la postura del cuidador y evitar lesiones lumbares mientras se mantiene seguro al paciente."
    },
    {
      id: 2,
      titulo: "Transferencia segura de la cama a la silla",
      categoria: "mover",
      tags: "postrado, transferencia, silla, sillón, mover, fuerza, seguridad",
      profesional: "Kinesiología y Terapia Ocupacional",
      videoUrl: "twkrRvacIFY",
      explicacion: "Guía rápida paso a paso para trasladar de forma segura a un paciente desde el borde de la cama hacia una silla o sillón, minimizando el esfuerzo físico del cuidador."
    },
    {
      id: 3,
      titulo: "Baño en cama: Guía completa de higiene paso a paso",
      categoria: "aseo",
      tags: "baño, aseo, cama, higiene, limpieza, esponja, comodidad",
      profesional: "Enfermería",
      videoUrl: "0-EU9uIzTWs",
      explicacion: "Aprenda a realizar el aseo completo del paciente sin sacarlo de la cama. Incluye cómo lavar el cabello, el cuerpo y realizar el cambio de sábanas sucias por limpias de manera eficiente."
    },
    {
      id: 4,
      titulo: "Técnica práctica para el baño de esponja en casa",
      categoria: "aseo",
      tags: "baño, aseo, cama, limpieza, cuidador, piel, bienestar",
      profesional: "Enfermería y Cuidado Domiciliario",
      videoUrl: "3aDpX_nuA74",
      explicacion: "Un video corto y didáctico ideal para el día a día. Muestra cómo organizar el agua, el jabón y las toallas para mantener al paciente limpio, seco y cómodo respetando su privacidad."
    },
    {
      id: 5,
      titulo: "Cambios posturales para prevenir úlceras por presión",
      categoria: "aseo",
      tags: "ulceras, escaras, heridas, piel, postura, almohadas, prevencion",
      profesional: "Dermatología y Enfermería",
      videoUrl: "gCrjNXsUPPg",
      explicacion: "Las heridas por estar acostado (escaras) se pueden evitar. En este video aprenderá cómo usar almohadas para liberar la presión en talones, cadera y espalda, y cada cuánto tiempo rotar al paciente."
    },
    {
      id: 6,
      titulo: "Cuidados esenciales y humectación de la piel",
      categoria: "aseo",
      tags: "piel, crema, escaras, heridas, masaje, prevencion, hidratacion",
      profesional: "Dermatología",
      videoUrl: "3Xp9IcbM0m8",
      explicacion: "La piel de un paciente postrado es muy delicada. Conozca los productos recomendados para la hidratación profunda, zonas críticas que revisar a diario y qué errores evitar al aplicar masajes."
    },
    {
      id: 7,
      titulo: "Cómo administrar la alimentación por sonda de gastrostomía",
      categoria: "comida",
      tags: "gastrostomia, sonda, peg, alimentacion, nutricion, jeringa, purga",
      profesional: "Nutrición y Enfermería",
      videoUrl: "mi2cKqA91ZA",
      explicacion: "Aprenda el proceso correcto para pasar el alimento por la sonda: la posición en la que debe estar el paciente, cómo verificar que la sonda esté libre y el lavado obligatorio al terminar."
    },
    {
      id: 8,
      titulo: "Higiene y mantenimiento de la sonda PEG en casa",
      categoria: "comida",
      tags: "sonda, peg, gastrostomia, limpieza, infeccion, curacion, estoma",
      profesional: "Enfermería Clínica",
      videoUrl: "wBHVQoiOqwY",
      explicacion: "Tutorial para cuidar la piel que rodea la sonda de gastrostomía. Aprenda a limpiarla diariamente, rotar el soporte para evitar enterrados y detectar signos de alerta o infección a tiempo."
    },
    {
      id: 9,
      titulo: "Movilizaciones y transferencias de pacientes",
      categoria: "mover",
      tags: "postrado, transferencia, silla, sillón, mover, fuerza, seguridad",
      profesional: "Kinesiología",
      videoUrl: "h7-wetI62JQ",
      explicacion: "Aprenda las técnicas correctas para girar al paciente de lado, subirlo en la cama y sentarlo. Diseñado para proteger la postura del cuidador y evitar lesiones lumbares mientras se mantiene seguro al paciente."
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
                <iframe loading="lazy" src="https://www.youtube.com/embed/${item.videoUrl}" title="${item.titulo}" allowfullscreen></iframe>
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