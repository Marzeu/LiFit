const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

var users = [];
var user = [];

async function loadUsers() {
    try {
        const res = await fetch(URL);
        users = await res.json();

    } catch (err) {
        console.error(err);
    }
};

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
        const goToLogin = `
        <div class="cart container empty">
            <p>Você já está logado!</p>
            <a href="/" class="btn btn-success">Voltar</a>
        </div>
        `;
        content.innerHTML = goToLogin;
    } else {
        showFormRegister();
    }
}

function showFormRegister() {
    const showFormRegister = `
    <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="text-center font-weight-bold popular-products"> Cadastre-se </h2>
                </div>
            </div>
        </div>
        <div class="container login-form">
            <section class="user-register container form">

                <form>
                    <div class="fields">

                        <div class="item">
                            <div>Nome Completo</div>
                            <div class="input">
                                <input type="text" name="name" id="name" placeholder="Digite o seu nome completo"
                                    value="" required>
                            </div>
                        </div>

                        <div class="item">
                            <div>Email</div>
                            <div class="input">
                                <input type="email" name="email" id="email" placeholder="Digite o seu email" value=""
                                    onblur="Validade.apply(this, 'isEmail')">
                            </div>
                        </div>

                        <div class="item">
                            <div>Senha</div>
                            <div class="input">
                                <input type="password" name="password" id="password" placeholder="Digite uma senha"
                                    value="" required>
                            </div>
                        </div>

                        <div class="item">
                            <div>Repetir senha</div>
                            <div class="input">
                                <input type="password" name="passwordRepeat" id="passwordRepeat"
                                    placeholder="Repita a senha" required>
                            </div>
                        </div>

                        <div class="item">
                            <div>CPF ou CNPJ</div>
                            <div class="input">
                                <input type="text" name="cpf_cnpj" id="cpf_cnpj" placeholder="Digite seu documento"
                                    value="" onblur="Validade.apply(this, 'isCpfCnpj')">
                            </div>
                        </div>

                        <div class="item">
                            <div>CEP</div>
                            <div class="input">
                                <input type="text" name="cep" id="cep" placeholder="00000-000" value=""
                                    onblur="Validade.apply(this, 'isCep')">
                            </div>
                        </div>

                        <div class="item">
                            <div>Endereço completo</div>
                            <div class="input">
                                <input type="text" name="address" id="address"
                                    placeholder="Digite seu endereço completo" value="" required>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-success" type="button" onclick="postUsers()">Salvar</button>
                </form>
            </section>
        </div>
    `;
    content.innerHTML = showFormRegister;
    return content;
}

async function postUsers() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('passwordRepeat').value;
    const cpfCnpj = document.getElementById('cpf_cnpj').value;
    const cep = document.getElementById('cep').value;
    const address = document.getElementById('address').value;

    let existedUser = users.find(users => users.email === email) || users.find(users => users.cpfCnpj === cpfCnpj);

    if (email === existedUser.email) {
        swal("Não deu", "Email já cadastrado", "error");

    } else if (password != passwordRepeat) {
        swal("Não deu", "Senha não confere", "error");

    } else if (cpfCnpj === existedUser.cpfCnpj) {
        swal("Não deu", "CPF ou CNPJ já cadastrado", "error");

    } else {
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

loadUsers();
getLocalStorage();