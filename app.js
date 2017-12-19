import express from 'express'
import config from './Config/config'
import datasource from './Config/datasource'
import bodyparser from 'body-parser'

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyparser.json());

const Books = app.datasource.models.Books

app.route('/books')
    .get((req, res) => {
        Books.findAll({})
            .then(result => res.json(result))
            .catch(err => res.status(412));
    })
    .post((req, res) => {
        Books.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(412));
    });

app.route('/books/:id')
    .get((req, res) => {
        Books.findOne({ where: req.params })
            .then(result => res.json(result))
            .catch(err => res.status(412));
    })
    .put((req, res) => {
        Books.update(req.body, { where: req.params })
            .then(result => res.json(result))
            .catch(err => res.status(412));
    })
    .delete((req, res) => {
        Books.destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(err => res.status(412));
    });

export default app