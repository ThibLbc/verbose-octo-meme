var working = false;
const animCarous = 300;

function carouRight() {

    if (!working) {
        working = true;
        var imgs = document.querySelector(".cImgs");

        document.querySelectorAll(".imgBox").forEach(element => {
            element.classList.add("tR");
        });
        imgs.querySelectorAll(".imgBox")[2].classList.remove("imgFocus");

        imgs.querySelectorAll(".imgBox")[3].classList.add("imgFocus");
        imgs.querySelectorAll(".imgBox")[3].classList.remove("tR");
        imgs.querySelectorAll(".imgBox")[3].classList.add("tRs");

        setTimeout(() => {
            document.querySelectorAll(".imgBox").forEach(element => {
                element.classList.remove("tR");
                element.classList.remove("tRs");
            });
            var tamp = imgs.firstElementChild.cloneNode(true);
            imgs.removeChild(imgs.firstElementChild);
            imgs.appendChild(tamp);
            working = false;
        }, animCarous)
    }
}

function carouLeft() {
    if (!working) {
        working = true;
        var imgs = document.querySelector(".cImgs");

        document.querySelectorAll(".imgBox").forEach(element => {
            element.classList.add("tL");
        });
        imgs.querySelectorAll(".imgBox")[2].classList.remove("imgFocus");

        imgs.querySelectorAll(".imgBox")[1].classList.add("imgFocus");
        imgs.querySelectorAll(".imgBox")[1].classList.add("tLs");
        imgs.querySelectorAll(".imgBox")[1].classList.remove("tL");

        setTimeout(() => {
            document.querySelectorAll(".imgBox").forEach(element => {
                element.classList.remove("tL");
                element.classList.remove("tLs");
            });
            var tamp = imgs.lastElementChild.cloneNode(true);
            imgs.removeChild(imgs.lastElementChild);
            imgs.insertBefore(tamp, imgs.firstElementChild);
            working = false;
        }, animCarous)
    }
}

document.addEventListener("scroll", () => {
    var i = 0.562 + (window.scrollY / 100);
    var u = "rgba(0,0,0," + i + ")"
    document.querySelector(".botMenu").style.backgroundColor = u;
});


document.querySelector(".formulaire").querySelectorAll("input").forEach((element) => {
    element.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
            askDevis();
        }
    })
});

function askDevis() {
    var name = document.querySelector("#nameFI").value;
    var codePost = document.querySelector("#codeFI").value;
    var email = document.querySelector("#emailFI").value;
    var tel = document.querySelector("#telFI").value;
    var message = document.querySelector("#messageFI").value;

    var sub = "Demande de devis de Mme/Mme " + name;
    var content = "Bonjour, mon nom est : " + name;
    content += "\nSujet de la semande : " + document.querySelector("title").innerHTML;
    content += "\nMon code postal est : " + codePost;
    content += "\nMon adresse mail est : " + email;
    content += "\nMon numéro de téléphone est : " + tel + "\n";
    content += "Je vous écris pour formuler une demande de devis, voici des précisions :\n" + message;

    if (name != undefined && codePost != undefined && email != undefined && tel != undefined && message != undefined && name != "" && codePost != "" && email != "" && tel != "" && message != "") {
        sendMail("", sub, content);
    }
}

var asked = false;

function sendMail(dest, subject, content) {
    var request = new XMLHttpRequest();
    var formdata = new FormData();

    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (this.responseText == "0") {
                document.querySelector(".formulaire").querySelector("button").innerHTML = "Demande envoyée";
                document.querySelector(".formulaire").querySelector("button").style.backgroundColor = "green";
                asked = true;
            }
            else if (this.responseText == "-1") {
                console.log("sendMail: error");
            }

        }
    }

    if(!asked){
        formdata.set("subject", subject);
        formdata.set("content", content);
        formdata.set("dest", dest);

        request.open("POST", "sendMail.php");
        request.send(formdata);
    }
}


function showMenu() {
    var menu = document.querySelector('.botMenuLinks');
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
    }
    else {
        menu.classList.add('showMenu');
    }
}