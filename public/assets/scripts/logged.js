var user = [];

function getLocalStorage() {

    if (localStorage.length === 0) {
        let isLogged = false;
        user = [];
        user.push({ logged: `${isLogged}` });
        let userJson = JSON.stringify(user);
        localStorage.setItem('session', userJson);

    } else {
        user = JSON.parse(localStorage.getItem('session'));
    }
    if (user[0].logged === "true") {
        welcome();
    } else {
        // swal("Você precisa estar Logado", "Obrigado!", "error")
        //     .then(() => {
        //         window.location.href = '/login';
        //     })
    }
}


function welcome() {

    let logged = document.getElementById('logged');

    let a = document.createElement('a');

    let span = document.createElement('span');
    span.innerHTML = "Bem vindo " + a;
    span.style.visibility = "visibility";
    span.className = "nav-link"

    a.href = '/usuario';
    a.innerHTML = user[0].name;

    span.appendChild(a)
    logged.appendChild(span);
}

getLocalStorage();