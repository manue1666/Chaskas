
document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, llena ambos campos.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Inicio de sesión exitoso. Bienvenido, ${data.user.name || 'Usuario'}!`);
            localStorage.setItem('userName', data.user.name); // Guardar el nombre
            localStorage.setItem('userId', data.user._id);   // Guardar el ID del usuario
            window.location.href = 'dashboard.html';        // Redirigir a dashboard.html
        } else {
            alert(`Error: ${data.msg || 'Credenciales inválidas.'}`);
        }
    } catch (error) {
        console.error('Error al conectarse con el backend:', error);
        alert('Hubo un problema al conectarse con el servidor.');
    }
});