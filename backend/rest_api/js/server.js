const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

const customer = require('./routes/customer');
app.use(customer);

const management = require('./routes/management');
app.use(management);

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
