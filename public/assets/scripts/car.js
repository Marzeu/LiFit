// const cartURL = window.location.hostname.includes('localhost')
//     ? 'http://localhost:8080/cart'
//     : 'https://api-lifit.herokuapp.com/cart';

// var car;

// async function loadCar() {
//     try {
//         const res = await fetch(cartURL);
//         car = await res.json();
//         carIcon();

//     } catch (err) {
//         console.log(err)
//     }
// }

var order = {
    products: []
};

function createLocalStorage() {
    order.products = JSON.parse(localStorage.getItem('order'));

    if (order.products == null) {
        order.products = [];
    }

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
                window.location.href = '/'
            } else {
                window.location.href = '/carrinho'
            };
        });
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);
}


// async function addCar() {

//     const id = product.id;
//     const name = product.name;
//     const price = product.price;
//     const url = product.url;
//     const quantity = 1;

//     const body = { id, name, price, url, quantity };

//     try {
//         const res = await fetch(cartURL, {
//             method: 'POST',
//             body: JSON.stringify(body),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (res.status != 201) {
//             swal("Não deu.", "Algo de errado aconteceu", "error");
//             return;
//         };
//         swal({
//             title: "Produto adicionado ao carrinho com sucesso!",
//             text: "Continuar comprando?",
//             icon: "success",
//             buttons: {
//                 cancel: "Não",
//                 confirm: { text: "Sim", value: true }
//             },
//         })
//             .then((updateProduct) => {
//                 if (updateProduct) {
//                     window.location.href = '/'
//                 } else {
//                     window.location.href = '/carrinho'
//                 };
//             });

//     }
//     catch {
//         swal("Não deu.", "Algo de errado aconteceu", "error");
//     };
// };

// function carIcon() {

//     let cart = document.getElementById('cart');

//     let a = document.createElement('a');
//     a.href = "/carrinho";

//     let iMaterialIcons = document.createElement('i');
//     iMaterialIcons.className = 'material-icons';
//     iMaterialIcons.innerHTML = 'shopping_cart';

//     cart.appendChild(a);
//     a.appendChild(iMaterialIcons);

//     if (car[0].quantity && car[0].total > 0) {
//         let spanCartStatusInfo = document.createElement('span');
//         spanCartStatusInfo.id = 'cart-status-info';
//         spanCartStatusInfo.innerHTML = car[0].total;
//         a.appendChild(spanCartStatusInfo);
//     }
// }

// loadCar();
