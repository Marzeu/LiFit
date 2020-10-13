// máscara que converte o valor em no campo price do tipo text em dinheiro 

const input = document.querySelector('input[name="price"]');
input.addEventListener("keydown", function (e) {

    setTimeout(function () {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)

        e.target.value = value;
    }, 1);
})

// dentro do replace é passado o parametro de expressões regulares que irá substituir, 
// nesse caso tudo o que não for número será substituido por um campo vazio "".
// O construtor formata para o R$ padrão internacional.

// const URL = window.location.hostname.includes('localhost')
//     ? 'http://localhost:8080/products'
//     : 'https://api-lifit.herokuapp.com/products';

// async function getAll() {
//     const res = await fetch(URL);
//     const data = await res.json(); }

async function postProducts() {

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const url = document.getElementById('url').value;

    const body = { name, description, price, quantity, url }

    const res = await fetch("/products", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const data = res.json()

    alert('successo')
    console.log(data)

}

// console.log(res)
// window.location.href = '/'

function sweetAlert() {
    swal("Good job!", "You clicked the button!", "success");
};