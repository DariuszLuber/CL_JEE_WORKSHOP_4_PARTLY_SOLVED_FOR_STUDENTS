class BookController{

    constructor(htmlEl){
        this.bookDao = new BookDao();
        this.bookSectionEl = htmlEl;
        this.listBookEl;
    }

    initApp(){
        //load books from server and creates ul element
        this.loadAllBooks();

        //create add form
        this.createForm();
        this.addDeleteBookAction();

    }

    loadAllBooks(){

        this.listBookEl = document.createElement("ul");
        this.listBookEl.classList.add("list-group");
        this.bookSectionEl.appendChild(this.listBookEl);

        this.bookDao.getAllBooks()
            .then( books =>{
                books.forEach(book=> this.createBookElement(book))
            });
    }


    createForm(book){

        let formEl = document.createElement("form");
        formEl.classList.add("jumbotron");
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

            this.bookDao.save(book)
                .then( book => {
                    this.createBookElement(book)
                    form.reset();
                })
                .catch( e => console.log(e) );


        })
    }

    addDeleteBookAction(){

        this.listBookEl.addEventListener("click", e=>{

            if(e.target.tagName == "BUTTON" && e.target.className.indexOf("delete") != -1){
                let bookId = e.target.parentElement.dataset.id;
                this.bookDao.delete(bookId).then( result =>{
                    if(result===true){
                        e.target.parentElement.remove();
                    }else{
                        alert("Error during delete");
                    }
                });
            }

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
        inputEl.classList.add("form-control");
        if(inputObj.type === "submit"){
            inputEl.classList.add("btn","btn-success");
        }
        inputEl.value = inputObj.value;
        formEl.appendChild(inputEl);
    }



    createBookElement(book){
        let li = document.createElement("li");
        li.dataset.id = book.id;
        li.classList.add("list-group-item");

        let h2 = document.createElement("h2")
        h2.innerText = book.title;
        let h3 = document.createElement("h3")
        h3.innerText = book.author;

        let showMore = document.createElement("button");
        showMore.innerText = "More info";
        showMore.classList.add("more","btn","btn-info");

        let deleteElem = document.createElement("button");
        deleteElem.innerText = "delete";
        deleteElem.classList.add("delete","btn","btn-danger");

        let details = document.createElement("div");
        details.classList.add("details");

        li.appendChild(h2);
        li.appendChild(h3);
        li.appendChild(showMore);
        li.appendChild(deleteElem);
        li.appendChild(details);

        this.listBookEl.appendChild(li);
    }


}