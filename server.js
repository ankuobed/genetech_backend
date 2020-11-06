const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Joi = require('joi');
const helmet = require('helmet');

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://genetech-backend.herokuapp.com'
}));
app.use(helmet());

app.post('/contact', (req, res) => {
    const contactSchema = Joi.object({
        name: Joi.string().alphanum().min(3).required(),
        email: Joi.string().email().required(),
        message: Joi.string().max(1000).required()
    });

    const result = contactSchema.validate(req.body);
    const error = result.error.details[0].message;
    res.status(422).json(error);

    if (!error) {
        res.status(200);
    }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));