import Promise from 'bluebird';
import * as features from '../src';

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


const fs = require('fs-promise');


app.use(cors());
app.use(bodyParser.json());

fs.readdir('public')
.then(res => console.log(`there are ${res.length} extensions`, res));

const featureConfigs = Object.keys(features)
.filter(e => e !== 'default')
.reduce((p, v) => {
  p[v] = require(`../src${features[v]}`).config;
  return p;
}, {});
const path = './public';

const port = process.env.PORT || 8083;  // SET OUR PORT


app.get('/', function (req, res) {
  res.send('it works');
});
app.get('/extension', (req, res) => {
  const extensionName = req.query.name;
  if (!extensionName) {
    res.status(400).send('no query');
  }
  Promise
   .try(() => fs.readdir('public'))
   .then((files) => {
     const findFile = files.find(file => file.split('_')[0] === extensionName);
     if (findFile) {
       return fs.readFile(`${path}/${findFile}`);
     }
     return res.status(400).send('no extension');
   })
   .then(data => {
     data = String(data)
     const newData = data[0] === '!' ? `(${data.substring(1, data.length - 1)})` : data;
     return res.send(newData);
   })
   .catch(e => res.status(500).send(e));
});

app.get('/extensions', (req, res) => {
  res.json({ success: true, data: featureConfigs });
});

app.listen(port);
console.log(`extension server is loaded on port ${port}`);

