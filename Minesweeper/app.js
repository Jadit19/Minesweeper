const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
const serverNumber = 3000;
var i = 1;

app.use(express.urlencoded({ extended: true }));

app.listen(serverNumber, () => {
    console.log(`Listening on port #${serverNumber}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log(`User now on main page for the ${i}th time..`);
    i++;
});

app.use(express.static(__dirname + '/'));