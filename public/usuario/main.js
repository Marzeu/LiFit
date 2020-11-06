function showContentLoggedIn() {
    
    // if (user.logged === "true") {
    //     const headerCar = `
    //         <div class="cart container">
    //             <h3>Carrinho</h3>
    //             <div class="header">
    //                 <p>Produto</p>
    //                 <p>Preço</p>
    //                 <p>Qtd.</p>
    //             </div>
    //         `;

    //     const htmlString = items
    //         .map((item) => {
    //             return `
    //             <div class="items">
    //                 <div class="item">
    //                     <a href="/produto/#${item.id}">
    //                         <img src="${item.url}" alt="">
    //                         <span class="title">${item.name}</span>
    //                     </a>
    //                     <span class="price">${formatPrice(item.price)}</span>                        
    //                     <div class="quantity-control">                            
    //                             <button class="remove" onclick="remove(${item.id})">
    //                                 <i class="material-icons">remove_circle_outline</i>
    //                             </button>                            
    //                         <span class="quantity" id="${item.id}">${item.quantity}</span>                            
    //                             <button class="add" onclick="add(${item.id})">
    //                                 <i class="material-icons">add_circle_outline</i>
    //                             </button>                           
    //                     </div>                       
    //                         <button class="delete" onclick="deleteItem(${item.id})">
    //                             <i class="material-icons">delete</i>
    //                         </button>                       
    //                 </div>                         
    //     `;
    //         })
    //         .join('');

    //     const actionButtons = ` 
    //                     <div class="total" id="showTotal">
    //                         <p>Total</p>
    //                         <span id="total">0</span>
    //                     </div>                            
    //                 <div class="actions">
    //                     <a href="/" class="btn btn-success shop">Continuar comprando</a>
    //                     <form">
    //                         <button class="btn btn-success order">
    //                             Finalizar Pedido
    //                         </button>
    //                     </form>
    //                 </div>
    //             </div>
    //     `;
    //     const total = headerCar + htmlString + actionButtons;
    //     itemsInCar.innerHTML = total;
    //     totalPrice();
    // } else {
        // const goToLogin = `
        // <div class="cart container empty">
        //     <p>Você precisa estar logado!</p>
        //     <a href="/login" class="btn btn-success">Login</a>
        // </div>
        // `;
        // content.innerHTML = goToLogin;
    // }
};

showContentLoggedIn();