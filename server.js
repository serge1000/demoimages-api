const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
//const request = require('request');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

const returnImages = async (res, imageNumber) => {
  let imagedata;
  const results = [];

  for (let i = 0; i < imageNumber; i++) {
    const robotID = (Math.floor(Math.random() * 1000) + 1).toString();
    try {
      axiosres = (await axios.get('https://robohash.org/'+ robotID , {
        responseType: 'arraybuffer'
      }));
    }
    catch(e) {
      console.log('Catch an error: ', e);
    }

    const imageobj = {
      imagedata: Buffer.from(axiosres.data).toString('base64'),
      robotID:   robotID
    }
    results.push(imageobj);
  }
  res.send(results);
}



app.get('/getsearchimages', (req, res)=> { 
  returnImages(res,3);
});

app.get('/getfoundimages', (req, res)=> { 
  const imageNumber = (Math.floor(Math.random() * 10) + 1).toString();
  returnImages(res, imageNumber);
});


app.listen(3000, ()=> {
    console.log('app is running on port 3000');
  })