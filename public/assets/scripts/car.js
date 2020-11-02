var order = {
    products: []
};

var car;

function getLocalStorage() {
    order.products = JSON.parse(localStorage.getItem('order'));

    if (order.products == null) {
        order.products = [];
    }
   
}

function createLocalStorage() {
    getLocalStorage();

    let item = order.products.find(products => products.id == idValue[1]);

    if (!item) {

        let id = product.id;
        let name = product.name;
        let price = product.price;
        let url = product.url;
        let quantity = 1;
        let total = 0;
        order.products.push({ id: `${id}`, name: `${name}`, price: `${price}`, url: `${url}`, quantity: `${quantity}`, total: `${total}` });

        let orderJson = JSON.stringify(order.products);
        localStorage.setItem('order', orderJson);

    } else {

        let i = order.products.findIndex(products => products.id == idValue[1]);
        let quantity = 1;
        quantity++;
        order.products[i].quantity = quantity;

        let orderJson = JSON.stringify(order.products);
        localStorage.setItem('order', orderJson);
    }
    swal({
        title: "Produto adicionado ao carrinho com sucesso!",
        text: "Continuar comprando?",
        icon: "success",
        buttons: {
            cancel: "Não",
            confirm: { text: "Sim", value: true }
        },
    })
        .then((updateProduct) => {
            if (updateProduct) {
                window.location.href = '/'
            } else {
                window.location.href = '/carrinho'
            };
        });
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);
}

function carIcon() {
    getLocalStorage();

    car = order.products.length

    let cart = document.getElementById('cart');

    let a = document.createElement('a');
    a.href = "/carrinho";

    let iMaterialIcons = document.createElement('i');
    iMaterialIcons.className = 'material-icons';
    iMaterialIcons.innerHTML = 'shopping_cart';

    cart.appendChild(a);
    a.appendChild(iMaterialIcons);

    let spanCartStatusInfo = document.createElement('span');
    spanCartStatusInfo.id = 'cart-status-info';    
    spanCartStatusInfo.style.visibility = "hidden";
    a.appendChild(spanCartStatusInfo);
    if (car != 0) {
        refreshCar();
    }
}

function refreshCar() {
    getLocalStorage();  
    car = order.products.length
    let showCarNumber = document.getElementById('cart-status-info');
    showCarNumber.innerHTML = car;
    showCarNumber.style.visibility = "visible";
}

carIcon();