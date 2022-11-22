let myLibrary = [];

function newBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

newBook.prototype.info = function () {
    return ("The book is named " + this.title + " by " + this.author + " it has " + this.pages + " pages and " + this.read);
}
newBook.prototype.toggleStatus= function(){
    this.read=!this.read;
} 

myLibrary.push(new newBook("Hobbit", "Tolkien", 450, false));
myLibrary.push(new newBook("Lord Of The Rings", "Tolkien", 1200, true));
myLibrary.push(new newBook("The Shining", "Stephen King", 550, true));
myLibrary.push(new newBook("It", "Stephen King", 1100, true));
myLibrary.push(new newBook("And Then There Were None", "Agatha Christie", 450, true));


document.getElementsByTagName("button")[1].addEventListener("click", (e) => callMe(e));
function callMe(e) {
    e.preventDefault();
    myLibrary.push(new newBook(document.getElementById("book_title").value, document.getElementById("book_author").value, document.getElementById("number_of_pages").value, document.getElementById("have_read").checked))
    createLibrary();
    modal.style.display = "none";
}


function createLibrary() {
    cleanLibrary();
    for (let index in myLibrary) {
        let book = myLibrary[index];
        cardCreation(index,book);
    }
}
function cleanLibrary(){
    while (document.getElementsByClassName("cards")[0].firstChild) {
        document.getElementsByClassName("cards")[0].removeChild(document.getElementsByClassName("cards")[0].firstChild);
    }
}
function removeFromLibrary(index){
    myLibrary.splice(index,1);
    cleanLibrary();
    createLibrary();
}

function cardCreation(index,book){
    createBookCard(index);
        cardLabel(index,"Title");
        cardElement(index, "title", book.title);
        cardLabel(index,"Author");
        cardElement(index, "author", book.author);
        cardLabel(index,"Number Of Pages");
        cardElement(index, "pages", book.pages);
        cardLabel(index,"Read");
        let readStatus=(book.read === true ? "I have read it" : "I haven't read it");
        cardElement(index, "read", readStatus);
        toggleStatusButton(index);
}

function cardLabel(index,value) {
    let book_Element = document.createElement("div");
    book_Element.classList.add("label");
    book_Element.textContent = value+":";
    document.getElementsByClassName("card")[index].appendChild(book_Element);
}
function createBookCard(index) {
    let card = document.createElement("div");
    card.classList.add("card");
    document.getElementsByClassName("cards")[0].appendChild(card);
    deleteButton(index);
}

function deleteButton(index){
    let deleteButton=document.createElement("span");
    deleteButton.setAttribute("id",index);
    deleteButton.textContent="-";
    deleteButton.addEventListener("click",(e)=>removeMe(e))
    document.getElementsByClassName("card")[index].appendChild(deleteButton);
}

function toggleStatusButton(index){
    let statusChange=document.createElement("i");
    statusChange.setAttribute("id","swap-"+index);
    statusChange.textContent= "Swap";
    statusChange.addEventListener("click",(e)=>toggleStatusPressed(index));
    document.getElementsByClassName("card")[index].getElementsByClassName("read")[0].appendChild(statusChange);
}

function toggleStatusPressed(index){
    myLibrary[index].toggleStatus();
    if (myLibrary[index].read===true){
    document.getElementsByClassName("card")[index].getElementsByClassName("read")[0].textContent="I have read it";
}else{
    document.getElementsByClassName("card")[index].getElementsByClassName("read")[0].textContent="I haven't read it";
}
    toggleStatusButton(index);
}

function removeMe(e){
    removeFromLibrary(e.srcElement.id);
}

function cardElement(index, elementType, value) {
    let book_Element = document.createElement("div");
    book_Element.classList.add(elementType);
    book_Element.textContent = value;
    document.getElementsByClassName("card")[index].appendChild(book_Element);
}

var modal = document.getElementById("modal");
var modalButton = document.getElementById("newBook");
var span = document.getElementsByClassName("close")[0];
createLibrary();
modalButton.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}