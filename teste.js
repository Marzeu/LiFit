module.exports = {
    async findOne(filters) {
        let query = "SELECT * FROM users"

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}                     
        `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            });
        });

        const results = await db.query(query);

        return results.rows[0]
    }
}


module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },

    // checar se todos os campos dos cadastros estão preenchidos

    async post(req, res) {
        // armazena na constantes as chaves (no objeto existe o par chave/valor) que vieram no corpo da requisição
        const keys = Object.keys(req.body);

        // faz uma interação em todas as chaves que vieram 
        for (key of keys) {
            // se a chave estiver vazia retona uma resposta enviando a msg
            if (req.body[key] == "") {
                return res.send('Preencha todos os campos!');
            }
        }
        // checar se os campos ja existem no banco de dados
        let { email, cpf_cnpj, password, passwordRepeat } = req.body;

        cpf_cnp = cpf_cnp.replace(/\D/g, "");

        const user = await findOne({
            where: { email },
            or: { cpf_cnpj }
        });

        if (user) return res.send('Usurario já existe');

        if (password != passwordRepeat)
            return res.send('Senha não confere');

        return res.send('Sucesso!');
    }
}