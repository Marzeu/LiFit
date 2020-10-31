const carURL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/cart'
    : 'https://api-lifit.herokuapp.com/cart';

var car;
var quantity = 1;

async function loadCar() {
    try {
        const res = await fetch(carURL);
        car = await res.json();
        displayItemsInCar(car);

    } catch (err) {
        console.log(err)
    }
}

function displayItemsInCar(items) {

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
        // itemsInCar.innerHTML = headerCar;

        const htmlString = items
            .map((item) => {
                return `
                <div class="items">
                    <div class="item">
                        <a href="/produto/#${item.id}">
                            <img src="${item.url}" alt="">
                            <span class="title">${item.name}</span>
                        </a>
                        <span class="price">${item.price}</span>                        
                        <div class="quantity-control">                            
                                <button class="remove" onclick="remove()">
                                    <i class="material-icons">remove_circle_outline</i>
                                </button>                            
                            <span class="quantity">${quantity}</span>                            
                                <button class="add" onclick="add(${item.id})">
                                    <i class="material-icons">add_circle_outline</i>
                                </button>                           
                        </div>                       
                            <button class="delete" onclick="delete()">
                                <i class="material-icons">delete</i>
                            </button>                       
                    </div>            
        `;
            })
            .join('');
        // headerCar.innerHTML = htmlString;
        const actionButtons = `
                    <div class="total">
                        <p>Total</p>
                        <span>preço formatado</span>
                    </div>
                    <div class="actions">
                        <a href="/products/search" class="btn btn-success shop">Continuar comprando</a>
                        <form action="/orders" method="post">
                            <button class="btn btn-success order">
                                Realizar Pedido
                            </button>
                        </form>
                    </div>
                </div>
        `;
        const total = headerCar + htmlString + actionButtons;
        itemsInCar.innerHTML = total;
    } else {
        const emptyCar = `
        <div class="cart container empty">
            <p>Seu carrinho está vazio</p>
            <a href="/products/search" class="btn btn-success">Compre agora</a>
        </div>
        `;
        itemsInCar.innerHTML = emptyCar;
    }
};

async function add(id) {
    // debugger;
    i = car.findIndex(car => car.id == id)
    quantity = car[i].quantity;
    quantity = quantity + 1;

    const body = { quantity };

    const res = await fetch(`${carURL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    displayItemsInCar(car)
    
}

loadCar();


// // função para padronizar a moeda

// function formatPrice(price) {
//     return new Intl.NumberFormat('pt-BR', {
//         style: 'currency',
//         currency: 'BRL'
//     }).format(price / 100);
// }

// // carinho 

// // adicionar um item ao carrinho
// // remover um item do carrinho
// // deletar todo o item

// const Cart = {
//     init(oldCart) {
//         if (oldCart) {
//             this.items = oldCart.items;
//             this.total = oldCart.total;
//         } else {
//             this.items = []
//             this.total = {
//                 quantity: 0,
//                 price: 0,
//                 formattedPrice: formatPrice(0)
//             }
//         }
//         return this;
//     },

//     addOne(product) {
//         // ver se o produto já existe no carrinho
//         let inCart = this.getCartItem(product.id);

//         // se não existe
//         if (!inCart) {
//             inCart = {
//                 product: {
//                     ...product,
//                     formattedPrice: formatPrice(product.price)
//                 },
//                 quantity: 0,
//                 price: 0,
//                 formattedPrice: formatPrice(0)
//             }

//             this.items.push(inCart);
//         }
//         // verifica se a quantidade no carrinho ultrapassa a quantidade disponivel
//         if (inCart.quantity >= product.quantity) return this;

//         inCart.quantity++;
//         inCart.price = inCart.product.price * inCart.quantity;
//         inCart.formattedPrice = formatPrice(inCart.price);

//         this.total.quantity++;
//         this.total.price += inCart.product.price;
//         this.total.formattedPrice = formatPrice(this.total.price);

//         return this;
//     },

//     removeOne(productId) {
//         //pegar item do carrinho
//         const inCart = this.getCartItem(productId);

//         if (!inCart) return this;

//         //atualizar o item
//         inCart.quantity--;
//         inCart.price = inCart.product.price * inCart.quantity;
//         inCart.formattedPrice = formatPrice(inCart.price);

//         // atualizar o carrinho
//         this.total.quantity--;
//         this.total.price -= inCart.product.price;
//         this.total.formattedPrice = formatPrice(this.total.price);

//         if (inCart.quantity < 1) {
//             const itemIndex = this.items.indexOf(inCart);
//             this.items.splice(itemIndex, 1);
//             return this;
//         }
//         return this;
//     },

//     delete(productId) {
//         const inCart = this.getCartItem(productId);
//         if (!inCart) return this;

//         if (this.items.length > 0) {
//             this.total.quantity -= inCart.quantity;
//             this.total.price -= (inCart.product.price * inCart.quantity);
//             this.total.formattedPrice = formatPrice(this.total.price);
//         }

//         this.items = this.items.filter(item => inCart.product.id != item.product.id)
//         return this;
//     },

//     getCartItem(productId) {
//         return this.items.find(item => item.product.id == productId);
//     }
// }