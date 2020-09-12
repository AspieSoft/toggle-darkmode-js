/*! https://github.com/AspieSoft/toggle-darkmode-js v1.0.0 | (c) aspiesoftweb@gmail.com */

;const DarkMode = (function($){

	const ignoreElmList = [
		'script',
		'style',
		'br',
	];

	const avoidElmList = [
		'img',
		'iframe',
		'video',
		'embed',
		'oembed',
		'object',
		'svg',
	];

	let root = $(':root');
  let body = $('body');

	let darkMode = false;
	let invertDarkToLight = false;

	$(document).ready(function(){
		$('head').append('<style>.invert-darkmode{filter: invert(1) hue-rotate(180deg);}</style>');

		root = $(':root');
		body = $('body');

		const background = body.css('background-color');
		if(!background || background === 'rgba(0, 0, 0, 0)'){
			const rootBackground = root.css('background-color');
			if(!rootBackground || rootBackground === 'rgba(0, 0, 0, 0)'){
				body.css({background: 'white', color: 'black'});
			}else{
				body.css({background: rootBackground, color: root.css('color')});
			}
		}

		function setChildBackgrounds(elm){
			elm.children().each(function(){
				const elm = $(this);
				const tagName = elm.prop('tagName');
				if(!tagName || ignoreElmList.includes(tagName.toLowerCase())){
					return;
				}
				const background = elm.css('background-color');
				if(!background || background === 'rgba(0, 0, 0, 0)'){
					elm.css('background', elm.parent().css('background-color'));
				}
				setChildBackgrounds(elm);
			});
		}
		setChildBackgrounds(body);

		const brightness = brightnessByColor(body.css('background-color'));
		if(brightness < 180){
			invertDarkToLight = true;
		}

		if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
			toggleDarkMode('dark');
		}else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
			toggleDarkMode('light');
		}

		if(window.matchMedia){
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
				if(e.matches){
					toggleDarkMode('dark');
				}
			});
			window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e){
				if(e.matches){
					toggleDarkMode('light');
				}
			});
		}

		$(body).bind('DOMSubtreeModified', function(){
			setChildBackgrounds(body);
			toggleDarkMode((!invertDarkToLight && darkMode) || (invertDarkToLight && !darkMode));
		});
	});

	function toggleDarkMode(set){
		if((!invertDarkToLight && (set === true || set === 'dark')) || (invertDarkToLight && (set === false || set === 'light'))){
			darkMode = true;
			setDarkMode();
		}else if((!invertDarkToLight && (set === false || set === 'light')) || (invertDarkToLight && (set === true || set === 'dark'))){
			darkMode = false;
			setLightMode();
		}else if(!darkMode){
			darkMode = true;
			setDarkMode();
		}else{
			darkMode = false;
			setLightMode();
		}
	}

	function brightnessByColor(color){
		if(!color || typeof color !== 'string'){return;}
		let isHEX = color.indexOf('#') == 0;
		let isRGB = color.indexOf('rgb') == 0;
		let r;
		if(isHEX){
			const hasFullSpec = color.length == 7;
			let m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
			if(m){r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16), g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16), b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);}
		}else if(isRGB){
			let m = color.match(/(\d+)/g);
			if(m){r = m[0], g = m[1], b = m[2];}
		}
		if(typeof r != "undefined"){return((r*299)+(g*587)+(b*114))/1000;}
	}

	function setDarkMode(){
		body.children().each(function(){
			const elm = $(this);
			const tagName = elm.prop('tagName').toLowerCase();
			if(!tagName || ignoreElmList.includes(tagName)){
				return;
			}
			if(avoidElmList.includes(tagName)){
				elm.addClass('invert-darkmode');
				return;
			}

			const brightness = brightnessByColor(elm.css('background-color'));

			if(brightness < 190 && brightness > 80){
				elm.addClass('invert-darkmode');
				invertInInverted(elm);
			}else{
				invertInNormal(elm);
			}
		});

		root.addClass('invert-darkmode');
	}

	function invertInNormal(elm){
		elm.children().each(function(){
			const elm = $(this);
			const tagName = elm.prop('tagName').toLowerCase();
			if(!tagName || ignoreElmList.includes(tagName)){
				return;
			}
			if(avoidElmList.includes(tagName)){
				elm.addClass('invert-darkmode');
				return;
			}

			const brightness = brightnessByColor(elm.css('background-color'));

			if(brightness < 190 && brightness > 80){
				elm.addClass('invert-darkmode');
				invertInInverted(elm);
			}else{
				invertInNormal(elm);
			}
		});
	}

	function invertInInverted(elm){
		elm.children().each(function(){
			const elm = $(this);
			const tagName = elm.prop('tagName').toLowerCase();
			if(!tagName || ignoreElmList.includes(tagName)){
				return;
			}
			if(avoidElmList.includes(tagName)){
				return;
			}

			const brightness = brightnessByColor(elm.css('background-color'));

			if(brightness < 190 && brightness > 80){
				invertInInverted(elm);
			}else{
				elm.addClass('invert-darkmode');
				invertInNormal(elm);
			}
		});
	}

	function setLightMode(){
		body.children().each(function(){
			const elm = $(this);
			if(elm.prop('tagName')){
				elm.removeClass('invert-darkmode');
				removeInvert(elm);
			}
		});

		root.removeClass('invert-darkmode');
	}

	function removeInvert(elm){
		elm.children().each(function(){
			const elm = $(this);
			if(elm.prop('tagName')){
				elm.removeClass('invert-darkmode');
				removeInvert(elm);
			}
		});
  }
  
	return {
		toggle: toggleDarkMode,
		ignore: function(list){
			if(!Array.isArray(list)){
				ignoreElmList.push(list);
			}else{
				ignoreElmList.concat(list);
			}
		},
		invert: function(list){
			if(!Array.isArray(list)){
				avoidElmList.push(list);
			}else{
				avoidElmList.concat(list);
			}
		},
	};
})(jQuery);
