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

    addBook(book) {
        fetch(this.restUrl + "/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Get Books error");
            }
        })
        .then(book => {
            console.log(book);
        })
        .catch(error => {
            throw error;
        });

    }


}