// Bloquear botón derecho y Ctrl+U, Ctrl+I, etc.
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "i" || e.key === "j")) {
        e.preventDefault();
    }
});

// Publicar comentarios sin rastrear IPs ni navegador
function publicarMensaje() {
    let nombre = document.getElementById("nombreUsuario").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || mensaje === "") {
        alert("Por favor, ingresa tu nombre y mensaje.");
        return;
    }

    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    
    let nuevoComentario = { 
        id: Date.now(), 
        nombre: nombre, 
        mensaje: mensaje 
    };

    comentarios.push(nuevoComentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    document.getElementById("mensaje").value = "";
    cargarComentarios();
}

// Cargar comentarios guardados
function cargarComentarios() {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    let comentariosHTML = comentarios.map(com => `<p><strong>${com.nombre}:</strong> ${com.mensaje}</p>`).join("");
    document.getElementById("comentarios").innerHTML = comentariosHTML;
}

// Cargar comentarios al inicio
window.onload = cargarComentarios;
