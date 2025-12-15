function greetController(req, res, next) {
    try {
        const name = req.query.name;

        if (!name) {
            return next({status: 400, message: 'Name is required'});
        }

        const greeting = `Hello ${name}`;

        console.log('Controller processed greeting', greeting); // console log 

        res.status(200).json({greeting});

    } catch (err) {
        next(err);
    }
}

module.exports = greetController;