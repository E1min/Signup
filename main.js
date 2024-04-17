//-For the animation
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
//-Sign-up variables
const createNameInput = document.getElementById("createname");
const createEmailInput = document.getElementById("createEmail");
const createPasswordInput = document.getElementById("createPassword");
const sendDatabtn = document.getElementById("sendNewData");
//-Sign-in variables
const enteredMailInput = document.getElementById("enteredMail");
const enteredPasswordInput = document.getElementById("enteredPassword");
const enterBtn = document.getElementById("enter");
const errnot = document.querySelector(" .errornotf")
const userUrl = "https://661e64b098427bbbef046c14.mockapi.io/user";
const todosUrl = "https://661e64b098427bbbef046c14.mockapi.io/todos"
//-User-page variables
const containerSecond = document.getElementById("container-2");
const succesnotfdisplay = document.querySelector(".succesdisp")
const errornotfdisplay = document.querySelector(".errordisp")
const lielem = document.querySelectorAll(".left-body ul li");
//-Changing Pass
const userNameElem = document.getElementById("user-name");
const changingpassword = document.querySelector(".center-body .changepassword");
const currentPassInput = document.getElementById("current-pass");
const newPassInput = document.getElementById("new-pass");
const confirmBtn = document.getElementById("confirm");
//-User Todos
const todosdisp = document.querySelector(".mytodos");
const todosinput = document.getElementById("todoinput");
const todosaddbtn = document.getElementById("addtodo");
const succesadddisp = document.querySelector(".mytodos .succesadd")
const showtodoelem = document.querySelector(".mytodos .showtodo")



function userok(user) {
    errnot.style.opacity = "0";
    enteredMailInput.style.border = "none";
    enteredPasswordInput.style.border = "none";
    container.style.display = "none";
    containerSecond.style.display = "block"
    userNameElem.textContent = user.name.toUpperCase()
}


function todorender(id) {
    fetch(todosUrl)
        .then(res => res.json())
        .then(data => {
            showtodoelem.innerHTML = ""
            data.filter(todo => todo.userId === id).forEach(item => {
                showtodoelem.innerHTML += `<li class="todoli">${item.description}</li>`
            })
        })
}

function showadded() {
    succesadddisp.style.display="none"
}

function sendtodo(id) {
    let newTodo = {
        description: `${todosinput.value}`,
        userId: id
    }
    fetch(todosUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
    })
        .then(res => {
            if (res.ok) {
            succesadddisp.style.display="flex"
            setTimeout(showadded,1000)
            todosinput.value = ""
            todorender(id)
        }
})
}




registerBtn.addEventListener("click", () => {
    container.classList.add("active")
    errnot.style.opacity = "0"
    enteredMailInput.style.border = "none";
    enteredPasswordInput.style.border = "none";
})
loginBtn.addEventListener("click", () => {
    container.classList.remove("active")
})

sendDatabtn.addEventListener("click", (e) => {
    e.preventDefault()
    let newUser = {
        name: createNameInput.value,
        email: createEmailInput.value,
        password: createPasswordInput.value
    }
    if (createNameInput.value !== "" && createEmailInput.value !== "" && createPasswordInput.value !== "") {
        fetch(userUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
    }
    createNameInput.value = ""
    createEmailInput.value = ""
    createPasswordInput.value = ""
    setTimeout(()=>{
        location.reload();
    },1000)
})

enterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(userUrl)
        .then(res => res.json())
        .then(data => {
            const user = data.find(element => {
                return enteredMailInput.value.trim().toLowerCase() === element.email.trim().toLowerCase() &&
                    enteredPasswordInput.value.trim().toLowerCase() === element.password.trim().toLowerCase();
            });
            todosaddbtn.addEventListener("click", () => {
                sendtodo(user.id)
            })
            if (user) {
                userok(user);
                todorender(user.id);
                confirmBtn.addEventListener("click", () => {
                    if (user.password.trim().toLowerCase() === currentPassInput.value.trim().toLowerCase()) {
                        errornotfdisplay.style.display = "none";
                        succesnotfdisplay.style.display = "flex";
                        changepass(user.id, user.name, user.email);
                        setTimeout(() => {
                            errornotfdisplay.style.display = "none";
                            succesnotfdisplay.style.display = "none";
                            location.reload();
                        }, 2000);
                    } else {
                        errornotfdisplay.style.display = "flex";
                    }
                });
            } else {
                errnot.style.opacity = "1";
                enteredMailInput.style.border = "1px solid red";
                enteredPasswordInput.style.border = "1px solid red";
            }

            enteredMailInput.value = "";
            enteredPasswordInput.value = "";
        })
        .catch(error => {
            console.error('Sehv var!', error);
        });
});


lielem.forEach((item, index) => {
    item.addEventListener("click", () => {
        lielem.forEach(items => {
            items.classList.remove("li-active")
        })
        item.classList.add("li-active")
        if (index === 0) {
            todosdisp.style.display = "block";
            changingpassword.style.display = "none";
        }
        else if (index === 1) {
            todosdisp.style.display = "none";
            changingpassword.style.display = "block";
        } else {
            todosdisp.style.display = "none";
            changingpassword.style.display = "none";
        }
    })
})


function changepass(id, name, email) {
    let newPass = {
        name: name,
        email: email,
        password: newPassInput.value
    }
    fetch(`${userUrl}/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newPass)
    })
}
