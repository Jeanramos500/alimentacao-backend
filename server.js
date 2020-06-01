const express = require('express');

const server = express();

server.use(express.json());

const Pool = require('pg').Pool;

const pool = new Pool({

    user: 'dhapoprfqydkdm',
    password: '7b7f1b8e5f72fa62788a3c479dc1edc968b891245d281dbed07a59c33b2c087f',
    host: 'ec2-18-233-32-61.compute-1.amazonaws.com',
    database:'d3v8g2hjv8neib',
    port:5432,
    ssl: {
        rejectUnauthorized: false
    }
})
     
    const sqltabela = `
    CREATE TABLE IF NOT EXISTS alimentos
    (
        id serial primary key,
        nome varchar(255) null,
        quantidade int null,
        gramas float null

    )`;

    pool.query(sqltabela, (error,result)=>{
        if(error){
            throw error
        }

        console.log('Tabela criada com sucesso');
    })
// Deixando em momoria volatil

const alimentos = [
        { nome:'Frango', quantidade: 2, gramas : 240}, 
        { nome: 'Batata', quantidade: 3, gramas : 2450}]
 
server.get('/alimentacao2', function(request, response) {
    response.json(alimentos);
})

//Realizando o insert

server.post('/alimentacao2', function(request, response){
    
    const {nome, quantidade,gramas} = request.body;

    alimentos.push({nome, quantidade, gramas});
    response.status(204).send();

})

 //Fazer o Update

 server.put('/alimentacao2/:id', function(request,response){
    const id= request.params.id;  
    const {nome, quantidade, gramas} = request.body;

    for(let i = 0 ; i <alimentos.length; i++)
    {
        if(alimentos[i].nome == id ){
            alimentos[i].nome = nome;
            alimentos[i].quantidade = quantidade;
            alimentos[i].gramas = gramas;
            break;
        }
    }  
    
    return response.status(204).send()
 })

 //Realizar Delete

 server.delete('/alimentacao2/:id', function(request, response){
    const id= request.params.id;  
    
    for(let i = 0 ; i <alimentos.length; i++)
    {
        if(alimentos[i].nome == id ){
            alimentos.splice(i, 1);
            break;
        }
    }
    return response.status(204).send();
 })
server.listen(process.env.PORT || 3000);