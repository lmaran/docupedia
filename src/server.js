import express from 'express';

const app = express();
const port = 1420;

app.get('/', (req, res) => {
    res.send('Hello world!')
})

 // Health check for HAProxy (ex: docupedia-blue-production)
app.get("/check", (req, res) => {
    res.send(`docupedia-${process.env.DEPLOYMENT_SLOT || "noslot"}-${process.env.NODE_ENV || "noenv"}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})