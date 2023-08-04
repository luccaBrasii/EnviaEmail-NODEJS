const dotenv = require('dotenv');
dotenv.config();
//npm install nodemailer

const nodemailer = require('nodemailer')

//CONFIGS DA MENSAGEM
    const msg = {
        from: '"Lucca Lopes" <luccabrasi.es@gmail.com>',
        to: 'lukinhah@yopmail.com',
        subject: 'Teste de email',
        text: 'Olá, este é um teste de email',
        html:'<h2>HTML tbm é aceito</h2>'
    }
//CONFIGS DO EMAIL QUE VAI ENVIAR A MENSAGEM
    const emailProducao = {
        host: process.env.EMAIL_HOST,
        auth:{
            user: process.env.EMAIL_USUARIO,
            pass: process.env.EMAIL_SENHA
        },
        secure: true
    }
    
    const emailDesenvolvimento = (contaTeste)=>({
        host: 'smtp.ethereal.email',
        auth: contaTeste
    })


    async function configEmail (){
        if(process.env.NODE_ENV === 'prod'){
            return emailProducao
        }else{
            const contaTeste = await nodemailer.createTestAccount();
            return emailDesenvolvimento(contaTeste)
        }
    }
//ENVIA EMAIL DE TESTE
    async function enviaEmail(msg){
        
        const configEmailData = await configEmail();

        const trasportador = nodemailer.createTransport(configEmailData)

        const info = await trasportador.sendMail(msg)
        
        if(process.env.NODE_ENV != 'prod'){
            console.log('URL: '+ nodemailer.getTestMessageUrl(info))
        }
    }

enviaEmail(msg, configEmail)