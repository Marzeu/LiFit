const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

async function postUsers() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpfCnpj = document.getElementById('cpf_cnpj').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;

    const user = { name, email, password, cpfCnpj, cep, address };

    try {
        const res = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (res.status != 201) {
            swal("Não deu.", "Algo de errado aconteceu", "error");
            return;
        };
        sweetAlert();

    }
    catch {
        swal("Não deu.", "Algo de errado aconteceu", "error");
    };
};

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
                    window.location.href = '/produtos/novo'
                } else {
                    window.location.href = '/'
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
                    window.location.href = '/'
            });
    };
};