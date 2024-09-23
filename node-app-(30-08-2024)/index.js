const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const router = require('./routes/api-route');
const cors = require('cors');

require('./config/database')();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/api', router.route);

// app.get('/user', function (req, res) {
//     res.send({
//         "message":"Hello"
//     })
// })

let server = http.createServer(app);

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log(`Server is running on port: ${PORT}`)
})
