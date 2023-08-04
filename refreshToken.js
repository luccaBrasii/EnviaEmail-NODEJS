const crypto = require('crypto') //BIBLIOTECA DE CRIPTOGRAFICA
const moment = require('moment') //BIBLIOTECA DE DATA E FORMATAÇAO

function criaTokenOpaco(){
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExpiracao = moment().add(5, 'd').format('DD/MM/YYYY')

    return {tokenOpaco, dataExpiracao}
}

//CLASSE
    class RefreshToken  {
        constructor(token, dataExpiracao, idUser){
            this.token = token
            this.dataExpiracao = dataExpiracao
            this.idUser = idUser
        }

        getAll() {
            return {
                    token: this.token,
                    dataExpiracao: this.dataExpiracao,
                    idUser: this.idUser
                   }
                }
    }
//

//INSTANCIA A CLASSE COM TOKEN DATA DE EXPIRAÇÃO E O ID DO USUARIO
    const {tokenOpaco, dataExpiracao} = criaTokenOpaco()
    const idUser = 123

    const newToken = new RefreshToken(tokenOpaco, dataExpiracao, idUser)
//

//LISTA DE TOKENS LIBERADOS E BLOQUEADOS, ADICIONAMOS O TOKEN CRIADO NA 'allowList'
    var allowList = []
    var blockList = []

    allowList.push(newToken.getAll())
//

//PARA VERIFICAR OS TOKENS DA LISTA
    const confirmaToken = newToken.token //TOKEN VÁLIDO
    const data = moment().format('DD/MM/YYYY') //DATA INVÁLIDA, PARA VALIDAR TIRAR O '.add()'
    

    allowList.forEach(tokens =>{
    //SE O TOKEN DO USUARIO FOR IGUAL AO QUE ESTA NA ALLOWLIST..
        if(tokens.token === confirmaToken){
        //SE FOR IGUAL VERIFICA SE A DATA É MENOR DO QUE A DATA DE EXPIRAÇÃO.. SE FOR VALIDA, SE NÃO MOSTRA QUE O TOKEN EXPIROU!
            if(data <= tokens.dataExpiracao){
                console.log('TOKEN VÁLIDADO COM SUCESSO')
            }else{
                console.log('TOKEN EXPIROU!')
                allowList.splice(tokens)
                blockList.push(tokens)
            }
        }else{
            console.log('TOKEN INVÁLIDO!')
        }
        
    })

console.log('ALLOWLIST: ', allowList)
console.log('BLOCKLIST: ', blockList)
//

