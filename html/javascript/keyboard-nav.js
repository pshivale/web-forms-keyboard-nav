var KEY_RIGHT = 39;
var KEY_UP = 38;
var KEY_LEFT = 37;
var KEY_DOWN = 40;
var FIELD_TYPES = 'input, textarea, button'; //don't include dropdowns, radio btns as they have thier own behaviour with arrow keys
var MARGIN = 10;

$(function(){
	$(FIELD_TYPES).on('keydown', processKeyDown);
});

function processKeyDown(event){
	var source = event.target || event.srcElement;
	var left = $(source).offset().left
	var top = $(source).offset().top
	console.log(left, top);
	var compareTop, compareLeft, sortOn;
	if(event.keyCode == KEY_RIGHT){
		if(allowNavigation(source, 'right')){
			compareTop = isTopSame;
			compareLeft = isOnRight;
			sortOn = compareLeft;
			focusElement(source, compareTop, compareLeft, sortOn);	
		}
	}else if(event.keyCode == KEY_LEFT){
		if(allowNavigation(source, 'left')){
			compareTop = isTopSame;
			compareLeft = isOnLeft;
			sortOn = compareLeft;
			focusElement(source, compareTop, compareLeft, sortOn);
		}
	}else if(event.keyCode == KEY_DOWN){
		compareTop = isDown;
		compareLeft = isLeftSame;
		sortOn = compareTop;
		focusElement(source, compareTop, compareLeft, sortOn);
	}else if(event.keyCode == KEY_UP){
		compareTop = isUp;
		compareLeft = isLeftSame;
		sortOn = compareTop;
		focusElement(source, compareTop, compareLeft, sortOn);
	}
	
}
function focusElement(source, compareTop, compareLeft, sortOn){
	var element = getElement(source, compareTop, compareLeft, sortOn);
	$(element).focus();
}
function getElement(source, compareTop, compareLeft, sortOn){
	var candidates = [];
	$(FIELD_TYPES).each(function(){
		console.log(this.id);
		console.log($(this).offset().top, $(this).offset().left);
		if(compareTop(this, source) && compareLeft(this, source)){
			candidates.push(this);
		}
	});
	$(candidates).each(function(){
		console.log(this.id);
	});
	return $(candidates).sort(sortOn).first();
}
function isOnRight(a, b){
	return $(a).offset().left > $(b).offset().left;
}
function isOnLeft(a, b){
	return $(a).offset().left < $(b).offset().left;
}
function isDown(a, b){
	return $(a).offset().top > $(b).offset().top;
}
function isUp(a, b){
	return $(a).offset().top < $(b).offset().top;
}
function isTopSame(a, b){
	return Math.abs($(a).offset().top - $(b).offset().top) <= MARGIN;	
}
function isLeftSame(a, b){
	return Math.abs($(a).offset().left - $(b).offset().left) <= MARGIN;	
}
function allowNavigation(source, direction){
	if($(source).is("input:checkbox")) return true;
	var cursorPos = doGetCaretPosition(source);
	var length = $(source).val().length;
	console.log("cursorPos and length = ", cursorPos, length);
	if(direction=='right' && cursorPos == length) return true;
	if(direction=='left' && cursorPos == 0) return true;
	return false;
}
/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
*/
function doGetCaretPosition (oField) {
	var iCaretPos = 0;
    try{
	  	// IE Support
		if (document.selection) {
		    // Set focus on the element
		    oField.focus ();

		    // To get cursor position, get empty selection range
		    var oSel = document.selection.createRange ();

		    // Move selection start to 0 position
		    oSel.moveStart ('character', -oField.value.length);

		    // The caret position is selection length
		    iCaretPos = oSel.text.length;
		}
		// Firefox support
		else if (oField.selectionStart || oField.selectionStart == '0'){
			iCaretPos = oField.selectionStart;
		}
	}catch(error){
		iCaretPos = 0;
	}
  	return (iCaretPos);
}