let divisorNodes = document.getElementById("divisor").childNodes;
let circles = [];
let i = 0;

// obteniendo los nodos circulo
divisorNodes.forEach(node => {
    console.log(node.nodeName);
    if(node.nodeName != "#text"){
	circles[i] = node;
	i++;
    }
});

let width = window.innerWidth / 12;
document.getElementById("divisor").style.height = width / 2 + "px";
let widthOffset = 0;
let startTop = 0;
document.getElementById("content").style.marginTop = width / 2 + "px";

// auto ajustar al cambiar de tamano la ventana

i = 0;
circles.forEach(node => {
    node.style.width = width  + "px";
    node.style.height = width  + "px";
    node.style.left = startTop + "px";

    startTop += width;
    i++;
});

let delta = 0;
let time = 0;
let xOffset = 0;
let tempNode = null;

// dibujado
function draw(newTime){
    delta = newTime - time;

    if(!isNaN(delta)){
	circles.forEach(node => {
	    let x = node.offsetLeft;
	    node.style.left = x - 0.04 * delta + "px";
	})

	// detectando offset
	circles.forEach(node => {
	    if(node.offsetLeft < -width){
		node.style.left = window.innerWidth + width + "px";
	    }
	})
    }

    time = newTime;
    requestAnimationFrame(newTime => draw(newTime));
}

requestAnimationFrame(draw);
