const express = require('express');
const app = express();
const PORT = 5500;

app.use(express.static("public")); // look into this more

app.use(express.json());

app.get('/hello', (req, res) =>  {
    res.status(200).json({ message: 'Hello, world!' });
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.status(200).json({
        message: `Hello ${name}, you are ${age} years old!`
    });
});

app.get('/search', (req, res) =>  {
    const q = req.query.q;
    const limit = req.query.limit;

    res.status(200).json({query: `${q}`, limit: `${limit}`});
});

app.get('/divide', (req, res, next) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return next({status: 400, message: 'a and b must be numbers.'});
    }

    if (b == 0) {
        return next({status: 400, message: 'Can\'t divide by zero.'});
    }

    const result = a/b;

    res.status(200).json({result});

});

const greetController = require('./controllers/greetController.js');

app.get('/greet', greetController);

//error handle
app.use((err, req, res, next) => {

    console.log('Error triggered');

    const status = err.status || 500;
    const message = err.message || 'Something went wrong.';

    res.status(status).json({message});
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// make note that status codes have to be sent, 500 errors generally with try catch
// 400 with if/then

app.get('/external', async (req, res) => {
    const city = req.query.city || 'London';
    
    const latitude = 51.5072;
    const longitude = -0.1276;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);

    } catch (err) {
        console.error(err); // maybe unnecessary?
        res.status(500).json({message: 'Failed to reach server'});
    }

});



