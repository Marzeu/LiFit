let user = JSON.parse(localStorage.getItem('session'));

function getLocalStorage() {

    if (user === null) {

        user = [];
        let isLogged = false;
        user.push({ logged: `${isLogged}` });
    }

    if (user[0].logged === "true") {
        welcome();
    } else {
        console.log('não logado')
    }
}


function welcome() {

    let logged = document.getElementById('logged');

    let a = document.createElement('a');

    let span = document.createElement('span');
    span.innerHTML = "Bem vindo " + a;
    span.className = "nav-link"

    a.href = '/usuario';
    a.innerHTML = user[0].name;

    span.appendChild(a)
    logged.appendChild(span);
}

getLocalStorage();