
// Adicione estas funções ao final do arquivo api.js:

// Funções para simular o armazenamento local (já que a API real pode não estar funcionando)
function obterMensagensLocal() {
    try {
        var mensagens = localStorage.getItem('mensagens');
        return mensagens ? JSON.parse(mensagens) : [];
    } catch (error) {
        console.error('Erro ao obter mensagens locais:', error);
        return [];
    }
}

function salvarMensagensLocal(mensagens) {
    try {
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        return true;
    } catch (error) {
        console.error('Erro ao salvar mensagens locais:', error);
        return false;
    }
}

// Sobrescrever a função obterMensagens para fallback local
var obterMensagensOriginal = obterMensagens;
obterMensagens = function() {
    var mensagensAPI = obterMensagensOriginal();
    if (mensagensAPI.length === 0) {
        return obterMensagensLocal();
    }
    return mensagensAPI;
};

// Sobrescrever a função inserirMensagem para fallback local
var inserirMensagemOriginal = inserirMensagem;
inserirMensagem = function(mensagem) {
    // Adicionar data e status
    mensagem.data = new Date().toLocaleString();
    mensagem.visualizada = false;
    
    try {
        inserirMensagemOriginal(mensagem);
    } catch (error) {
        console.log('Usando fallback local para inserir mensagem');
        var mensagens = obterMensagensLocal();
        mensagens.push(mensagem);
        salvarMensagensLocal(mensagens);
    }
};