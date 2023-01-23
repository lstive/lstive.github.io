let nodes = document.getElementById('hero').childNodes;

// firefox
if(nodes[0].nodeName == '#text'){
	nodes = nodes[1];
	nodes = nodes.childNodes;
}else{
	nodes = nodes.childNodes;
}

// animacion
let i = 0;
let cur = false;
function write(){
	if(i < nodes.length){
		if(nodes[i].nodeName != '#text'){
			nodes[i].style.display = 'unset';
			if(cur){
				document.getElementById('cursor').style.display = 'none';
				cur = false;
			}else{
				document.getElementById('cursor').style.display = 'unset';
				cur = true;
			}
		}
		
		i++;
		setTimeout(write, 70);
		
	}

	if(i == nodes.length){
		document.getElementById('cursor').style.display = 'none';
	}
}

document.addEventListener('DOMContentLoaded', event => {
	write();
});
