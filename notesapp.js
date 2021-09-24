//define the clear all notes function
function clearAllNotes() {
    console.log("clear")
    localStorage.clear();
    location.reload();
}

function searchMenu() {
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("menu");
    let li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        let button = li[i].getElementsByTagName("button")[0];
        if (button.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }
        else {
            li[i].style.display = "none";
        }
    }
}
shownotes();

// validation()
let addtitle = document.getElementById("titleTextarea");
addtitle.addEventListener("keyup",function(){
    // console.log("fired","addtitle")
    let btn = document.getElementById("btn")
    let smallTitle = document.getElementById("smallTitle");
    if (addtitle.value.length > 8) {
        btn.disabled = true;
        smallTitle.innerText = "Title should not be more than 8 character."
        smallTitle.style.color = "red";
        return false;
    }
    else if (addtitle.value.length === 0) {
        btn.disabled = true;
        smallTitle.innerText = "Title should not be empty."
        smallTitle.style.color = "red";
        return false;
    }
    else {
        smallTitle.innerText = "";
        return true;
    }
});
let addtxt = document.getElementById("textTextarea");
addtxt.addEventListener("keyup", function(){
    // console.log("fired validation")
    let btn = document.getElementById("btn")
    let smallNote = document.getElementById("smallNote");
    if (addtxt.value.length > 400) {
        btn.disabled = true;
        smallNote.innerText = "Note should not be more than 400 character."
        smallNote.style.color = "red";
        return false;
    }
    else if (addtxt.value.length === 0) {
        btn.disabled = true;
        smallNote.innerText = "";
        return false;
    }
    else {
            smallNote.innerText = "";
            btn.disabled = false;
        
    }
})

let addBtn = document.getElementById("btn");
addBtn.addEventListener("click", function (e) {
    let addtitle = document.getElementById("titleTextarea");
    let addtxt = document.getElementById("textTextarea");

    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        txt: addtxt.value,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtitle.value = "";
    addtxt.value = "";
    console.log(addBtn)
    shownotes();
})


function shownotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let noteHtml = "";
    notesObj.forEach(function (element, index) {
        html += `<li>
            <button class="tablinks" onclick="openTitle(event, 'tab${index}')">${element.title}</button>
               </li>
                `
        noteHtml += `
                    <div id="tab${index}" class="tabcontent">
                    <h3>${element.title}</h3>
                    <p>${element.txt}</p>
                    <button type="submit" onclick="displayNoteSection(this.id)" title="Click to add a new Note." id="tab${index}">New Note</button>
                    <button type="submit" id="${index}" onclick="deleteNote(this.id)">Delete</button>
                    </div>
                    `;
    })
    let titleMenu = document.getElementById("menu");
    let displayNote = document.getElementById("displayNote");
    // let addNoteBox = document.getElementById("addNoteBox");
    // let ul = document.getElementsByTagName("ul")[0];
    if (notesObj.length !== 0) {
        titleMenu.innerHTML = html;
        displayNote.innerHTML = noteHtml;
    }
}

function displayNoteSection(index) {
    let addNoteBox = document.getElementById("addNoteBox");
    let content = document.getElementById(index);
    content.style.display = "none";
    addNoteBox.style.display = "block";

}

function deleteNote(index) {
    let notes = localStorage.getItem("notes")
    let addNoteBox = document.getElementById("addNoteBox");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    if (notesObj.length === 0) {
        location.reload();
    }
    else {
        addNoteBox.style.display = "block";
    }
    shownotes();
}

function openTitle(e, index) {

    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(index).style.display = "block";
    document.getElementById("addNoteBox").style.display = "none"
    e.currentTarget.className += " active";
}

let togglebox = document.getElementById("togglebox");
let titlebox = document.getElementById("titleBox");

document.onclick = function (e) {
    if (e.target.id !== "togglebox" && e.target.id !== "search") {
        togglebox.classList.remove("toggle");
        titlebox.classList.remove("display");
    }
}

togglebox.onclick = function () {
    togglebox.classList.toggle("toggle");
    titlebox.classList.toggle("display");
}
