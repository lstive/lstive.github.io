let open = document.getElementById("open");
let navbar = document.getElementById("navbar");
let isOpen = false;

open.addEventListener("click", event => {
    if(isOpen){
	navbar.style.height = "50px";
	isOpen = false;
    }else{
	navbar.style.height = "230px";
	isOpen = true;
    }
});
