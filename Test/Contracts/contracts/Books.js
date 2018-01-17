
describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Description Book',
  };

  beforeEach(done => {
    Books.destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        done();
      });
  });

  describe('Route GET /books', () => {
    it('Should return a list of books', done => {
      const bookList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/books')
        .end((err, res) => {
          joiAssert(res.body, bookList);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('Should return a book', done => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route POST /books/', () => {
    it('Should create a book', done => {
      const newBook = {
        id: 2,
        name: 'New Book',
        description: 'Description Book',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('Should update a book', done => {
      const updateBook = {
        id: 1,
        name: 'Updated Book',
        description: 'Updated Description',
      };

      const updatedBook = Joi.array().items(1);

      request
        .put('/books/1')
        .send(updateBook)
        .end((err, res) => {
          joiAssert(res.body, updatedBook);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', done => {
      request
        .delete('/books/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
