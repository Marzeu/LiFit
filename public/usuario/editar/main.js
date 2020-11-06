const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

let user = JSON.parse(localStorage.getItem('session'));

// GET pegar apenas um item por id
async function getOneUser() {
    try {
        const res = await fetch(`${URL}/${user[0].id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        user = await res.json();

        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('cpf_cnpj').value = user.cpf_cnpj;
        document.getElementById('cep').value = user.cep;
        document.getElementById('address').value = user.address;

    } catch (err) {
        console.error(err);
    }
};

// PUT atualizar os dados do item através de um id
async function putUser() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf_cnpj = document.getElementById('cpf_cnpj').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;

    if (password != passwordRepeat) {
        swal("Não deu", "Senha não confere.", "error");

    } else {

        const body = { name, email, cpf_cnpj, cep, address, password };

        try {
            const res = await fetch(`${URL}/${user.id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (res.status != 200) {
                swal("Não deu.", "Algo de errado aconteceu.", "error");
                return;
            };
            swal("Usuário atualizado com sucesso!", "Obrigado!", "success")
            .then(() => {
                window.location.href = '/'
            });
        }
        catch {
            swal("Não deu.", "Algo de errado aconteceu.", "error");
        };
    };
};

// DELETE apagar os item através do id
async function deleteUser() {
    try {
        const res = await fetch(`${URL}/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        localStorage.removeItem("session");

        if (res.status != 200) {
            swal("Não deu.", "Algo de errado aconteceu.", "error");
            return;
        };
        swal("Usuário apagado com sucesso!", "Obrigado por utilizar nossos serviços, aguardamos o seu retorno.", "success")
            .then(() => {
                window.location.href = '/'
            });
    }
    catch {
        swal("Não deu.", "Algo de errado aconteceu.", "error");
    };
};

getOneUser();
