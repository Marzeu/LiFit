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
                <h3>Carrinho</h3>
                <div class="header">
                    <p>Produto</p>
                    <p>Preço</p>
                    <p>Qtd.</p>
                </div>
            `;

        const htmlString = items
            .map((item) => {
                return `
                <div class="items">
                    <div class="item">
                        <a href="/produto/#${item.id}">
                            <img src="${item.url}" alt="">
                            <span class="title">${item.name}</span>
                        </a>
                        <span class="price">${formatPrice(item.price)}</span>                        
                        <div class="quantity-control">                            
                                <button class="remove" onclick="remove(${item.id})">
                                    <i class="material-icons">remove_circle_outline</i>
                                </button>                            
                            <span class="quantity" id="${item.id}">${item.quantity}</span>                            
                                <button class="add" onclick="add(${item.id})">
                                    <i class="material-icons">add_circle_outline</i>
                                </button>                           
                        </div>                       
                            <button class="delete" onclick="deleteItem(${item.id})">
                                <i class="material-icons">delete</i>
                            </button>                       
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
                        <form">
                            <button class="btn btn-success order">
                                Finalizar Pedido
                            </button>
                        </form>
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

listOrder();


