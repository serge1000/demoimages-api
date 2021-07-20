const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const WebSocket = require("ws");
const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

app.get('/gettestimages', (req, res)=> { 
  results = requestSearchServer("GET_TEST_IMAGES", "", res);
});

app.get('/searchrequest/:id', (req, res)=> { 
    results = requestSearchServer("SEARCH_REQUEST", req.params.id.toString(), res);
});

app.listen(3000, ()=> {

  })

// Request search server
function requestSearchServer(event, imageId, res){
    const ws = new WebSocket("ws://localhost:8082");
    ws.addEventListener("open", () =>{
        data = JSON.stringify({
          event: event,
          data: imageId
        })
        ws.send(data);
    });

    ws.addEventListener("message", ({data}) =>{
      const object = JSON.parse(data);
      res.send(JSON.stringify(object));
    });

  }