const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

var users = [];
var user = [];
let existedCpfCnpj;
let existedEmail;

loadUsers();

async function loadUsers() {
    try {
        const res = await fetch(URL);
        users = await res.json();

    } catch (err) {
        console.error(err);
    }
};

function getLocalStorage() {

    user = JSON.parse(localStorage.getItem('session'));

    if (user === null) {

        user = [];
        let logged = false;
        user.push({ logged: `${logged}` });
        let userJson = JSON.stringify(user);
        localStorage.setItem('session', userJson);

    } else {

        for (let i = 0; i < user.length; i++) {

            if (user[i].logged === "false") {
                console.log("não está logado")

            } else {
                swal("Você já está logado.", "Obrigado!", "error")
                    .then(() => {
                        window.location.href = '/';
                    });
            }
        }
    }
}


async function postUsers() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpfCnpj = document.getElementById('cpf_cnpj').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;

    if (password === passwordRepeat) {
debugger
        for (let i = 0; i < users.length; i++) {

            if (users[i].email === email) {

                console.log("email já cadastrado");               
                swal("Não deu", "Email já cadastrado", "error");

            }
            else if (users[i].cpfCnpj === cpfCnpj) {

                console.log("cpf já cadastrado");
                swal("Não deu", "CPF ou CNPJ já cadastrado", "error");                

            }
        }
        users = { name, email, password, cpfCnpj, cep, address };
        post()
    } else {
        swal("SENHA não confere", "A senha deve ser a mesma nos campos", "error");
    }


    // if (existedEmail.email === email) {

    //     console.log("deu ruim viado")
    //     swal("Não deu", "Email já cadastrado", "error");

    // } else if (existedCpfCnpj.cpfCnpj === cpfCnpj) {

    //     swal("Não deu", "CPF ou CNPJ já cadastrado", "error");

    // } else {

    // existedEmail = users.find(users => users.email === email.value)
    // existedCpfCnpj = users.find(users => users.cpfCnpj === cpfCnpj.value);

    // if (users.find(users => users.email === email) === email) {
    //     swal("Não deu", "Email já cadastrado", "error");

    // } else if (password != passwordRepeat) {
    //     swal("Não deu", "Senha não confere", "error");

    // // } else if (existedCpfCnpj.cpfCnpj === cpfCnpj.value) {
    // //     swal("Não deu", "CPF ou CNPJ já cadastrado", "error");
    // } else {


}



async function post() {
    try {
        const res = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(users),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (res.status != 201) {
            swal("Não deu.", "Algo de errado aconteceu", "error");
            return;
        }
        sweetAlert();
    }
    catch {
        swal("Não deu.", "Algo de errado aconteceu", "error");
    }
}

function sweetAlert() {

    const cpfCnpj = document.getElementById('cpf_cnpj').value;
    const cleanValues = cpfCnpj.replace(/\D/g, "");

    if (cleanValues.length == 14) {
        swal({
            title: "Usuário cadastrado com sucesso!",
            text: "Seja bem vindo, deseja cadastrar um produto?",
            icon: "success",
            buttons: {
                cancel: "Não",
                confirm: { text: "Sim", value: true }
            },
        })
            .then((cadastrarNovo) => {
                if (cadastrarNovo) {
                    window.location.href = '/produtos/novo'
                } else {
                    window.location.href = '/'
                };
            });

    } else {
        swal({
            title: "Usuário cadastrado com sucesso!",
            text: "Seja bem vindo!",
            icon: "success",
            buttons: {
                confirm: { text: "Ok", value: true }
            },
        })
            .then((cadastrarNovo) => {
                if (cadastrarNovo)
                    window.location.href = '/'
            });
    };
};

getLocalStorage();