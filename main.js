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
const url = "http://localhost:3000/users"
//-User-page variables
const containerSecond = document.getElementById("container-2");
const userNameElem = document.getElementById("user-name");
const lielem = document.querySelectorAll(".left-body ul li");
const centerBodyElem = document.querySelector(".bodysection .center-body");
const currentPassInput = document.getElementById("current-pass");
const newPassInput = document.getElementById("new-pass");
const confirmBtn = document.querySelector(".center-body button");
const succesnotfdisplay =document.querySelector(".succesdisp")
const errornotfdisplay =document.querySelector(".errordisp")



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
        fetch(url, {
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
})

enterBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(url).then(res => res.json())
        .then(data => {
            const user = data.find(element => {
                return enteredMailInput.value.trim().toLowerCase() === element.email.trim().toLowerCase() &&
                    enteredPasswordInput.value.trim().toLowerCase() === element.password.trim().toLowerCase();
            });
            if (user) {
                errnot.style.opacity = "0";
                enteredMailInput.style.border = "none";
                enteredPasswordInput.style.border = "none";
                container.style.display = "none";
                containerSecond.style.display = "block"
                userNameElem.textContent = user.name.toUpperCase()
            } else {
                errnot.style.opacity = "1";
                enteredMailInput.style.border = "1px solid red";
                enteredPasswordInput.style.border = "1px solid red";
            }
            enteredMailInput.value = "";
            enteredPasswordInput.value = "";
            confirmBtn.addEventListener("click", () => {
               
                if (user.password.trim().toLowerCase() === currentPassInput.value.trim().toLowerCase()) {
                    errornotfdisplay.style.display="none"
                    succesnotfdisplay.style.display="flex"
                    setInterval(()=>{
                    changepass(user.id)
                  },2000)
                } else {
                    errornotfdisplay.style.display="flex"
                }
            })

        })
        .catch(error => {
            console.error('Sehv var!', error);
        });
})

lielem.forEach((item, index) => {
    item.addEventListener("click", () => {
        lielem.forEach(items => {
            items.classList.remove("li-active")
        })
        item.classList.toggle("li-active")
        if (index === 0) {
            centerBodyElem.style.display = "block";
        } else {
            centerBodyElem.style.display = "none";
        }
    })
})

fetch(url).then(res => res.json())
    .then(data => {
        data.forEach(element => {
    //   console.log(element);
        });
    })

function changepass(id) {
    let newPass = {
        password: newPassInput.value
    }
    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newPass)
    })
}