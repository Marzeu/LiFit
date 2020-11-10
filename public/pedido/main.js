var order = {
    products: []
};

function listOrder() {
    order.products = JSON.parse(localStorage.getItem('order'));
    if (typeof (Storage) !== "undefined" && order.products == null) {
        order.products = [];
    };
    displayItemsInCar(order.products);
};

function saveToStorage() {
    let orderJson = JSON.stringify(order.products);
    localStorage.setItem('order', orderJson);
}

function displayItemsInCar(items) {
    refreshCar();
    if (items.length !== 0) {
        const headerCar = `
            <div class="cart container">
                <h3>Resumo do seu pedido:</h3>
                <div class="header">
                    <p>Produto</p>                   
                    <p>Qtd. </p>
                </div>
            `;

        const htmlString = items
            .map((item) => {
                return `
                <div class="items">
                    <div class="item">
                        <p >
                            <img src="${item.url}" alt="">
                            <span class="title">${item.name}</span>
                        </p>                                               
                            <span class="quantity" id="${item.id}">${item.quantity}</span> 
                        </div>          
                    </div>                         
        `;
            })
            .join('');

        const actionButtons = ` 
                        <div class="total" id="showTotal">
                            <p>Total</p>
                            <span id="total">0</span>
                        </div>                            
                    <div class="actions">
                        <a href="/" class="btn btn-success shop">Continuar comprando</a>
                        
                    </div>
                </div>
        `;
        const total = headerCar + htmlString + actionButtons;
        itemsInCar.innerHTML = total;
        totalPrice();
    } else {
        const emptyCar = `
        <div class="cart container empty">
            <p>Seu carrinho está vazio</p>
            <a href="/" class="btn btn-success">Compre agora</a>
        </div>
        `;
        itemsInCar.innerHTML = emptyCar;
    }
};

function add(id) {

    let i = order.products.findIndex(products => products.id == id);
    let quantity = order.products[i].quantity;
    quantity++;
    order.products[i].quantity = quantity;

    saveToStorage();
    displayItemsInCar(order.products);
}

function remove(id) {

    let i = order.products.findIndex(products => products.id == id);
    let quantity = order.products[i].quantity;
    quantity--;

    if (quantity == 0) {
        deleteItem(id);
    }
    else {
        order.products[i].quantity = quantity;
    }

    saveToStorage();
    displayItemsInCar(order.products);
}

function deleteItem(id) {
    let i = order.products.findIndex(products => products.id == id);
    order.products.splice(i, 1);

    saveToStorage();
    displayItemsInCar(order.products);
}

function totalPrice() {
    let total = 0;

    let showTotal = document.getElementById('showTotal');

    for (let i = 0; i < order.products.length; i++) {
        total = total + (order.products[i].price) * (order.products[i].quantity);
    }

    let spanTotal = document.getElementById('total');
    spanTotal.innerHTML = `${formatPrice(total)}`;
    showTotal.appendChild(spanTotal);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);
}

function finishOrder() {
    alertFinishOrder();
}

function alertFinishOrder() {
    swal({
        title: "Finalizar o pedido?",
        text: "Obridado por usar a Lifit",
        icon: "success",
        buttons: {
            cancel: "Não",
            confirm: { text: "Sim", value: true }
        },
    })
        .then((fisishOrder) => {
            if (fisishOrder) {
                window.location.href = '/pedido'
            } else {
                window.location.href = '/carrinho'
            };
        });
};

listOrder();
