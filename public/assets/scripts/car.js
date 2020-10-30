const cartURL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/cart'
    : 'https://api-lifit.herokuapp.com/cart';

var car;

async function loadCar() {
    try {
        const res = await fetch(cartURL);
        car = await res.json();
        carIcon();

    } catch (err) {
        console.log(err)
    }
}

function carIcon() {

    let cart = document.getElementById('cart');

    let a = document.createElement('a');
    a.href = "/carrinho";

    let iMaterialIcons = document.createElement('i');
    iMaterialIcons.className = 'material-icons';
    iMaterialIcons.innerHTML = 'shopping_cart';

    cart.appendChild(a);
    a.appendChild(iMaterialIcons);

    if (car[0].quantity && car[0].total > 0) {
        let spanCartStatusInfo = document.createElement('span');
        spanCartStatusInfo.id = 'cart-status-info';
        spanCartStatusInfo.innerHTML = car[0].total;
        a.appendChild(spanCartStatusInfo);
    }
}

loadCar();

function addCar(){

}

async function postCart() {

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const url = document.getElementById('url').value;

    const body = { name, description, price, quantity, url };
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