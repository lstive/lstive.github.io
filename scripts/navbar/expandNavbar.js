let navbar = document.getElementById("navbar");
let open = false;

document.getElementById("expand-nav").addEventListener("click", event => {
    let id = 0;

    if (open) {
        open = false;
        navbar.childNodes.forEach(el => {
            if (el.nodeName == "DIV") {
                el.style.visibility = "hidden";
            }
        });
    } else {
        open = true;

        console.log(navbar.childNodes);
        navbar.childNodes.forEach(el => {
            if (el.nodeName == "DIV") {
                el.style.visibility = "visible";
            }
        });
    }

    document.getElementById("button-hide").style.visibility = "visible";
});