const express = require('express');
const app = express(); 

const data = require('./data.json');
app.use(express.json());

app.get('/clients', function(req, resp){
    resp.json(data);
});

app.get('/clients/:id', function(req, resp){
    
    const {id} = req.params;
    const client = data.find(cli => cli.id == id);
    
    if (!client) return resp.status(204).json();

    resp.json(client);
});

app.post('/clients', function(req, resp){

    const {name, email} = req.body;
    // salvar no db ...
    resp.json({name, email});

});

app.put('/clients/:id', function(req, resp){

    const {id} = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client)
    {
        return resp.status(204).json();
    }

    const {name} = req.body;

    client.name = name;

    resp.json(client);

});

app.delete('/clients/:id', function(req, resp){

    const {id} = req.params;
    const clientsFiltered = data.filter(cli => cli.id != id);

    resp.json(clientsFiltered);
});

app.listen(3000, function(){
    console.log('server is running');
});