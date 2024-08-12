/*  (1)

algorithms

i.      create an array to store todos
ii.     when we click "Add" ,
iii.    get text from textbox
iv.     Add it to Array
v.      console.log() the array
vi.     when we click add something from the input box, it should reset the textbox

    (2)

display the todo on our webpage
     
i.      Loop through the Array
ii.     Create HTML code for each todo
iii.    Put the HTML code on the webpage

*/

const bookmark = JSON.parse(localStorage.getItem('bookmark'));

if (!bookmark) { 
    bookmark = [{
            website: 'Google',
            url: 'google.com',
        },
        {
            website: 'Twitter',
            url: 'twitter.com'
        },
        {
            website: 'Gmail',
            url: 'gmail.com'
        }
    ]
}

displayResult();
saveToStorage();

function saveToStorage () {
    localStorage.setItem('bookmark', JSON.stringify(bookmark));
    console.log('saveToStorage');
}

function addBookmark() {
    const inputELement = document.querySelector('.js-add-web');
    const website = inputELement.value

    const urlInputElement = document.querySelector('.js-add-url');
    const url = urlInputElement.value

    bookmark.push({
        website,
        url
    });

    inputELement.value = '';
    urlInputElement.value = '';

    displayResult();
}; 

function displayResult() {
    let bookmarkHTML = '';


    bookmark.forEach((bookmarkObject, index)=> {
        let { website, url } = bookmarkObject
        let html = `
        <div class"total-container">
        <a target="_blank" class="js-box" href="https://${url} ">
        <div>${website}</div>
        </a> 
        <button class="js-delete delete">Delete</button>
        </div>
        `;
        bookmarkHTML += html;

        document.querySelector('.result').innerHTML = bookmarkHTML;

        document.querySelectorAll('.js-delete').forEach(function(deleteButton, index) {
            deleteButton.addEventListener('click', function() {
                bookmark.splice(index, 1);
                displayResult();  
            });
        });

        saveToStorage();

    });
    
}

document.querySelector('.js-add').addEventListener('click', ()=> {
    addBookmark();
});

document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addBookmark();
    }
});