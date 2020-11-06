var user = [];

function getLocalStorage() {
    
    user = JSON.parse(localStorage.getItem('session'));

    if (user == null) {
        user = [];
    } else if (user[0].logged === "true") {
        welcome();
    }
}

function welcome() {   

    let logged = document.getElementById('logged');

    let a = document.createElement('a');

    let span = document.createElement('span');
    span.innerHTML = "Bem vindo " + a;
    span.style.visibility = "visibility";
    span.className = "nav-link"

    a.href = '/usuarios';
    a.innerHTML = user[0].name;

    span.appendChild(a)
    logged.appendChild(span);
}

getLocalStorage();