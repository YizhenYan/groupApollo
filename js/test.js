

var stage = new Kinetic.Stage({
	container: 'drawing',
	width: document.width,
	height: document.height
});

var layer = new Kinetic.Layer();
var messageLayer=new Kinetic.Layer();

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
})

group.add(rect);
group.add(simpleText);

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

$(imageDialog).dblclick(function(e){
	$(imageDialog).toggle();
})





imageObj.src = "images/chaland.jpg";

	
