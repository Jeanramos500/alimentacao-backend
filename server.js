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
    const lista = [
        { nome:'Frango', quantidade: 2, gramas : 240}, 
        { nome: 'Batata', quantidade: 3, gramas : 2450}]
     
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


    //GET
server.get('/alimentos', async function(request, response) {
   result = await pool.query('SELECT * FROM alimentos');

   return response.json(result.rows);
})

server.get('/alimentos/search', async function(request, response) {
    const nome = request.query.nome;
    const sql = `SELECT * FROM alimentos WHERE nome ILIKE $1`;
    const result = await pool.query(sql, ["%" +  nome + "%"]);
    return response.json(result.rows);
})

server.get('/alimentos/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM alimentos WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})


//POST
server.post('/alimentos', async function(request, response) {
    const nome = request.body.nome;
    const quantidade = request.body.diretor;
    const gramas = request.body.ano;
    const sql= `INSERT INTO alimeentos (nome, quantidade, gramas) VALUES ($1, $2, $3)`;
    await pool.query(sql, [nome, quantidade, gramas]);
    return response.status(204).send();
})


//DELETE
server.delete('/aliementos/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM alimentos WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})


//UPDATE
server.put('/alimentos/:id', async function(request, response) {
    const id = request.params.id;
    const { nome, quantidade, gramas} = request.body;
    const sql = `UPDATE alimentos SET nome = $1, quantidade = $2, gramas = $3  WHERE id = $4`;
    await pool.query(sql, [nome, quantidade, gramas, id]);
    return response.status(204).send();
})

/*
// Deixando em momoria volatil

const alimentos = [
        { nome:'Frango', quantidade: 2, gramas : 240}, 
        { nome: 'Batata', quantidade: 3, gramas : 2450}]
 
server.get('/alimentacao2', function(request, response) {
    response.json(alimentos);
})

//Realizando o insert Memorari volatil

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
 })*/
 
server.listen(process.env.PORT || 3000);