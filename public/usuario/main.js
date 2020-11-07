function showContentLoggedIn() {   

    if (user[0].logged === "true") {
        goToUserMenu()
    } else {
        const goToLogin = `
        <div class="cart container empty">
            <p>Você precisa estar logado!</p>
            <a href="/login" class="btn btn-success">Login</a>
        </div>
        `;
        content.innerHTML = goToLogin;
    }
};

function goToUserMenu() {
    const goToUserMenu = `
    <div class="cart container">
        <h3>Controle do Usuário</h3>
        <a class="btn btn-success" href="./produtos">Meus produtos</a>
        <a class="btn btn-success" href="./editar">Alterar meus dados</a>
    </div>
    `;
    content.innerHTML = goToUserMenu;
    return content;
}

showContentLoggedIn();