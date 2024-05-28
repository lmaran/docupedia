//const express = require('express')
import express from 'express';

const app = express()
const port = 1420

app.get('/', (req, res) => {
  res.send('Hello Docupedia!')
})

app.get("/check", (req, res) => {
  res.send("docupedia-" + (process.env.DEPLOYMENT_SLOT || "noslot") + "-" + process.env.NODE_ENV);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
