
var x = 0 ;
var y = -80; 
var c;
var ctx ;
var updatedImg ;
var staticIMG;
var size = 2; 
generarAllowed = false; //variable para ver si podemos generar o no la imagen. Previene que la imagen cargue sin darle al botón
var SaveOriginalOffsetonce = false; //variable para guardar el offset original solo una vez
var OriginaloffsetX; //variable para el control del ratón
var OriginaloffsetY; //variable para el control del ratón
var swapped;
function generar (){
	generarAllowed = true;
	update();
} 
function swap (){
	aux = updatedImg;
	updatedImg = staticIMG;
	staticIMG = aux;
	if(!swapped){
			document.getElementById("buttonSwap").innerHTML = "Mover imagen";
			swapped = true;
		}		
	else{
			document.getElementById("buttonSwap").innerHTML = "Mover gorro";
			swapped = false;
		}
}
function update (){
	if(generarAllowed){
		ctx.clearRect(0, 0, c.width, c.height);

		ctx.drawImage(updatedImg, x,y, updatedImg.width*size, updatedImg.height*size);


		ctx.drawImage(staticIMG,0,0);
	}
}
function changestaticIMG(id){
	staticIMG = document.getElementById("r" + id );
	update();
}
   function previewFile(){
       var preview = document.getElementById('photo'); //selects the query named updatedImg
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
          update();

       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL

       } else {
           preview.src = "";

       }
  }
window.onload = function(){

	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	sliderX = document.getElementById("rangeX");
	sliderY = document.getElementById("rangeY");
	sliderSize = document.getElementById("rangeSize");

	updatedImg = document.getElementById("photo");
	staticIMG = document.getElementById("r0");


	c.addEventListener("mousedown",mousedown);

	//controladores de los sliders
	sliderX.oninput = function() {
	  x = this.value;
	  update();

	}
	sliderY.oninput = function() {
	  y = this.value;
	  update();

	}
	sliderSize.oninput = function() {
	  size = this.value /100;
	  update();

	}
}

function mousedown(e){
	//alert("mousedown");
	drag = true; 
	c.addEventListener("mousemove",mousemove); //start dragging
    c.addEventListener("mouseup",mouseup);
	once = false;

}

function mousemove(e) {
	console.log("moving " );
	if(!once){
		 OriginaloffsetX = e.offsetX;
		 OriginaloffsetY = e.offsetY; 
		once = true; 
	}
	var movementX = OriginaloffsetX - e.offsetX;
	var movementY = OriginaloffsetY - e.offsetY;
	x = x - movementX/10;
	y = y - movementY/10;
    update();

	//console.log ("X: " + movementX + " Y: " + movementY);
	//console.log(e);
}
function mouseup(e) {
	drag = false;
	c.removeEventListener("mouseup",mouseup);
	c.removeEventListener("mousemove",mousemove);

}