var pfFocus = '1px solid #000';
var pfUnfocus = '1px solid red';
var pfFocusBG = '#ffc';
var pfEmail = /^[\w\.=-]+\@[\w\.-]+\.[a-z]{2,4}$/;
var pfInvalidFields = 0;
var pfAscending = true;
var pfCol = 0;

function getName () {
	var sName = prompt("Enter your name:", "");
	if (!sName || sName.length == 0)
		throw new Error ("Name was not in a permitted form");
	alert("You entered: " + sName);
}
function testException() {
	try {
		getName();
	}
	catch(e) {
		alert(e.name + ": " + e.message);
	}
}
window.onload = testException;

function initFormElements(sValidElems) {
	var inputElems = document.getElementsByTagName('textarea');
	for (var i = 0; i < inputElems.length; i++) {
		pfContent.EVENTS.addEventHandler(inputElems[i], 'focus', highlightFormElement, false);
		pfContent.EVENTS.addEventHandler(inputElems[i], 'blur', unHighlightFormElement, false);
	}
	// input elements
	inputElems = document.getElementsByTagName('input');
	for (var i = 0; i < inputElems.length; i++) {
		if (sValidElems.indexOf(inputElems[i].getAttribute('type')) != -1) {
			pfContent.EVENTS.addEventHandler(inputElems[i], 'focus', highlightFormElement, false);
			pfContent.EVENTS.addEventHandler(inputElems[i], 'blur', unHighlightFormElement, false);
		}
	}
	// reset and submit handlers
	pfContent.EVENTS.addEventHandler(document.getElementById('formShirts'), 'reset', function() {
		document.getElementsByTagName('input')[0].focus();
		for (var i = 0; i < document.getElementsByTagName('label').length; i++)
			document.getElementsByTagName('label')[i].className = 'required';
	}, false);
	pfContent.EVENTS.addEventHandler(document.getElementById('formShirts'), 'submit', validateAllFields, false);
	// default focus handler
	document.getElementsByTagName('input')[0].focus();
	// event handlers for validation
	pfContent.EVENTS.addEventHandler(document.forms[0].subject, 'blur', validateSubject, false);
	pfContent.EVENTS.addEventHandler(document.forms[0].address, 'blur', validateAddress, false);
	pfContent.EVENTS.addEventHandler(document.forms[0].message, 'blur', validateMessage, false);
}

function getLabelById(idStr) {
	var formLabels = document.getElementsByTagName('label');
	var attrName = window.event ? 'htmlFor' : 'for';
	for (var i = 0; i < formLabels.length; i++) {
		if (formLabels[i].getAttribute(attrName) == isStr)
			return formLabels[i];
	}
	return null;
}

function highlightFormElements(e) {
	var elem = ptContent.EVENTS.getEventTarget(e);
	if (elem != null) {
		elem.style.border = pfFocus;
		elem.style.backgroundColor = pfFocusBG;
	}
}

function unHighlightFormElement(e) {
	var elem = ptContent.EVENTS.getEventTarget(e);
	if (elem != null) {
		elem.style.border = pfUnfocus;
		elem.style.backgroundColor = '';
	}
}
function validateSubject() {
	var formField = document.getElementById('subject');
	var ok = (formField.value.length != 0 && pfSubject.test(formField.value));
	var theLabel = getLabelById('subject');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = 'validated';
		}
		else
			theLabel.className = 'invalid';
			
	}
	return ok;
}
function validateEmail() {
	var formField = document.getElementById('address');
	var ok = (formField.value.length != 0 && pfEmail.test(formField.value));
	var theLabel = getLabelById('address');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = 'validated';
		}
		else
			theLabel.className = 'invalid';
			
	}
	return ok;
}
function validateMessage() {
	var formField = document.getElementById('message');
	var ok = (formField.value.length != 0 && pfMessage.test(formField.value));
	var theLabel = getLabelById('message');
	if (theLabel != null) {
		if (ok) {
			theLabel.className = 'validated';
		}
		else
			theLabel.className = 'invalid';
			
	}
	return ok;
}

function validateAllFields(e) {
	// make sure all the functions execute
	var bOK = validateSubject();
	bOK &= validateAddress();
	bOK &= validateMessage();
	
	if (!bOK) {
		alert('Fields are required!');
		pfContent.EVENTS.preventDefault(e);
		
	}
}

