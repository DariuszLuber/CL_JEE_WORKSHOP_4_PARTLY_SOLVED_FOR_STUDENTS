class BookController{

    constructor(htmlEl){
        this.bookDao = new BookDao();
        this.bookSectionEl = htmlEl;
        this.listBookEl;
    }

    initApp(){
        //load books from server
        this.loadAllBooks();

        //create add form
        this.createForm();
    }

    loadAllBooks(){

        this.listBookEl = document.createElement("ul");
        this.bookSectionEl.appendChild(this.listBookEl);

        this.bookDao.getAllBooks()
            .then( books =>{
                books.forEach(book=> this.createBookElement(book))
            });
    }


    createForm(book){

        let formEl = document.createElement("form");
        this.bookSectionEl.insertBefore(formEl, this.listBookEl);

        this._createFormInput(formEl,{
            name: "id",
            type: "hidden",
            placeholder: "",
            value: (book!== undefined )?book.id:0
        });

        this._createFormInput(formEl,{
            name: "title",
            type: "text",
            placeholder: "Book title",
            value: (book!== undefined )?book.title:""
        });

        this._createFormInput(formEl,{
            name: "author",
            type: "title",
            placeholder: "Book author",
            value: (book!== undefined )?book.author:""
        });

        this._createFormInput(formEl,{
            type: "submit",
            value: (book!== undefined )?"Update":"Add"
        });

        this._addFormAction(formEl);
    }

    _addFormAction(formEl){
        formEl.addEventListener("submit", e=>{
            e.preventDefault();
            let form = e.target;

            let id = parseInt(form.querySelector("input[name=id]").value);
            let title = form.querySelector("input[name=title]").value;
            let author = form.querySelector("input[name=author]").value;

            let book = new Book(id, "",title, author);

            this.bookDao.save(book); //promise


        })
    }

    /**
     * This method is to create input and append it to formEl
     * @param formEl
     * @param inputObj = {type:"text", name:"inputName", placeholder:"title", value:"someValue"}
     * @private
     */
    _createFormInput(formEl, inputObj){
        let inputEl = document.createElement("input");
        inputEl.setAttribute("type",inputObj.type);
        inputEl.setAttribute("name", inputObj.name);
        inputEl.setAttribute("placeholder", inputObj.placeholder);
        inputEl.value = inputObj.value;
        formEl.appendChild(inputEl);
    }



    createBookElement(book){
        let li = document.createElement("li");
        li.innerText = `${book.title} ${book.author}`;
        this.listBookEl.appendChild(li);
    }


}