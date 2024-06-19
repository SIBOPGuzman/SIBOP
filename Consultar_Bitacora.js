import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, query, where, orderBy, getDocs, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDb67xi8sfYvnWDh0lJ7WlPtPF1TzkoFg",
    authDomain: "sibopprueba.firebaseapp.com",
    projectId: "sibopprueba",
    storageBucket: "sibopprueba.appspot.com",
    messagingSenderId: "625324871301",
    appId: "1:625324871301:web:5e9f8e5e9d2947d4dc63ec",
    measurementId: "G-60C2PFWBSB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar arquitectos en el select
const cargarArquitectos = async () => {
    const listaArquitectos = document.getElementById('listaArquitectos');
    const q = query(collection(db, "Arquitecto"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const arquitecto = doc.data();
        const option = document.createElement('option');
        option.value = `${doc.id},${arquitecto.nombre_arqui}`; // Concatenar id_arqui y nombre_arqui
        option.textContent = arquitecto.nombre_arqui;
        listaArquitectos.appendChild(option);
    });
};

// Función para cargar proyectos en el select cuando se selecciona un arquitecto
const cargarProyectos = async (nombreArquitecto) => {
    try {
        const [id_arqui, nombre_arqui] = nombreArquitecto.split(','); // Separar id_arqui y nombre_arqui
        const arquitectoSnapshot = await getDocs(query(collection(db, 'Arquitecto'), where('nombre_arqui', '==', nombre_arqui)));

        if (!arquitectoSnapshot.empty) {
            const arquitectoDoc = arquitectoSnapshot.docs[0];
            const arquitectoDocRef = arquitectoDoc.ref;
            const proyectosSnapshot = await getDocs(collection(arquitectoDocRef, 'Proyectos'));

            // Limpiar la lista de proyectos antes de agregar nuevos elementos
            const listaProyectos = document.getElementById('listaProyectos');
            listaProyectos.innerHTML = '';

            proyectosSnapshot.forEach((doc) => {
                const proyecto = doc.data();
                const option = document.createElement('option');
                option.textContent = proyecto.codigo; // Usar el código del proyecto como texto del option
                option.value = doc.id;
                listaProyectos.appendChild(option);
            });
        } else {
            console.log('No se encontraron arquitectos con el nombre:', nombre_arqui);
        }
    } catch (error) {
        console.error('Error al cargar los proyectos:', error);
    }
};

// Función para cargar bitácoras en el select cuando se selecciona un proyecto
const cargarBitacoras = async (proyectoId) => {
    try {
        const listaArquitectos = document.getElementById('listaArquitectos');
        const [id_arqui] = listaArquitectos.value.split(',');
        const proyectoDocRef = doc(db, "Arquitecto", id_arqui, "Proyectos", proyectoId);
        const bitacorasSnapshot = await getDocs(query(collection(proyectoDocRef, 'Bitacoras'), orderBy('timestamp', 'desc'))); // Ordenar por timestamp descendente

        // Limpiar la lista de bitácoras antes de agregar nuevos elementos
        const listaBitacoras = document.getElementById('listaBitacoras');
        listaBitacoras.innerHTML = '';

        bitacorasSnapshot.forEach((doc) => {
            const bitacora = doc.data();
            const option = document.createElement('option');
            option.textContent = `${bitacora.fecha} - ${bitacora.timestamp.toDate().toLocaleString()}`; // Mostrar fecha y timestamp
            option.value = doc.id;
            listaBitacoras.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las bitácoras:', error);
    }
};

// Función para mostrar detalles de la bitácora cuando se selecciona una bitácora
const mostrarDetallesBitacora = async (bitacoraId, proyectoId) => {
    try {
        const listaArquitectos = document.getElementById('listaArquitectos');
        const [id_arqui] = listaArquitectos.value.split(',');
        const proyectoDocRef = doc(db, "Arquitecto", id_arqui, "Proyectos", proyectoId);
        const bitacoraDocRef = doc(proyectoDocRef, "Bitacoras", bitacoraId);

        const docSnap = await getDoc(bitacoraDocRef);
        if (docSnap.exists()) {
            const bitacora = docSnap.data();
            console.log('Datos de la bitácora:', bitacora);

            // Mostrar los detalles de la bitácora en los elementos HTML correspondientes
            document.getElementById('fecha').textContent = bitacora.fecha || '';
            document.getElementById('dibujo').innerHTML = bitacora.dibujo ? `<img src="${bitacora.dibujo}" alt="Dibujo de la bitácora" style="width: 100px;">` : '';
            document.getElementById('observaciones').textContent = bitacora.observaciones || '';

            // Mostrar las imágenes
            const imagenesContainer = document.getElementById('imagenes');
            imagenesContainer.innerHTML = ''; // Limpiar imágenes previas
            if (bitacora.imagenes && Array.isArray(bitacora.imagenes)) {
                bitacora.imagenes.forEach(url => {
                    console.log('Imagen URL:', url); // Agregar log para la URL de la imagen
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'Imagen de la bitácora';
                    img.style.width = '100px'; // Ajustar el tamaño de la imagen según sea necesario
                    img.onerror = () => console.error('Error al cargar la imagen:', url); // Log de error para la imagen
                    imagenesContainer.appendChild(img);
                });
            }
        } else {
            console.log("No existe un documento con el ID:", bitacoraId);
        }
    } catch (error) {
        console.error('Error al mostrar los detalles de la bitácora:', error);
    }
};

// Event listeners
document.getElementById('listaArquitectos').addEventListener('change', async (event) => {
    const nombreArquitecto = event.target.value;
    if (nombreArquitecto) {
        await cargarProyectos(nombreArquitecto);
    }
});

document.getElementById('listaProyectos').addEventListener('change', async (event) => {
    const proyectoId = event.target.value;
    if (proyectoId) {
        await cargarBitacoras(proyectoId);
    }
});

document.getElementById('listaBitacoras').addEventListener('change', (event) => {
    mostrarDetallesBitacora(event.target.value, document.getElementById('listaProyectos').value);
});

// Cargar arquitectos al iniciar la página
cargarArquitectos();
