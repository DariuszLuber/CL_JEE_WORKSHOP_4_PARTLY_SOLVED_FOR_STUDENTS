class RestApiService {

    constructor() {
        this.restUrl = "http://localhost:8282";
    }

    getAllBooks(callbackfn) {

        fetch(this.restUrl + "/books")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Get Books error");
                }
            })
            .then(books => {
                if (typeof callbackfn === "function") {
                    console.log(books);
                    callbackfn(books);
                }
            })
            .catch(error => {
                throw error;
            });

    }


    delete(bookId, callbackfn){
        if(typeof callbackfn != "function")
            throw new Error("Wrong callback param");


        fetch(this.restUrl+"/books/"+bookId,{
            method: "Delete"
        }).then( response =>{
            if(response.ok && response.status === 204){
                callbackfn(true);
            }else{
                callbackfn(false);
            }

        }).catch( e => {
            throw new Error(e);
        });
    }

    addBook(book, callbackfn) {
        fetch(this.restUrl + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: book.json()
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Get Books error");
            }
        })
        .then(respBook => {
            if(typeof callbackfn === 'function')
                callbackfn(respBook);
        })
        .catch(error => {
            throw error;
        });

    }


}