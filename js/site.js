$(document).ready(function() {

var bgSlides = $("ul li");

$.each( bgSlides, function() {
	var bgcolor = $(this).data("bg");
  	$(this).css( "background-color" , bgcolor );
});

// initial load
$('body').css('overflow','hidden');
var h = $(window).height();
var w = $(window).width();
$('body').css('overflow','visible');

var current = $( "ul li:first" ); 
var next = $( "ul li:nth-child(2)" );
var last = $( "ul li:last-child" );
var color = $( current ).css( "background-color" );

$('.bg').css('height',h+'px');
$('.bg').css('width',w+'px');

$('#container').css('width',w*3+'px');
$('#masker').css('height',h+'px');

// slide animations
var tl = new TimelineLite;

var tl_2 = new TimelineLite;
//tl_2.to("#circleAn", 1, {css:{left:200}});
tl_2.pause();

var tl_14 = new TimelineLite;
tl_14.to('#DIHscale', 1, {opacity:1,scaleX:48, scaleY:48});
tl_14.pause();

// resize window
$(window).resize(function() {
  $('body').css('overflow','hidden');
  var hresize=$(window).height(); 
  var wresize=$(window).width(); 
  $('body').css('overflow','visible');
  w = wresize;
  
  $('.bg').css('height',hresize+'px');
  $('.bg').css('width',wresize +'px');
  $('#masker').css('height', hresize+'px');
  $('#container').css('width', wresize*3+'px');
  $('#container').css('height', hresize+'px');
});

// using PREV/NEXT button navigation
$('#slide1').bind('click', animator); // go right
$('#slide2').bind('click', reanimator); // go left

// using number navigation
$('#slideNav .numnav').click(function() {
	var gotoslide = $(this).attr("href");
	gotoslide = gotoslide.replace("#",""); // changes from #X to X
	var slideNumber = getCurrentSlide();
	var variance = gotoslide-slideNumber; // number of slides to traverse
	
	if (variance > 0) {
		animatorLoop(variance);
	}
	else if (variance < 0) {
		variance *= -1;
		reanimatorLoop(variance);
	}
});

// using number navigation to move to the right from current slide
function animatorLoop(loop){
	tl.clear();
	tl.to("#container", 0.5, {css:{left:-w+"px"}, onComplete:suffix});
	tl.restart();
	
	var first = $('ul li:first');
	resetAnimation(getCurrentSlide(first)); // reset animation when moving off slide
	
	for (var i = 1; i < loop; i++) {
		var first = $('ul li:first');
		$(first).appendTo('ul');
		current = $( "ul li:first" ); 
		next = $( "ul li:nth-child(2)" );
		last = $( "ul li:last-child" );
		color = $( current ).css( "background-color" );
	}
}

// using number navigation to move to the left from current slide
function reanimatorLoop(loop){
	current = $( "ul li:first" ); 
	resetAnimation(getCurrentSlide(current)); // reset animation when moving off slide
	for (var i = 1; i <= loop; i++) {	
		var lasting = $('ul li:last-child');
		$(lasting).prependTo('ul');
		current = $( "ul li:first" ); 
		next = $( "ul li:nth-child(2)" );
		last = $( "ul li:last-child" );
		color = $( current ).css( "background-color" );
	}
	$('#container').css('left',-w +'px');
	tl.clear();
	tl.to("#container", 0.5, {css:{left:0}, onComplete:prefix});
	tl.restart();
}

// using NEXT button to navigate
function animator(){
	tl.clear();
	tl.to("#container", 0.5, {css:{left:-w+"px"}, onComplete:suffix});
	tl.restart();
	var first = $('ul li:first');
	resetAnimation(getCurrentSlide(first)); // reset animation when moving off slide
}

// runs after advancing to the right
function suffix(){
	$('#container').css('left',"0px");
	var first = $('ul li:first');
	
	$(first).appendTo('ul');
	
	current = $( "ul li:first" ); 
	next = $( "ul li:nth-child(2)" );
	last = $( "ul li:last-child" );
	color = $( current ).css( "background-color" );
	
	updatePagination();
	playAnimation(getCurrentSlide());
}

// using PREV button to navigate
function reanimator(){
	current = $( "ul li:first" ); 
	resetAnimation(getCurrentSlide(current));
	
	$('#container').css('left',-w +'px');
	var lasting = $('ul li:last-child');
	$(lasting).prependTo('ul');
	current = $( "ul li:first" ); 
	next = $( "ul li:nth-child(2)" );
	last = $( "ul li:last-child" );
	color = $( current ).css( "background-color" );
	tl.clear();
	tl.to("#container", 0.5, {css:{left:0}, onComplete:prefix});
	tl.restart();
}

// runs after moving to the left
function prefix(){
	playAnimation(getCurrentSlide());
	updatePagination();
}

// plays animation on the current slide
function playAnimation(slideNumber) {
	// update to switch case
	
	switch (slideNumber) {
		case '2':
			tl_2.play();
			console.log('slide 2 play');
			break;
		case '14':
			tl_14.play();
			console.log('slide 14 play');
			break;
		default:
			// no matching animation
	}

}

// resets animation after moving off slide
function resetAnimation(slideNumber) {
	switch (slideNumber) {
		case '2':
			tl_2.reverse();
			console.log('slide 2 reverse');
			break;
		case '14':
			tl_14.reverse();
			console.log('slide 14 reverse');
			break;
		default:
			// no matching animation
	}
}


// returns current slide number
function getCurrentSlide(){
	var slideNumber = current.data("title");
	slideNumber = slideNumber.replace("slide",""); // changes from slideY to Y
	return slideNumber;
}

// not currently used in frontend, but is for updating the current page number displayed
function updatePagination(){
	$('.pageNav').html(getCurrentSlide());
}

// swipe left/right to navigate (tablet)
$("#container").on("swiperight",function(){
	$('#container').css('left',-w +'px');
	var lasting = $('ul li:last-child');
	$(lasting).prependTo('ul');
	TweenMax.to("#container", 1, {css:{left:0, onComplete:prefix}});
});
	
$("#container").on("swipeleft",function(){
	TweenMax.to("#container", 1, {css:{left:-w+"px"}, onComplete:suffix});
});

}); 
