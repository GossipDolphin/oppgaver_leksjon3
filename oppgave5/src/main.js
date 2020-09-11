import './main.scss';
window.onload = start;

var todoNoteList = [];
var todoNoteListCompleted = [];

function start() {

    createDummyNotes(3);
    createDummyCompletedNotes(3);
    loadCompletedTodoNotes();
    loadTodoNotes();

    document.getElementById("todoButtonSectionID").onclick = function () {
        showForm();
    }

    document.getElementById("overLayID").onclick = function () {
        closeForm();
    }

    document.getElementById("closeFormCrossID").onclick = function () {
        closeForm();
    }

    document.getElementById("dateCheckBox").addEventListener('change', function () {
        if (this.checked) {
            todoNoteListCompleted = sortByDateAscending(todoNoteListCompleted);
            loadCompletedTodoNotes();
        } else {
            todoNoteListCompleted = sortByDateDescending(todoNoteListCompleted);
            loadCompletedTodoNotes();
        }
    });

    const form = document.getElementById('todoNoteFormID');
    form.addEventListener('submit', createNote);

    document.getElementById("descriptionTextAreaID").oninput = function () {
        var charLeft = 30 - document.getElementById("descriptionTextAreaID").value.length;
        document.getElementById("formDescriptionHeaderID").innerHTML = "Description " + charLeft + " character left";
    }
}

function showForm() {
    document.getElementById("createTodoSectionID").style.visibility = 'visible';
    document.getElementById("overLayID").style.visibility = 'visible';
}

function closeForm() {
    document.getElementById("createTodoSectionID").style.visibility = 'hidden';
    document.getElementById("overLayID").style.visibility = 'hidden';
}

function createNote(event) {
    var Note = {
        title: document.getElementById("todoTitleTextAreaID").value,
        description: document.getElementById("descriptionTextAreaID").value,
        author: document.getElementById("authorTextAreaID").value,
        date: new Date(Date.now()).toLocaleDateString(),
        index: todoNoteList.length
    };
    todoNoteList.unshift(Note);
    LoadNote(Note);
    closeForm();
    event.preventDefault();
    loadTodoNotes()
}

function loadTodoNotes() {
    document.getElementById("todoNotesSectionID").innerHTML = "";
    todoNoteList.forEach(LoadNote)
}

function LoadNote(Note) {
    var todoNoteTemplate = "<article class='noteArticle' id='noteArticle" + Note.index + "'>" +
        "<h2>" + Note.title + "</h2>" +
        "<p>" + Note.description + "</p>" +
        "<button class='btnComplete' id='btnComplete" + Note.index + "'onclick='completeTodoNote(this)'>Complete</button>" +
        "<button class='btnDelete' id='btnComplete" + Note.index + "' onclick='deleteNote(this)'>Delete</button>";

    document.getElementById("todoNotesSectionID").innerHTML += todoNoteTemplate;
}

function loadCompletedTodoNotes() {
    document.getElementById("completedTodosListSectionID").innerHTML = "";
    todoNoteListCompleted.forEach(LoadCompletedNote)
}

function LoadCompletedNote(Note) {
    var completedTodoNoteTemplate = "<li>" +
        "<p>" + Note.title + "</p>" +
        "<p>" + Note.author + "</p>" +
        "<p>" + Note.description + "</p>" +
        "<p>" + Note.date + "</p>";

    document.getElementById("completedTodosListSectionID").innerHTML += completedTodoNoteTemplate;
}

function createDummyNotes(Quantity) {
    for (var i = 0; i < Quantity; i++) {
        var Note = {
            title: "todoTitle" + i,
            description: "description" + i,
            author: "author" + i,
            index: i,
            date: new Date(Date.now()).toLocaleDateString()
        };
        todoNoteList.push(Note);
    }
}

function createDummyCompletedNotes(Quantity) {
    for (var i = 0; i < Quantity; i++) {
        var Note = {
            title: "completed todoTitle" + i,
            description: "completed description" + i,
            author: "completed author" + i,
            index: i,
            date: "9/"+ (4 + i) +"/2020"
        };
        todoNoteListCompleted.push(Note);
    }
}

function deleteNote(button) {
    var id = button.id;
    for (var i = 0; i < todoNoteList.length; i++) {
        if (parseInt(id[id.length - 1]) === parseInt(todoNoteList[i].index)) {
            todoNoteList.splice(i, 1);
        }
    }
    loadTodoNotes();
}

function completeTodoNote(button) {
    var id = button.id;
    for (var i = 0; i < todoNoteList.length; i++) {
        if (parseInt(id[id.length - 1]) === parseInt(todoNoteList[i].index)) {
            todoNoteListCompleted.unshift(todoNoteList[i]);
            todoNoteList.splice(i, 1);
        }
    }
    loadTodoNotes();
    loadCompletedTodoNotes();
}

function sortByDateAscending(todoList) {
    for (var i = 0; i < todoList.length; i++) {
        for (var j = 0; j < todoList.length; j++) {
            if (todoList[j].date < todoList[i].date) {
                var temp = todoList[i];
                todoList[i] = todoList[j];
                todoList[j] = temp;
            }
        }
    }
    return todoList;
}

function sortByDateDescending(todoList) {
    for (var i = 0; i < todoList.length; i++) {
        for (var j = 0; j < todoList.length; j++) {
            if (todoList[j].date > todoList[i].date) {
                var temp = todoList[i];
                todoList[i] = todoList[j];
                todoList[j] = temp;
            }
        }
    }
    return todoList;
}

