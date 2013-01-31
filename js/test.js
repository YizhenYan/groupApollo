
//where all the layers are held
var stage = new Kinetic.Stage({
	container: 'drawing',
	width: document.width,
	height: document.height
});

//layer for our obj
var layer = new Kinetic.Layer();
//layer for our messages
var messageLayer=new Kinetic.Layer();

//test your output with this command
 function writeMessage(messageLayer, message) {
        var context = messageLayer.getContext();
        messageLayer.clear();
        context.font = '18pt Lusitana';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }

var rect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: 210,
	height:210,
	fill: 'white',
	stroke:'black',
	strokeWidth: 1
});



var imageObj= new Image();
var group = new Kinetic.Group({
	x:100,
	y:100,
	draggable:true
});

var simpleText= new Kinetic.Text({
	x:0,
	y:-23,
	text:'Chaland',
	fontSize:26,
	fill: 'black',
	fontFamily:'Lusitana'
});



group.add(rect);
group.add(simpleText);

//function runs after image has loaded
//creates grouped object with image, text and rect
//then adds to layer and then the stage
imageObj.onload = function(){
	var chaland = new Kinetic.Image({
		x:5,
		y:5,
		height:200,
		width:200,
		image:imageObj
	})
	group.on('dblclick',function(evt){
writeMessage(messageLayer, 'DBL click group');
var dx=(group.getAbsolutePosition().x)-20;
//writeMessage(messageLayer, dx);
var dy=(group.getAbsolutePosition().y)+20;
//writeMessage(messageLayer, dy);
var imgx=imageObj.width+40;
var imgy=imageObj.height+100;
writeMessage(messageLayer, imgy);
$('#imageDialog').css('left',dx);
$('#imageDialog').css('top',dy);
$('#pic').attr('src',imageObj.src);
$('#imageDialog').css('width',imgx);
$('#imageDialog').css('height',imgy);
$("#imageDialog").toggle();
});
	group.add(chaland);
	layer.add(group);
	layer.draw();	
	stage.add(layer);
	stage.add(messageLayer);
};

//close image dialog window
$(imageDialog).dblclick(function(e){
	$(imageDialog).toggle();
})

//add drag-drop listener to canvas
stage.getContainer().addEventListener("dragover", function (evt) {
evt.preventDefault();
}, false);


//Drag and drop an image onto the canvas from the desktop
var dropPic=new Image();
stage.getContainer().addEventListener("drop", function (evt) {
var files = evt.dataTransfer.files;
if (files.length > 0) {
var file = files[0];
if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
var reader = new FileReader();
reader.onload = function (evt) {
dropPic.src = evt.target.result;
var dropped = new Kinetic.Image({
	x:500,
	y:500,
	height:200,
	width:200,
	image:dropPic,
	draggable:true
});
layer.add(dropped);
layer.draw();
};
reader.readAsDataURL(file);
}
}
evt.preventDefault();
}, false); 


//handle for image src name
imageObj.src = "images/chaland.jpg";

	
