class Book{
    constructor(id=0, isbn="", title="", author="", publisher="", type=""){
        this._id = id;
        this._isbn = isbn;
        this._title = title;
        this._author = author;
        this._publisher = publisher;
        this._type = type;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get isbn() {
        return this._isbn;
    }

    set isbn(value) {
        this._isbn = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if(value.length<3)
            throw new Error("Title must be at least 3 characters long");

        this._title = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get publisher() {
        return this._publisher;
    }

    set publisher(value) {
        this._publisher = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}