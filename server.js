const express = require('express');

const server = express();

server.use(express.json());

const alimentos = [
        {id:1, nome:'Arroz', quantidade: 2, gramas : 240}, 
        {id:2, nome: 'Feijao', quantidade: 3, gramas : 2450}]
 
server.get('/alimentacao2', function(request, response) {
    response.json(alimentos);
})

server.post('/alimentacao2', function(request, response){
    
    const {nome, quantidade,gramas} = request.body;

    alimentos.push({nome, quantidade, gramas});
    response.status(204).send();

})

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