const express = require('express');

const server = express();

server.use(express.json());

const alimentos = [
        {nome:'Arroz', quantidade: 2, gramas : 240},
        {nome: 'Feijao', quantidade: 3, gramas : 2450}  
]

server.get('/alimentacao2', function(request, response) {
    response.json(alimentos);
})

server.post('/alimentacao2', function(request, response){
    
    //const nome = request.body.nome;
    //const quantidade = request.body.quantidade;
    
    const {nome, quantidade} = request.body;

    alimentos.push({nome, quantidade});
    response.status(204).send();

})

 server.put('/alimentacao2/:id', function(request,response){
    const id= request.params.id;  
    const {nome, quantidade} = request.body;

    for(let i = 0 ; i <alimentos.length; i++)
    {
        if(alimentos[i].nome == id ){
            alimentos[i].nome = nome;
            alimentos[i].quantidade = quantidade;
            break;
        }
    }  
    
    return response.status(204).send()
 })

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