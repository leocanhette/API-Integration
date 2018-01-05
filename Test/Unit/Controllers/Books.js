import BooksController from '../../../Controllers/Books'

describe('Controllers: Books', () => {
    describe('Get all books: getAll()', () => {
        it('Should return a list of books', () => {
         
            //Model of Books
            const Books = {
                findAll: td.function(),
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test  Books',
                created_at: '2016-08-06T23:55:36.6922',
                updated_at: '2016-08-06T23:55:36.6922'
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);
            return booksController.getAll()
                .then(response => expect(response).to.be.eql(expectedResponse));
        });
    });
});