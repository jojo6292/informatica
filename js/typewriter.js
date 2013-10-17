
(function($) {

	$.typewriter = function() {
	

	
	$(typestring).css('opacity', '0'); 
	
	var str = $(typestring).text();
	var n = str.split(" ");
	
	var delay = 0;

 	$(typestring).text('');
	
	//iterate over each word
	jQuery.each(n, function(index, value) {
    	$(typestring).append("<span class='word'>" + value + '&nbsp;' ); // wrap each word in a span element
    	 
	});
	//
	$(typestring).css('opacity', '1');
	//fade in each word
	$('.word').each(function(){
    	$(this).delay(delay).animate({opacity:1},800);
    	delay += 50;
	});
	}

   	})(jQuery);
             




