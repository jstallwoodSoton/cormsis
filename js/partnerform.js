function changeIconClass(icon, cn, altcn) {
    if(icon.className === cn) { icon.className = altcn; }
    else { icon.className = cn; }
}

function submit() {
    setTimeout(() => {
        document.location.href = "thanks.html";
    }, 500);
}

document.changeIconClass = changeIconClass;
document.submit = submit;