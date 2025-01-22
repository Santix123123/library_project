const myLibrary = [];

function Book(title, author, pages, read) {
   this.title = title; // Title of the book.
   this.author = author; // Author of the book.
   this.pages = pages; // Number of pages in the book.
   this.read = read === 'true'; // Read status (converted to boolean).
}

// Prototype method to toggle read status.
Book.prototype.toggleReadStatus = function() {
   this.read = !this.read; // Toggle between true/false.
};

// Function to add a new book to library array.
function addBookToLibrary(title , author , pages , read) { 
 const newBook = new Book(title , author , pages , read ); // Create a new instance of Book using constructor function above. 
 myLibrary.push(newBook); // Push new instance into array myLibrary .
 displayBooks(); 
}

// Function to display all books in the library on webpage.
// Loop through each book in array and create DOM elements accordingly.   
function displayBooks() {       
 const libraryDiv=document.getElementById('library');         
 libraryDiv.innerHTML='';
 myLibrary.forEach((book,index)=>{                 
 const cardDiv=document.createElement('div');              
 cardDiv.className ='card';                
 cardDiv.innerHTML=`<h3>${book.title}</h3>                
                    <p>Author : ${book.author}</p>              
                    <p>No.of Pages : ${book.pages} </p >          
                   <p>Status : ${book.read ? 'Read':'Not Read'} </p >        
                   <button onclick ="toggleRead(${index})">Toggle Read Status!</button >            
                   <button onclick ="removeBook(${index})">Remove!</button>` ;           
                   
                  
                  
                });
            }
            
            const toggleRead=(index)=>(myLibrary[index].toggleReadStatus(),displayBooks());             



// Function that removes specific item from array .         
const removeBook=(index)=>(myLibrary.splice(index ,1),displayBooks())