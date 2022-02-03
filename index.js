const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// const todos = localStorage.getItem("todos");
// これはtodosに文字列が入っているので扱いづらい
const todos = JSON.parse(localStorage.getItem("todos"));
// JSON形式、オブジェクト形式に変換して使い安くしておく

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(input.value);
    add();
});

function add(todo) {
    let todoText = input.value;

    if (todo) {
        // todoが空文字ではない => 暗黙的型変換 => True
        todoText = todo.text;
    }
    if (todoText.length > 0) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // contextmenu -> 右クリック
        li.addEventListener("contextmenu", function(event) {
            event.preventDefault();
            // 右クリックのデフォルトの起動を中断
            li.remove();
            saveData();
        });

        li.addEventListener("click", function() {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        }
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}