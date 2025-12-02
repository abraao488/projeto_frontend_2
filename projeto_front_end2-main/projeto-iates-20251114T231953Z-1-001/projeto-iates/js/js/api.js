// API.js - Funções da API com fallback para localStorage

function obterMensagens() {
    try {
        var mensagens = localStorage.getItem('mensagens');
        return mensagens ? JSON.parse(mensagens) : [];
    } catch (error) {
        console.error('Erro ao obter mensagens:', error);
        return [];
    }
}

function inserirMensagem(mensagem) {
    try {
        // Adicionar data atual e status
        mensagem.data = new Date().toLocaleString();
        mensagem.visualizada = false;
        
        // Obter mensagens existentes
        var mensagens = obterMensagens();
        
        // Adicionar nova mensagem
        mensagens.push(mensagem);
        
        // Salvar no localStorage
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        
        console.log('Mensagem inserida com sucesso:', mensagem);
        return true;
    } catch (error) {
        console.error('Erro ao inserir mensagem:', error);
        return false;
    }
}

function validarUsuario(objLoginSenha) {
    // Credenciais válidas
    var emailValido = 'admin@admin.com';
    var senhaValida = '1234';
    
    return objLoginSenha.email === emailValido && objLoginSenha.senha === senhaValida;
}

// Funções adicionais para suportar as operações
function excluirMensagemAPI(index) {
    var mensagens = obterMensagens();
    if (index >= 0 && index < mensagens.length) {
        mensagens.splice(index, 1);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        return true;
    }
    return false;
}

function marcarMensagemVisualizadaAPI(index) {
    var mensagens = obterMensagens();
    if (index >= 0 && index < mensagens.length) {
        mensagens[index].visualizada = true;
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        return true;
    }
    return false;
}