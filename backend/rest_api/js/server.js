const express = require('express');
const cors = require('cors');
const login = require('./auth/login');
const customer = require('./routes/customer');
const management = require('./routes/management');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(login);
app.use(customer);
app.use(management);

const port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
