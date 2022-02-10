//-- Variáveis Globais --//
let mensagens = []
let nomeUsuario = ""

//-- Requisição API --//
function requisitarMensagem() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    promessa.then(promessaMensagens)
    promessa.catch()
}

requisitarMensagem()

function promessaMensagens(mensagem) {
    mensagens = mensagem.data
    renderizarMensagens()
}

//-- Renderização das Mensagens --//
function renderizarMensagens() {
    const telaMensagens = document.querySelector("main")
    telaMensagens.innerHTML = " "
    let tipoDaMensagem = " "
    for (let i = 0; i<mensagens.length; i++) {
        if ( mensagens[i].type === "private_message") {
            tipoDaMensagem = `<span> reservadamente para <b>${mensagens[i].to}</b>: </span>`
        } else if ( mensagens[i].type === "message") {
            tipoDaMensagem = `<span> para <b>${mensagens[i].to}</b>: </span>`
        } else {
            tipoDaMensagem = " "
        }
        telaMensagens.innerHTML += `
        <div class="caixa-mensagem ${mensagens[i].type}">
                <p>
                    <span class="horario">${mensagens[i].time}</span>
                    <span><b>${mensagens[i].from}</b></span>
                    ${tipoDaMensagem}
                    <span>${mensagens[i].text}</span>
                </p>
            </div>
        `
        filtrarMensagensPrivadas(mensagens[i].type, mensagens[i].to)
    }
    mostrarUltimoElemento()
    setInterval(requisitarMensagem,3000)
}

function filtrarMensagensPrivadas(tipo, destinatario) {
   if (tipo === "private_message" && destinatario !== nomeUsuario) {
         const elemento = document.querySelectorAll(".private_message")
         let ultimoElemento = elemento.length - 1
         elemento[ultimoElemento].innerHTML = ""  
         elemento[ultimoElemento].classList.remove("caixa-mensagem")
   }
}

function mostrarUltimoElemento() {
    const elementoApareça = document.querySelector("main")
    elementoApareça.children[99].scrollIntoView()
}

