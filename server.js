const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (req, res) =>  {
    res.status(200).json({ message: 'Hello, world!' });
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;

    res.json({
        message: `Hello ${name}, you are ${age} years old!`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