function() {
	//Selecting node
	var myNode = document.querySelector('#groupSID .singleSID ul');
	
	myNode.addEventListener("click", function(e) {
		if(e.target.tagName === 'IMG') {
			var greyBG = document.createElement('div'); 
			greyBG.id = 'overlay';
			document.body.appendChild(greyBG);
			
			//set up overlay styles
			greyBG.style.position = 'absolute';
			greyBG.style.top = 0;
			greyBG.style.backgroundColor = 'rgba(0,0,0,0.7)';
			greyBG.style.cursor = 'pointer';
			
			//resize and position overlay
			greyBG.style.width = window.innerWidth + 'px';
			greyBG.style.height = window.innerHeight + 'px';
			greyBG.style.top = window.pageYOffset + 'px';
			greyBG.style.left = window.pageXOffset + 'px';
			
			//create image element
			var imageSrc = e.target.src;
			var largeImage = document.createElement('img');
			largeImage.id = 'largeImage';
			largeImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';
			largeImage.style.display = 'block';
			largeImage.style.position = 'absolute';
			
			//wait until the image has loaded
			largeImage.addEventListener('load', function() {
				
				//resize if taller
				if (this.height > window.innerHeight) {
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * his.ratio;
				}
				//resize if wider
				if (this.width > window.innerWidth) {
					this.ratio = window.innerWidth / this.width;
					this.width = this.width * this.ratio;
					this.width = this.width * his.ratio;
				}
				
				centerImage(this);
				greyBG.appendChild(largeImage);
				
			}); //image has loaded
			
			largeImage.addEventListener('click', function() {
				if (greyBG) {
					greyBG.parentNode.removeChild(greyBG);
				}
			}, false)
			
			window.addEventListener('scroll', function() {
				if (greyBG) {
					greyBG.style.top = window.pageYOffset + 'px';
					greyBG.style.left = window.pageXOffset + 'px';
				}
			}, false)
			
		} //target is an image
		
	}, false); //image is clicked
	
	function centerImage(theImage) {
		var myDifX = (window.innerWidth - theImage.width)/2;
		var myDifY = (window.innerHeight - theImage.height)/2;
	
	theImage.style.top = myDifY + 'px';
	theImage.style.left = myDifX + 'px';
	
	return theImage;
	
	}
}
window.onload = function() {
	$('#accordian').accordian();
}

function sortCallBack(a,b) {
	//child node of each TR for the column to sort
	var col1 = a.getElementsByTagName('TD')[pfCol];
	var col2 = b.getElementsByTagName('TD')[pfCol];
	
	//text node for each column
	var text1 = col1.firstChild.data;
	var text2 = col2.firstChild.data;
	
	//text nodes sorting
	if (text1 < text2)
		return pfAscending ? -1 : 1;
	else if (text1 > text2)
		return pfAscending ? 1 : -1;
	else return 0;
}

function insertSortControls() {
	var pfLink;
	pfLink = document.getElementById('ItemDescend');
	pfLink.removeAttribute('href');
	pfContent.EVENTS.addEventHandler(pfLink, 'click', function() { sortTable('theList', 0, true) }, false);
	pfLink = document.getElementById('ItemAscend');
	pfLink.removeAttribute('href');
	pfContent.EVENTS.addEventHandler(pfLink, 'click', function() { sortTable('theList', 0, false) }, false);
	pfLink = document.getElementById('PriceDescend');
	pfLink.removeAttribute('href');
	pfContent.EVENTS.addEventHandler(pfLink, 'click', function() { sortTable('theList', 1, true) }, false);
	pfLink = document.getElementById('PriceAscend');
	pfLink.removeAttribute('href');
	pfContent.EVENTS.addEventHandler(pfLink, 'click', function() { sortTable('theList', 1, false) }, false);
}

function sortTable(whichTable, whichCol, sortDir) {
	var pfTable = document.getElementById('whichTable');
	var pfTBody = pfTable.getElementsByTagName('TBODY')[0];
	var pfTRows = pfTBody.getElementByTagName('TR');
	var numRows = pfTRows.length;
	
	pfAscending = sortDir;
	pfCol = whichCol;
	
	var theSortedRows = new Array(numRows);
	
	var i;
	for (i = 0; i < numRows; i++) {
		theSortedRows[i] = pfRows[i].cloneNode(true);
	}
	
	theSortedRows.sort(sortCallBack);
	pfTable.removeChild(pfBody);
	pfBody = document.createElement('TBODY');
	pfTable.appendChild(pfBody);
	for (i = 0; i < numRows; i++) {
		pfBody.appendChild(theSortedRows[i]);
	}
}

pfContent.EVENTS.addEventHandler(window, 'load', function() {
	initFormElements('text');
	insertSortControls();
}, false);
