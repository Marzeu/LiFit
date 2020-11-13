const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

let body = [];

async function postProducts() {

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value.split("").filter(c => c >= "0" && c <= "9").join("");
    const quantity = document.getElementById('quantity').value;
    const url = document.getElementById('url').value;    

    let body = { name, description, price, quantity, url };
   
    try {
        const res = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(body),
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
    swal({
        title: "Produto cadastrado com sucesso!",
        text: "Deseja cadastrar outro produto?",
        icon: "success",
        buttons: {
            cancel: "Não",
            confirm: { text: "Sim", value: true }
        },
    })
        .then((cadastrarNovo) => {
            if (cadastrarNovo) {
                window.location.href = '/usuario/produtos/novo'
            } else {
                window.location.href = '/'
            };
        });
};