// tiempo
let delta = 0;
let time = 0;

// objetos

// loop
function animate(newTime){
	
	
	requestAnimationFrame(newTime => animate(newTime));
}
requestAnimationFrame(animate);
