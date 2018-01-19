describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'teste@teste.com',
    password: 'teste',
  };

  beforeEach(done => {
    Users.destroy({ where: {} })
            .then(() => Users.create(defaultUser))
            .then(() => {
              done();
            });
  });

  describe('Route GET /Users', () => {
    it('Should return a list of Users', done => {
      request
                .get('/Users')
                .end((err, res) => {
                  expect(res.body[0].id).to.be.eql(defaultUser.id);
                  expect(res.body[0].name).to.be.eql(defaultUser.name);
                  expect(res.body[0].email).to.be.eql(defaultUser.email);
                  done(err);
                });
    });
  });

  describe('Route GET /Users/{id}', () => {
    it('Should return a User', done => {
      request
                .get('/Users/1')
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(defaultUser.id);
                  expect(res.body.name).to.be.eql(defaultUser.name);
                  expect(res.body.email).to.be.eql(defaultUser.email);

                  done(err);
                });
    });
  });

  describe('Route POST /Users/', () => {
    it('Should create a User', done => {
      const newUser = {
        id: 2,
        name: 'New User',
        email: 'teste@teste.com',
        password: 'teste',
      };
      request
                .post('/Users')
                .send(newUser)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(newUser.id);
                  expect(res.body.name).to.be.eql(newUser.name);
                  expect(res.body.email).to.be.eql(newUser.email);

                  done(err);
                });
    });
  });

  describe('Route PUT /Users/{id}', () => {
    it('Should update a User', done => {
      const updateUser = {
        id: 1,
        name: 'User Updated',
        email: 'teste@teste.com',
        password: 'teste',
      };
      request
                .put('/Users/1')
                .send(updateUser)
                .end((err, res) => {
                  expect(res.body).to.be.eql([1]);

                  done(err);
                });
    });
  });

  describe('Route DELETE /Users/{id}', () => {
    it('should delete a User', done => {
      request
                .delete('/Users/1')
                .end((err, res) => {
                  expect(res.statusCode).to.be.eql(204);

                  done(err);
                });
    });
  });
});
