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


function displayItemsInCar(items) {
    refreshCar();
    if (items.length !== 0) {
        const headerCar = `
            <div class="cart container">
                <div class="order-sucess">
                    <div class="sucess-lottie"></div>
                    <h3>Pedido Realizado com Sucesso</h3>
                    <h4>Resumo do seu pedido:</h4>
                </div>    
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
                        <p>
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
                    <a href="/" class="btn btn-success shop">Comprar Mais</a>                        
                </div>
            </div>
        `;
        const total = headerCar + htmlString + actionButtons;
        itemsInCar.innerHTML = total;
        totalPrice();
        successAnimation();
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

function totalPrice() {
    let total = 0;

    let showTotal = document.getElementById('showTotal');

    for (let i = 0; i < order.products.length; i++) {
        total = total + (order.products[i].price) * (order.products[i].quantity);
    }

    let spanTotal = document.getElementById('total');
    spanTotal.innerHTML = `${formatPrice(total)}`;
    showTotal.appendChild(spanTotal);
};

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);
};

function successAnimation() {

    const element = document.querySelector('.sucess-lottie')

    lottie.loadAnimation({
        container: element, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '../assets/lottie/lf30_editor_qqr3saku.json' // the path to the animation json
    });
};

listOrder();
localStorage.removeItem("order");
