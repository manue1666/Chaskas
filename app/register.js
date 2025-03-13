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