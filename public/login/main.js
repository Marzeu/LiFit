const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

let users = [];
let isLogged = false;
let session = [];
let user = [];
let order = [];

function getLocalStorage() {

    order = JSON.parse(localStorage.getItem('order'));
    user = JSON.parse(localStorage.getItem('session'));

    if (user === null) {
        let isLogged = false;
        user = [];
        user.push({ logged: `${isLogged}` });
        let userJson = JSON.stringify(user);
        localStorage.setItem('session', userJson);

    } else {
        user = JSON.parse(localStorage.getItem('session'));
    }
    isLoggedIn();
}

async function loadUsers() {
    try {
        const res = await fetch(URL);
        users = await res.json();

    } catch (err) {
        console.error(err);
    }
};

function isLoggedIn() {

    if (user[0].logged === "true") {
        swal("Você já está logado.", "Obrigado!", "error")
            .then(() => {
                window.location.href = '/';
            })
    }
}

function validation() {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let index = users.findIndex(users => users.email === email);
    let name = "";
    let id = "";

    if (index === 0) {
        name = users[index].name;
        id = users[index].id;
    }

    debugger
    if (name == "undefined") {
    } else {
        swal("Email ou senha errados", "Talvez você precise fazer o cadastro.", "error")
    }

    if (isLogged === false) {
        for (i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {

                isLogged = true;
            } else {
                swal("Email ou senha errados", "Talvez você precise fazer o cadastro.", "error")
            }
        }
        if (isLogged === true) {
            session.push({ name: `${name}`, logged: `${isLogged}`, id: `${id}` });
            let sessionJson = JSON.stringify(session);
            localStorage.setItem('session', sessionJson);
            swal("Bem vindo!", "Login efetuado com sucesso.", "success")
                .then(() => {
                    window.location.href = '/'
                });

        } else {
            swal("Email ou senha errados", "Talvez você precise fazer o cadastro.", "error")
        }
    }
}

// validação do email pelo frontend
const Validade = {
    apply(input, func) {
        Validade.clearErrors(input);

        let results = Validade[func](input.value);
        input.value = results.value;

        if (results.error)
            Validade.displayError(input, results.error);

    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;
        input.parentNode.appendChild(div);
        input.focus();
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv)
            errorDiv.remove();
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value.match(mailFormat))
            error = "Email inválido";

        return {
            error,
            value,
        };
    }
}

loadUsers();
getLocalStorage();
