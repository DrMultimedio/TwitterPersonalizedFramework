
var x = 0 ;
var y = -80; 
var c;
var ctx ;
var img ;
var border;
var size = 2; 
genearAllowed = false;

function generar (){
	genearAllowed = true;
	update();
} 
function update (){
	if(genearAllowed){
		ctx.clearRect(0, 0, c.width, c.height);

		ctx.drawImage(img, x,y, img.width*size, img.height*size);


		ctx.drawImage(border,0,0);
	}
}
function changeBorder(id){
	border = document.getElementById("r" + id );
	update();
}
   function previewFile(){
       var preview = document.getElementById('photo'); //selects the query named img
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

	img = document.getElementById("photo");
	border = document.getElementById("r0");



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