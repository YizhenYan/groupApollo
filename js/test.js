
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

var randomHexGenerator = function(){
        return '#'+'0123456789abcdef'.split('').map(function(v,i,a){
            return i>5 ? null : a[Math.floor(Math.random()*16)] }).join('')
    };

//build a new picture object, if a url is a parameter
//it will use that picture, if not it will use the default pic.
newPictureObj = function(urlDrop){
var picObj = new Image();
var picRect = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: 210,
	height:210,
	fill: 'white',
	stroke:'black',
	strokeWidth: 1
});
var picGroup = new Kinetic.Group({
	x:300,
	y:300,
	draggable:true
});
var headerText = new Kinetic.Text({
	x:0,
	y:-23,
	text:'New Picture',
	fontSize:26,
	fill:'black',
	fontFamily:'Lusitana'
});


//return function(headerText,picGroup,picRect,picObj){

headerText.on('dblclick',function(evt){
	var textName=this;
var temp=headerText.getText();
writeMessage(messageLayer, temp);
headerText.setFill(randomHexGenerator());
headerText.setText(randomHexGenerator());
layer.draw();
$('#nameEdit').attr('value',temp);
//$('#nameEditDialog').show();
//headerText.on('dblclick',function(evt){
//var filledIn=$('#nameEdit').val();	
headerText.setText(prompt('New Text:'));
//$('#nameEditDialog').hide();
layer.draw();
});
//	$('#nameEditDialog').keypress(function(e){
//	if(e.which === 13){
//var filledIn=$('#nameEdit').val();
//writeMessage(messageLayer, filledIn);
//headerText.setText(filledIn);
//headerText.setFill(randomHexGenerator());
//layer.draw();

//	$('#nameEditDialog').hide();
//	}
//});
//});





picObj.onload = function(){
	var picSquare = new Kinetic.Image({
		x:5,
		y:5,
		height:200,
		width:200,
		image:picObj
	});
	//headerText.setText('test');
	picSquare.on('dblclick',function(evt){
writeMessage(messageLayer, 'DBL click group');
var dx=(picGroup.getAbsolutePosition().x)-20;
//writeMessage(messageLayer, dx);
var dy=(picGroup.getAbsolutePosition().y)+20;
//writeMessage(messageLayer, dy);
var imgx=picObj.width+40;
var imgy=picObj.height+100;
writeMessage(messageLayer, imgy);
$('#imageDialog').css('left',dx);
$('#imageDialog').css('top',dy);
$('#pic').attr('src',picObj.src);
$('#imageDialog').css('width',imgx);
$('#imageDialog').css('height',imgy);
$("#imageDialog").toggle();
});
	picGroup.add(picRect);
	picGroup.add(headerText);
	picGroup.add(picSquare);
	layer.add(picGroup);
	layer.draw();
}
if (urlDrop===undefined)
picObj.src="images/default.jpg";
else
picObj.src=urlDrop;
//}(headerText,picGroup,picRect,picObj);
//return picGroup;
};


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
$('#imageDialog').dblclick(function(e){
	$('#imageDialog').fadeToggle();
});

//add drag-drop listener to canvas
stage.getContainer().addEventListener("dragover", function (evt) {
evt.preventDefault();
}, false);


//Drag and drop an image onto the canvas from the desktop
//calls newPictureObj with the url to build object
stage.getContainer().addEventListener("drop", function (evt) {
var files = evt.dataTransfer.files;
if (files.length > 0) {
var file = files[0];
if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
var reader = new FileReader();
reader.onload = function (evt) {
newPictureObj(evt.target.result);
};
reader.readAsDataURL(file);
}
}
evt.preventDefault();
}, false); 




var an=new newPictureObj(undefined);
var pm=new newPictureObj(undefined);



//handle for image src name
imageObj.src = "images/chaland.jpg";

	
