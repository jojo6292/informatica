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
	
	$('.numnav').eq(slideNumber-1).removeClass('activeNav');
	
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
	var slideNumber = getCurrentSlide(first);
	resetAnimation(slideNumber); // reset animation when moving off slide
	$('.numnav').eq(slideNumber-1).removeClass('activeNav');
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
	var slideNumber = getCurrentSlide(current);
	resetAnimation(slideNumber);
	$('.numnav').eq(slideNumber-1).removeClass('activeNav');
	
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

// swipe right to navigate (tablet)
$("#container").on("swiperight",function(){ // move left
	current = $( "ul li:first" ); 
	var slideNumber = getCurrentSlide(current);
	resetAnimation(slideNumber);
	$('.numnav').eq(slideNumber-1).removeClass('activeNav');
	
	$('#container').css('left',-w +'px');
	var lasting = $('ul li:last-child');
	$(lasting).prependTo('ul');
	current = $( "ul li:first" ); 
	TweenMax.to("#container", 1, {css:{left:0}, onComplete:prefix});
});

// swipe left to navigate (tablet)
$("#container").on("swipeleft",function(){ // move right
	TweenMax.to("#container", 1, {css:{left:-w+"px"}, onComplete:suffix});
	
	var first = $('ul li:first');
	var slideNumber = getCurrentSlide(first);
	resetAnimation(slideNumber); // reset animation when moving off slide
	$('.numnav').eq(slideNumber-1).removeClass('activeNav');
});

// plays animation on the current slide
function playAnimation(slideNumber) {	
	switch (slideNumber) {
		case '2':
			tl_2.play();
			break;
		case '14':
			tl_14.play();
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
			break;
		case '14':
			tl_14.reverse();
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

// updating the current page number displayed
function updatePagination(){
//	$('.pageNav').html(getCurrentSlide());
	$('.numnav').eq(getCurrentSlide()-1).addClass('activeNav');
}


$('#reveal_one').bind('click' , rev_one);
$('#reveal_two').bind('click' , rev_two);
$('#reveal_three').bind('click' , rev_three);
$('#reveal_four').bind('click' , rev_four);

function rev_one(){
	$('.R_one').css('background-color','white');
	$('.R_one').css('color','#d62631');
	$('.R_one').css('font-size', 20+'px');
	$( ".R_one" ).removeClass( "reveal" ).addClass( "revealed" );

	$('.R_one').html('<span style="text-align:center; padding-top:10px;">Right-time data delivery</span>');
	$('#reveal_one').unbind('click' , rev_one);
	$('#reveal_one').bind('click' , rev_one_revert);
	
}

function rev_one_revert(){
	$('.R_one').css('background-color','#d62631');
	$('.R_one').css('color','white');
	$('.R_one').css('font-size', 12+'px');
	$('.R_one').html('<span class="bold">Self-managed persistency</span><br/>Support any latency mode with automated storage, and reduce transactional system overhead by accessing data sources only once.<br/><br/>');
	$( ".R_one" ).removeClass( "revealed" ).addClass( "reveal" );

	$('#reveal_one').bind('click' , rev_one);
	$('#reveal_one').unbind('click' , rev_one_revert);
	
}
function rev_two(){
	$('.R_two').css('background-color','white');
	$('.R_two').css('color','#d62631');
	$('.R_two').css('font-size', 20+'px');
	$( ".R_two" ).removeClass( "reveal" ).addClass( "revealed" );

	$('.R_two').html('<span>Trusted data for all</span>');
	$('#reveal_two').unbind('click' , rev_two);
	$('#reveal_two').bind('click' , rev_two_revert);
	
}

function rev_two_revert(){
	$('.R_two').css('background-color','#d62631');
	$('.R_two').css('color','white');
	$('.R_two').css('font-size', 12+'px');
	$('.R_two').html('<span class="bold">Complete data management</span><br/>Regain trust in your data, and promote data reuse through customizable subscription data catalogs.<br/><br/>');
	$( ".R_two" ).removeClass( "revealed" ).addClass( "reveal" );

	$('#reveal_two').bind('click' , rev_two);
	$('#reveal_two').unbind('click' , rev_two_revert);
	
}

function rev_three(){
	$('.R_three').css('background-color','white');
	$('.R_three').css('color','#d62631');
	$('.R_three').css('font-size', 20+'px');
	$( ".R_three" ).removeClass( "reveal" ).addClass( "revealed_three" );
	console.log('fiuck///')
	$('.R_three').html('<span>Untangle the hairball<br/>decouple your applications</span>');
	$('#reveal_three').unbind('click' , rev_three);
	$('#reveal_three').bind('click' , rev_three_revert);
	
}

function rev_three_revert(){
	$('.R_three').css('background-color','#d62631');
	$('.R_three').css('color','white');
	$('.R_three').css('font-size', 12+'px');
	$('.R_three').html('<span class="bold">Efficient interaction management</span><br/>Reduce application interdependence through "publish and subscribe" integration. Add, change, or retire systems with ease.<br/><br/>');
	$( ".R_three" ).removeClass( "revealed_three" ).addClass( "reveal" );

	$('#reveal_three').bind('click' , rev_three);
	$('#reveal_three').unbind('click' , rev_three_revert);
	
}

function rev_four(){
	$('.R_four').css('background-color','white');
	$('.R_four').css('color','#d62631');
	$('.R_four').css('font-size', 20+'px');
	$( ".R_four" ).removeClass( "reveal" ).addClass( "revealed" );

	$('.R_four').html("<span>See what you're missing</span>");
	$('#reveal_four').unbind('click' , rev_four);
	$('#reveal_four').bind('click' , rev_four_revert);
	
}

function rev_four_revert(){
	$('.R_four').css('background-color','#d62631');
	$('.R_four').css('color','white');
	$('.R_four').css('font-size', 12+'px');
	$('.R_four').html('<span class="bold">Complete data management</span><br/>Regain trust in your data, and promote data reuse through customizable subscription data catalogs.<br/><br/>');
	$( ".R_four" ).removeClass( "revealed" ).addClass( "reveal" );

	$('#reveal_four').bind('click' , rev_four);
	$('#reveal_four').unbind('click' , rev_four_revert);
	
}


}); 
