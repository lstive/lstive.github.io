let habs = document.querySelectorAll("div[id$='value']");
habs.forEach(node => {
    node.style.width = "0%";
});

// evento
window.addEventListener("scroll", event => {
    if(window.pageYOffset + 150 > document.getElementById("content").offsetTop){
	for(let i = 0; i < habs.length; i++){
	    habs[i].style.width = habs[i].textContent;
	}
    }
});





