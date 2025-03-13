// Función para obtener y mostrar los usuarios
const fetchAndDisplayUsers = async () => {
    try {
        // Obtener los usuarios del backend
        const response = await fetch("http://127.0.0.1:4000/users/getAllUsers");

        if (response.ok) {
            const data = await response.json();
            const users = data.allUsers; // Acceder al array de usuarios

            // Obtener el cuerpo de la tabla donde se mostrarán los usuarios
            const usersTableBody = document.querySelector("#usersTable tbody");

            // Limpiar la tabla antes de agregar nuevos usuarios
            usersTableBody.innerHTML = "";

            // Recorrer los usuarios y crear filas para cada uno
            users.forEach(user => {
                const row = usersTableBody.insertRow();

                // Crear celdas para el ID, nombre y email
                const cellId = row.insertCell(0);
                const cellName = row.insertCell(1);
                const cellEmail = row.insertCell(2);

                // Agregar los datos del usuario a las celdas
                cellId.textContent = user._id; // ID del usuario
                cellName.textContent = user.name; // Nombre del usuario
                cellEmail.textContent = user.email; // Email del usuario
            });
        } else {
            const errorMsg = await response.text();
            alert(`Error al obtener los usuarios: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al obtener los usuarios.");
    }
};

// Llamar a la función para obtener y mostrar los usuarios cuando la página cargue
document.addEventListener("DOMContentLoaded", fetchAndDisplayUsers);

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    alert("Sesión cerrada. Redirigiendo a login...");
    window.location.href = "login.html";
});