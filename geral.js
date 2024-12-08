// ---ALERT - SIMULAÇÃO DE AVANÇO---
function avancarCriar() {
    alert("Aguarde o próximo passo!");
}
// ---SCRIPT PARA COTAÇÃO DE CARACTERES ---
function updateCounter(fieldId) {
    const input = document.getElementById(fieldId);
    const counter = document.getElementById(`char-counter-${fieldId}`);
    counter.textContent = `${input.value.length} / ${input.maxLength}`;
}

// ---ESCOLHA DE CONTAS - REDIRECIONAR---
function redirecionar() {
    const userSelect = document.getElementById("userSelect");
    const selectedUser = userSelect.value;

    if (selectedUser === "bruno") {
        window.location.href = "admin.html"; // Redireciona para a página de admin
    } else {
        window.location.href = "index.html"; // Redireciona para a página de boas-vindas
    }
}

// ---CADASTRAR (POST)---
function cadastro(){
        var rg = document.getElementById("rg").value
        var nome = document.getElementById("nome").value
        var sobrenome = document.getElementById("sobrenome").value
        var email = document.getElementById("email").value
        var senha = document.getElementById("senha").value
    
        // enviar os dados
        fetch('http://localhost:3000/cadastros', {
            //Método CRUD
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //Tipo de conteudo enviado pro Json
            },
            body: JSON.stringify({
                //Dados que serão enviados e convertidos
                rg: rg,
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha
            }) 
        }).then(() =>{
            // redirecionar para outra página se o cadastro for concluído
            window.location.href='boas-vindas.html'
        })
        .catch(error => {
            // Alert caso haja um erro no fetch
            alert("Erro ao enviar dados: " + error)
            return
        })
} 
// --- LOGIN ---
function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Verifica se os inputs não estão vazios
    if (email === "" || senha === "") {
        alert("Preencha todos os campos");
        return;
    }

    // Envia os dados para o servidor para validar o login
    fetch('http://localhost:3000/cadastros', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resposta => resposta.json())
    .then(data => {
        // Verifica se existe um cadastro com o username e senha informados
        const usuarioValido = data.find(usuario => usuario.email === email && usuario.senha === senha);

        if (usuarioValido) {
            alert("Login realizado com sucesso!");
            setTimeout(() => {
                window.location.href = "boas-vindas.html" // Redireciona para a página principal
            }, 50);
        } else {
            alert("Usuário ou senha incorretos");
        }
    })
    // Caso tenha erro 
    .catch(error => {
        alert("Erro ao validar login: " + error);
    });
}

// ---ADMIN---
// Busca de RG
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const rgInput = document.getElementById('searchInput').value;

    fetch('http://localhost:3000/cadastros')
        .then(resposta => resposta.json())
        .then(dados => {
            const registro = dados.find(item => item.rg === rgInput);

            if (registro) {
                document.getElementById('resultSection').style.display = 'block';
                document.getElementById('rg').value = registro.rg;
                document.getElementById('nome').value = registro.nome;
                document.getElementById('sobrenome').value = registro.sobrenome;
                document.getElementById('email').value = registro.email;
                document.getElementById('senha').value = registro.senha;
            } else {
                alert('RG não encontrado!');
                document.getElementById('resultSection').style.display = 'none';
            }
        })
        .catch(error => alert("Erro ao buscar RG: " + error));
});

// Salvar alterações
function salvarAlteracoes() {
    const rg = document.getElementById('rg').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch(`http://localhost:3000/cadastros/${rg}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, email, senha })
    })
        .then(() => {
            alert('Alterações salvas com sucesso!');
            location.reload();
        })
        .catch(error => alert("Erro ao salvar alterações: " + error));
}

// Carregar todos os cadastros
window.onload = function () {
    fetch("http://localhost:3000/cadastros")
        .then(resposta => resposta.json())
        .then(dados => {
            const tabelaCorpo = document.getElementById("cadastro-login");
            tabelaCorpo.innerHTML = ''; // Limpa tabela
            // criar uma linha na tabela para cada registro
            dados.forEach(item => {
                tabelaCorpo.innerHTML += `
                    <tr>
                        <td>${item.nome}</td>
                        <td>${item.sobrenome}</td>
                        <td>${item.rg}</td>
                        <td>${item.email}</td>
                        <td>${item.senha}</td>
                    </tr>`;
            });
        })
        .catch(error => alert("Erro ao carregar cadastros: " + error));
};

