const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

var product;
const idValue = window.location.href.split('#');

// GET pegar apenas um item por id
async function getOne() {
    try {
        const res = await fetch(`${URL}/${idValue[1]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        product = await res.json();

        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('url').value = product.url;
        document.getElementById('price').value = product.price;
        document.getElementById('quantity').value = product.quantity;

    } catch (err) {
        console.error(err);
    }
};

// PUT atualizar os dados do item através de um id
async function putProducts() {

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const url = document.getElementById('url').value;

    const body = { name, description, price, quantity, url };

    try {
        const res = await fetch(`${URL}/${idValue[1]}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (res.status != 200) {
            swal("Não deu.", "Algo de errado aconteceu", "error");
            return;
        };
        sweetAlert();
    }
    catch {
        swal("Não deu.", "Algo de errado aconteceu", "error");
    };
};

// DELETE apagar os item através do id
async function deleteProducts() {
    try {
        const res = await fetch(`${URL}/${idValue[1]}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (res.status != 200) {
            swal("Não deu.", "Algo de errado aconteceu", "error");
            return;
        };
        swal({
            title: "Produto apagado com sucesso!",
            text: "Deseja apagar outro produto?",
            icon: "success",
            buttons: {
                cancel: "Não",
                confirm: { text: "Sim", value: true }
            },
        })
            .then((deleteProduct) => {
                if (deleteProduct) {
                    window.location.href = '/usuarios/produtos'
                } else {
                    window.location.href = '/'
                };
            });
    }
    catch {
        swal("Não deu.", "Algo de errado aconteceu", "error");
    };
};

// função de alerta que é chamada dentro do atualizar
function sweetAlert() {
    swal({
        title: "Produto atualizado com sucesso!",
        text: "Deseja atualizar outro produto?",
        icon: "success",
        buttons: {
            cancel: "Não",
            confirm: { text: "Sim", value: true }
        },
    })
        .then((updateProduct) => {
            if (updateProduct) {
                window.location.href = '/usuarios/produtos'
            } else {
                window.location.href = '/'
            };
        });
};

// máscara que converte o valor em no campo price do tipo text em dinheiro 

const moneyMask = document.querySelector('input[name="price"]');
moneyMask.addEventListener("keydown", function (e) {

    setTimeout(function () {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);

        e.target.value = value;
    }, 1);
});

// dentro do replace é passado o parametro de expressões regulares que irá substituir, 
// nesse caso tudo o que não for número será substituido por um campo vazio "".
// O construtor formata para o R$ padrão internacional.

getOne();
