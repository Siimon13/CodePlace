const express = require('express');
const app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
    console.log('At index');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
