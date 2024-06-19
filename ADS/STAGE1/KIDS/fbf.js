

//.visible shortcut
Object.defineProperty(HTMLElement.prototype, "visible", {get: function(){return this.style.visibility != "hidden";}, set: function(visibile){this.style.visibility =  visibile ? "inherit" : "hidden";}});
Object.defineProperty(HTMLElement.prototype, "transform", {get: getTransform, set: setTransform});
Object.defineProperty(HTMLElement.prototype, "_x", {get: getX, set: setX});
Object.defineProperty(HTMLElement.prototype, "_y", {get: getY, set: setY});
Object.defineProperty(HTMLElement.prototype, "_rotation", {get: getRotation, set: setRotation});
Object.defineProperty(HTMLElement.prototype, "_scaleX", {get: getScaleX, set: getScaleX});
Object.defineProperty(HTMLElement.prototype, "_scaleY", {get: getScaleY, set: getScaleY});
HTMLElement.prototype._ = function(id){
            return this.querySelector(id);
}
HTMLElement.prototype.__ = function(id){
            return this.querySelectorAll(id);
}
function hide()
{
	for (var i = 0; i < arguments.length; i++){
		if(arguments[i].nodeType && arguments[i].nodeType == 1)	arguments[i].visible = false;
		else if(arguments[i].length)	hide.apply(null, arguments[i]);
	}
}
function show()
{
	for (var i = 0; i < arguments.length; i++){
		if(arguments[i].nodeType && arguments[i].nodeType == 1)	arguments[i].visible = true;
		else if(arguments[i].length)	show.apply(null, arguments[i]);
	}
}
function getTransform()
{
	var matrix = {a:1,b:0,c:0,d:1,tx:0,ty:0};
	var style = document.defaultView.getComputedStyle(this, null);
	var trans = style.getPropertyValue("-webkit-transform") || style.getPropertyValue("-moz-transform") || style.getPropertyValue("-ms-transform") || style.getPropertyValue("-o-transform") || style.getPropertyValue("transform") || null;
	if(trans && trans != "none")
	{
		trans = trans.substring(trans.indexOf("(")+1,trans.lastIndexOf(")"));
		var m = trans.split(",");
		matrix.a = parseFloat(m[0]);
		matrix.b = parseFloat(m[1]);
		matrix.c = parseFloat(m[2]);
		matrix.d = parseFloat(m[3]);
		matrix.tx = parseFloat(m[4]);
		matrix.ty = parseFloat(m[5]);
	}
	return matrix;
}
function decompose(matrix){
	// http://stackoverflow.com/questions/16359246/how-to-extract-position-rotation-and-scale-from-matrix-svg
        // @see https://gist.github.com/2052247
        // calculate delta transform point
        var px = dtPoint(matrix, { x: 0, y: 1 });
        var py = dtPoint(matrix, { x: 1, y: 0 });

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {
            translateX: matrix.tx,
            translateY: matrix.ty,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewY // rotation is the same as skew y NOT x?!?!
        };        
    }
function setTransform(matrix)
{
	//todo
}
function getRotation()
{
	var matrix = this.transform;
	var skewX = ((180 / Math.PI) * Math.atan2(matrix.d, matrix.c) - 90);
	var skewY = ((180 / Math.PI) * Math.atan2(matrix.b, matrix.a));
	return skewY;
}
function setRotation()
{
	//todo
}
function getX()
{
	return this.transform.tx;
}
function getY()
{
	return this.transform.ty;
}
function setX()
{
	//todo
}
function setY()
{
	//todo
}
function getScaleX()
{
	var matrix = this.transform;	
	return Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
}
function getScaleY()
{
	var matrix = this.transform;	
	return Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d);
}
function setScaleX(value)
{
	//todo
}
function setScaleY()
{
	//todo
}

function dtPoint(matrix, point){
        return { x: (point.x * matrix.a + point.y * matrix.c), y: (point.x * matrix.b + point.y * matrix.d)};
}

HTMLElement.prototype._ = function(id){
	return this.querySelector(id);
}

