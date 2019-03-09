class BookDao{

    constructor() {
        this.restService = new RestApiService();

    }


    getAllBooks(){

        return new Promise( (resolve, reject) =>{

            try {
                this.restService.getAllBooks(booksArr => {
                    let books = [];
                    booksArr.forEach(bookEl => {
                        let book = new Book(
                            bookEl.id,
                            bookEl.isbn,
                            bookEl.title,
                            bookEl.author,
                            bookEl.publisher,
                            bookEl.type
                        );
                        books.push(book);
                    })
                    //return for promises
                    resolve(books);

                });
            }catch (error) {
                //throw Error for promises
                reject(error);
            }
        })
    }


    delete(bookId){
        return new Promise( (resolve, reject) =>{
            this.restService.delete(bookId, result =>{
                resolve(result);
            });
        })

    }

    save(book){
        if(book.id === 0){
            book.id = undefined;
            return this._addBook(book);
        }else{
            return this._updateBook(book);
        }
    }

    _addBook(book){
        return new Promise( (resolve, reject) =>{
            this.restService.addBook(book, respBook =>{
                if(respBook.id){
                    book.id = respBook.id;
                    resolve(book);
                }else{
                    reject("Save error");
                }

            });
        })
    }

    _updateBook(book){

    }






}