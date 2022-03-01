function select(Component) {
    Selected = Component;
    toolbar.message(`Selected ${Component.name} ${"gate"}`);
    document.getElementById("listIO").style.display = "none";
    document.getElementById("listMem").style.display = "none";
}

const toolbar = document.getElementById("toolbar");
let hideToolbarMessage;
toolbar.message = function(msg,type) {
    clearTimeout(hideToolbarMessage);

    const toast = document.getElementById("toast");
    toast.style.display = "block";
    toast.innerHTML = msg;
    if(type == "warning") {
        toast.innerHTML = "<span class='material-icons' style='opacity: .5'>warning</span>" + toast.innerHTML;
    } else if(type == "action") {
        toast.innerHTML += "<button onclick='undo()' style='font-family: Ubuntu'><span class='material-icons'>undo</span>Undo</button>";
    }

    toast.style.marginLeft = -toast.clientWidth / 2 + "px";
    toast.style.opacity = 1;
    hideToolbarMessage = setTimeout(() => {
        toast.style.opacity = 0;
    },3000);
}

// Input/Output list
const listIO = document.getElementById("listIO");
// Memory list
const listMem = document.getElementById("listMem");
listIO.show = function() {
    listIO.style.display = "block";
    setTimeout(() => {
        listIO.style.opacity = 1;
        listIO.style.transform = "scale(1)";
    },1);
}
listIO.hide = function() {
    listIO.style.opacity = 0;
    listIO.style.transform = "scale(.5) translateX(-63px) translateY(150px)";
    c.focus();
    setTimeout(() => listIO.style.display = "none",200);
}

listMem.show = function() {
    listMem.style.display = "block";
    setTimeout(() => {
        listMem.style.opacity = 1;
        listMem.style.transform = "scale(1)";
    },1);
}
listMem.hide = function() {
    listMem.style.opacity = 0;
    listMem.style.transform = "scale(.5) translateY(50px)";
    c.focus();
    setTimeout(() => listMem.style.display = "none",200);
}

document.getElementsByClassName("slot")[0].onmousedown = function() {
    document.getElementById("toolbartip").style.display = "none";
    if(listMem.style.display != "none") listMem.hide();
    if(listIO.style.display == "none") listIO.show();
    else listIO.hide();
}

document.getElementsByClassName("slot")[0].onmouseup = function() {
    document.getElementsByClassName("slot")[0].focus();
}

document.getElementById("listIO").onblur = function() {
    listIO.hide();
}

document.getElementsByClassName("slot")[1].onmousedown = function() {
    document.getElementById("toolbartip").style.display = "none";
    if(listIO.style.display != "none") listIO.hide();
    if(listMem.style.display == "none") listMem.show();
    else listMem.hide();
}

document.getElementsByClassName("slot")[1].onmouseup = function() {
    document.getElementsByClassName("slot")[1].focus();
}

document.getElementById("listMem").onblur = function() {
    listMem.hide();
}


let listItems = document.getElementById("listIO").children;
for(let i = 0; i < listItems.length; ++i) {
    listItems[i].onmouseenter = function() { this.style.background = "#222" };
    listItems[i].onmouseleave = function() { this.style.background = "#111" };
    listItems[i].onmouseup = function() { this.onclick() };
}
listItems = document.getElementById("listMem").children;
for(let i = 0; i < listItems.length; ++i) {
    listItems[i].onmouseenter = function() { this.style.background = "#222" };
    listItems[i].onmouseleave = function() { this.style.background = "#111" };
    listItems[i].onmouseup = function() { this.onclick() };
}

