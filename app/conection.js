// ////endpoints

//http://127.0.0.1:4000

// //endpoints de usuarios
// app.post("/users/regist",registerUsers)
document.getElementById("submitRegisterBtn").addEventListener("click", async () => {
    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    // Validación básica
    if (!name || !email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://127.0.0.1:4000/users/regist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("¡Usuario registrado exitosamente!");
            console.log(result);
        } else {
            const errorMsg = await response.text();
            alert(`Error al registrar usuario: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al registrar el usuario.");
    }
});

// app.post("/users/login",login)
document.getElementById("submitLoginBtn").addEventListener("click", async () => {
    const username = document.getElementById("userName").value;
    const password = document.getElementById("userPassword").value;

    // Validación básica
    if (!username || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const loginData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch("http://127.0.0.1:4000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("¡Inicio de sesión exitoso!");
            console.log(result);
            // Redirigir al usuario a la página principal después de iniciar sesión correctamente
            window.location.href = "dashboard.html"; // Cambia esta URL a la que quieras redirigir
        } else {
            const errorMsg = await response.text();
            alert(`Error al iniciar sesión: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al iniciar sesión.");
    }
});
// //obtener todos los usuarios
// app.get("/users/getAllUsers",getAllUsers)
document.getElementById("getUsersBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("http://127.0.0.1:4000/users/getAllUsers");

        if (response.ok) {
            const users = await response.json();
            const usersTableBody = document.getElementById("usersTable").getElementsByTagName("tbody")[0];
            usersTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos usuarios

            users.forEach(user => {
                const row = usersTableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);

                cell1.textContent = user.username;
                cell2.textContent = user.email;
            });
        } else {
            const errorMsg = await response.text();
            alert(`Error al obtener usuarios: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al obtener los usuarios.");
    }
});
// //endpoints de chaskas

// //crear chaska
// app.post("/chaskas/create",createChaska)
document.getElementById("submitChaskaBtn").addEventListener("click", async () => {
    const name = document.getElementById("chaskaName").value;
    const description = document.getElementById("chaskaDescription").value;
    const price = document.getElementById("chaskaPrice").value;

    // Validación básica
    if (!name || !description || !price) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const chaskaData = {
        name: name,
        description: description,
        price: price
    };

    try {
        const response = await fetch("http://127.0.0.1:4000/chaskas/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chaskaData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("¡Chaska creada exitosamente!");
            console.log(result);
        } else {
            const errorMsg = await response.text();
            alert(`Error al crear la chaska: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al crear la chaska.");
    }
});

// //obtener todas las chaskas
// app.get("/allchaska/get",getAllChaskas)
document.getElementById("getAllChaskasBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("http://127.0.0.1:4000/allchaska/get");

        if (response.ok) {
            const chaskas = await response.json();
            const chaskasTableBody = document.getElementById("chaskasTable").getElementsByTagName("tbody")[0];
            chaskasTableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevas chaskas

            chaskas.forEach(chaska => {
                const row = chaskasTableBody.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);

                cell1.textContent = chaska.name;
                cell2.textContent = chaska.description;
                cell3.textContent = `$${chaska.price}`;
            });
        } else {
            const errorMsg = await response.text();
            alert(`Error al obtener las chaskas: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al obtener las chaskas.");
    }
});
// //borrar chaska
// app.delete("/chaska/delete",deleteChaska)