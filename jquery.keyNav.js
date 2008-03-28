(function($){	
	$.keyNav = function(){
		$.keyNav.watchKeys();
		$(':input').focus(function(){ $(window).unbind('keydown',$.keyNav.keyPress);});
		$(':input').blur(function(){ $(window).keydown($.keyNav.keyPress);});
	}

	$.keyNav.watchKeys =function(){
		$(window).keydown($.keyNav.keyPress);
	}

	$.keyNav.unwatchKeys =function(){
		$(window).unbind('keydown',$.keyNav.keyPress);
	}
		
	$.keyNav.keys = {"?": 0,"backspace": 8,"tab": 9,"enter": 13,"shift": 16,"ctrl": 17,"alt": 18,"pause_break": 19,
		"caps_lock": 20,"escape": 27,"page_up": 33,"page_down": 34,"end": 35,"home": 36,"left_arrow": 37,
		"up_arrow": 38,"right_arrow": 39,"down_arrow": 40,"insert": 45,"delete": 46,"0": 48,"1": 49,"2": 50,
		"3": 51,"4": 52,"5": 53,"6": 54,"7": 55,"8": 56,"9": 57,"a": 65,"b": 66,"c": 67,"d": 68,"e": 69,"f": 70,
		"g": 71,"h": 72,"i": 73,"j": 74,"k": 75,"l": 76,"m": 77,"n": 78,"o": 79,"p": 80,"q": 81,"r": 82,"s": 83,
		"t": 84,"u": 85,"v": 86,"w": 87,"x": 88,"y": 89,"z": 90,"left_window_key": 91,"right_window_key": 92,
		"select_key": 93,"numpad_0": 96,"numpad_1": 97,"numpad_2": 98,"numpad_3": 99,"numpad 4": 100,"numpad_5": 101,
		"numpad_6": 102,"numpad_7": 103,"numpad_8": 104,"numpad_9": 105,"multiply": 106,"add": 107,"subtract": 109,
		"decimal point": 110,"divide": 111,"f1": 112,"f2": 113,"f3": 114,"f4": 115,"f5": 116,"f6": 117,"f7": 118,
		"f8": 119,"f9": 120,"f10": 121,"f11": 122,"f12": 123,"num_lock": 144,"scroll_lock": 145,"semi_colon": 186,
		";": 186,"=": 187,"equal_sign": 187,"comma": 188,",": 188,"dash": 189,".": 190,"period": 190,"forward_slash": 191,
		"/": 191,"grave_accent": 192,"open_bracket": 219,"back_slash": 220,"\\": 220,"close_braket": 221,"single_quote":222}
		
	$.keyNav.watchedCodes = {};	
	$.keyNav.tieredCodes = {};	
	//setups the initial key watching
	
	$.keyNav.keyPress = function(e){
		if($.keyNav.watchedCodes[e.keyCode] != null){
			var funs = $.keyNav.watchedCodes[e.keyCode];
			$.each(funs,function(){	this.func.call(this.scope)});
		}
		return false;
	}
	
	//use the actual key for evaluation i.e. "J" or "K" all will be downcased for non-normal keys see the table above
	//if an integer is used, it will use that for the keycode, so if you want to watch 1 you must pass "1"
	//a strings will be converted to lowercase and all spaces will be convertedto underscores
	$.fn.whenPressed = function(key,fn){
		$.keyNav.assignAction($.keyNav.parseKey(key),fn,this);
	}
	
	$.whenPressed = function(key,fn){
		$.keyNav.assignAction($.keyNav.parseKey(key),fn,document);
	}
	
	$.keyNav.parseKey = function(key){
		if(parseInt(key) >= 0){ key = parseInt(key);}
		else{ key = $.keyNav.keys[key.toLowerCase().replace(/\s/g,'_')];}
		if(key == null){ return false;}
		else{ return key;}
	}
	
	$.keyNav.isLetterKey = function(key){
		return key >= 65 && key <= 90
	}
	
	$.keyNav.isNumberKey = function(key){
		return (key >= 48 && key <= 57) || (key >= 96 && key <= 105)
	}
	
	$.keyNav.assignAction = function(key,fn, obj){
		if($.keyNav.watchedCodes[key] == null){
			$.keyNav.watchedCodes[key] = [{func:fn, scope:obj}];
		}else{
			$.keyNav.watchedCodes[key] = $.keyNav.watchedCodes[key].push({func:fn, scope:obj})
		}
	}
	
	//will look for the href of the referrer object 
	$.fn.navigateTo = function(){
		if(this.attr('href')){
			window.location = this.attr('href');
		}
	}
	
	$.fn.or = function(str){
		if(this.length > 0){
			console.log($(this))
			return $(this);
		}else{
			return this.prevObject.find(str);
		}
	}
	
	$.fn.scrollTo = function(){
		var offset = this.offset().top;
		var totalH = $('html,body')[0].scrollTop + window.innerHeight;
		if((offset + this.outerHeight()) > totalH){
			window.scrollBy(0, ((offset + this.outerHeight()) - totalH));
		}else if(offset < $('html,body')[0].scrollTop){
			$('html,body')[0].scrollTop = offset;
		}
	}
})(jQuery);