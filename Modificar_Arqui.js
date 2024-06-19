import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para resetear el formulario
const resetForm = (formId) => {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
};

// Función para consultar arquitectos por clave o nombre
const consultarArquitecto = async (clave, nombre) => {
    let q;
    if (clave) {
        q = query(collection(db, "Arquitecto"), where("clave", "==", clave));
    } else if (nombre) {
        q = query(collection(db, "Arquitecto"), where("nombre_arqui", "==", nombre));
    } else {
        return;
    }

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            
            // Rellenar el formulario de modificación con los datos obtenidos
            document.getElementById('modificarForm').style.display = 'block';
            document.getElementById('clave').value = data.clave;
            document.getElementById('nombre_arqui').value = data.nombre_arqui;
            document.getElementById('direccion_arqui').value = data.direccion_arqui;
            document.getElementById('telefono_arqui').value = data.telefono_arqui;
            document.getElementById('profesion').value = data.profesion;
            document.getElementById('drp').value = data.drp;
            document.getElementById('dro').value = data.dro;
            document.getElementById('dru').value = data.dru;
            document.getElementById('drpt').value = data.drpt;
        } else {
            alert("No se encontró el arquitecto.");
        }
    } catch (error) {
        console.error('Error al consultar los arquitectos: ', error);
    }
};

// Función para modificar un arquitecto
const modificarArquitecto = async (clave, nombre, direccion, telefono, profesion, drp, dro, dru, drpt) => {
    if (confirm("¿Está seguro de que desea modificar los datos del arquitecto?")) {
        try {
            const arquiRef = query(collection(db, "Arquitecto"), where("clave", "==", clave));
            const querySnapshot = await getDocs(arquiRef);
            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                const arquiDocRef = doc(db, "Arquitecto", docId);
                await updateDoc(arquiDocRef, {
                    nombre_arqui: nombre,
                    direccion_arqui: direccion,
                    telefono_arqui: telefono,
                    profesion: profesion,
                    drp: drp,
                    dro: dro,
                    dru: dru,
                    drpt: drpt
                });
                alert("Datos del arquitecto modificados exitosamente.");
                resetForm('modificarForm');
            } else {
                alert("No se encontró el arquitecto.");
            }
        } catch (error) {
            console.error("Error al modificar el arquitecto: ", error);
            alert("Error al modificar el arquitecto.");
        }
    }
};


// Maneja el evento submit del formulario para consultar un arquitecto
document.getElementById('consultarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene los datos del formulario
    const clave = document.getElementById('claveConsulta').value.trim();
    const nombre = document.getElementById('nombreConsulta').value.trim();

    // Consulta los datos del arquitecto en Firestore
    await consultarArquitecto(clave, nombre);
});

// Maneja el evento submit del formulario para modificar un arquitecto
document.getElementById('modificarForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene los datos del formulario
    const clave = document.getElementById('clave').value;
    const nombre_arqui = document.getElementById('nombre_arqui').value.trim();
    const direccion_arqui = document.getElementById('direccion_arqui').value.trim();
    const telefono_arqui = document.getElementById('telefono_arqui').value.trim();
    const profesion = document.getElementById('profesion').value.trim();
    const drp = document.getElementById('drp').value.trim();
    const dro = document.getElementById('dro').value.trim();
    const dru = document.getElementById('dru').value.trim();
    const drpt = document.getElementById('drpt').value.trim();

    // Modifica los datos del arquitecto en Firestore
    await modificarArquitecto(clave, nombre_arqui, direccion_arqui, telefono_arqui, profesion, drp, dro, dru, drpt);
});