// loadJS
function loadJS(src, callback) {
	if (typeof src === 'string') {
    	var s = document.createElement('script');
	    s.src = src;
	    s.async = true;
	    s.onreadystatechange = s.onload = function() {
	        var state = s.readyState;
	        if (!callback[src] && (!state || /loaded|complete/.test(state))) {
	            callback[src] = true;
	            callback();
	        }
	    };
	    document.getElementsByTagName('head')[0].appendChild(s);
	}else if (src.length) {
		var count = src.length;
		for (var i = 0; i < src.length; i++) {
			loadJS(src[i], function(){
					if(--count == 0)callback();
				}
			);
		};
	}    
}
function $(id)
{
	if (arguments.length > 1)
	{
		var elements = [];
		for (var i = 0; i < arguments.length; i++)
		{
			elements.push($(arguments[i]));
		}
		return elements;
	}else{
		var element = document.getElementById(id);
		return element;
	}
}
//FOR DEBUGGING --------------------------------------------------------------------------
window.logging = false;
window.debug = false;
if(window.console && window.console.log)
{
	window.log = function()
	{
		if(this.logging)
		{	
			if(this.debug)
			{
				var mainArguments = Array.prototype.slice.call(arguments);
				var error = new Error();
				if(error.stack)
				{
					var line = new Error().stack.split('\n')[2];
					var func = line.substring(line.indexOf("at ") + 3, line.lastIndexOf("(")-1);
					line = line.substring(line.lastIndexOf("/")+1, line.lastIndexOf(")")-2);	
					mainArguments.push("\t<["+func+"()::"+line+"]>");
				}				
				Function.prototype.apply.call(console.log, console, mainArguments);
			}else{
				Function.prototype.apply.call(console.log, console, arguments);
			}
		}
	}	
}else{
	window.log = {log:function(){}};
}

//keyline addition
/*
function addKeylineTo(targetDiv,width,height,colour,thickness) 
{
	//create four divs that create a 1px border
	//lhs
	//top
	//rhs
	//bottom
	var keyline = document.createElement('div');
	keyline.className = "do";
	keyline.id = "keyline";
	keyline.style.cssText = "width:"+width+"px;height:"+height+"px;pointer-events:none;";
	//keyline.style.cssText = "position:absolute;display:block;width:'"+width+"'px;height:'"+height+"px;";
	
	var lhs		= "<div class='do' style='pointer-events:none;width:100%; height:1px; top:0px; background-color:"+colour+"'></div>";
	var top 	= "<div class='do' style='pointer-events:none;width:100%; height:1px; bottom: 0px; background-color:"+colour+"'></div>";
	var rhs 	= "<div class='do' style='pointer-events:none;width:1px; height:100%; left:0px; background-color:"+colour+"'></div>";
	var bottom	= "<div class='do' style='pointer-events:none;width:1px; height:100%; right: 0px; background-color:"+colour+"'></div>";
	
	keyline.innerHTML = lhs+top+rhs+bottom;
	
	targetDiv.appendChild(keyline); 
	return	keyline;
}*/
function addKeylineTo(targetDiv,width,height,colour,thickness) 
{
	var svgns = "http://www.w3.org/2000/svg";
	var keyline = document.createElement("div");
	keyline.className = "do";
	//keyline.style.width = width+"px";
	//keyline.style.height = height+"px";
	keyline.style.pointerEvents = "none";
	keyline.appendChild(createSVGRect(svgns, 0, 0, width, 1, 0x000));			//top
	keyline.appendChild(createSVGRect(svgns, 0, height-1, width, 1, 0x000));	//bottom
	keyline.appendChild(createSVGRect(svgns, 0, 0, 1, height, 0x000));		//left
	keyline.appendChild(createSVGRect(svgns, width-1, 0, 1, height, 0x000));	//right
	targetDiv.appendChild(keyline);
}

function createSVGRect(svgns, x, y, width, height, fill)
{
	var svg = document.createElementNS(svgns, "svg");
	svg.setAttribute('style', 'pointer-events:none;left:'+x+'px;top:'+y+'px;-moz-transform:matrix(1,0,0,1,0,0);-ms-transform:matrix(1,0,0,1,0,0);-o-transform:matrix(1,0,0,1,0,0);-webkit-transform:matrix(1,0,0,1,0,0);transform:matrix(1,0,0,1,0,0);');
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
	svg.setAttribute('class', "do");
	svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

	var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('height', height);
    rect.setAttribute('width', width);
    rect.setAttribute('fill', fill);
    rect.setAttribute('style', "pointer-events:none;");
    svg.appendChild(rect);
    return svg;
}

/*
<svg width="100" height="250" style="-moz-transform:matrix(1,0,0,1,0,0);-ms-transform:matrix(1,0,0,1,0,0);-o-transform:matrix(1,0,0,1,0,0);-webkit-transform:matrix(1,0,0,1,0,0);transform:matrix(1,0,0,1,0,0);" class="do" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs></defs>
              <g>
                <path stroke="none" fill="#000000" d="M100 0 L100 250 0 250 0 0 100 0"></path>
              </g>
            </svg>
*/
//inject divs into the html ----------------------------------------------------
function injectDiv(nameOfDiv,innerGubbings,whereToPut) 
{
	//log("injectDiv("+nameOfDiv+":"+":"+innerGubbings+":"+whereToPut+")");
	var newDIV = document.createElement('div');
	newDIV.id = nameOfDiv;
	newDIV.innerHTML = innerGubbings;
	var locationFornewDIV = whereToPut;
	locationFornewDIV.appendChild(newDIV); 
}

//check if it's iPad ------------------------------------------------------------
//var isiPad = navigator.userAgent.match(/iPad/i) != null;


