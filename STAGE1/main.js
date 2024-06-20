//SETUP
var local = window.location.protocol === "file:";

var WID = 300;			//width of unit
var HEI = 600;			//height of unit
var rich = false;

//device checker thing
var checker;

//flash detection, produces hasFlash and flashVersion
function getFlashVersion(a){var e=a.match(/[\d]+/g);return e.length=3,e.join(".")}var hasFlash=!1,flashVersion="";if(navigator.plugins&&navigator.plugins.length){var plugin=navigator.plugins["Shockwave Flash"];plugin&&(hasFlash=!0,plugin.description&&(flashVersion=getFlashVersion(plugin.description))),navigator.plugins["Shockwave Flash 2.0"]&&(hasFlash=!0,flashVersion="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var mimeType=navigator.mimeTypes["application/x-shockwave-flash"];hasFlash=mimeType&&mimeType.enabledPlugin,hasFlash&&(flashVersion=getFlashVersion(mimeType.enabledPlugin.description))}else try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");hasFlash=!0,flashVersion=getFlashVersion(ax.GetVariable("$version"))}catch(e){try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");hasFlash=!0,flashVersion="6.0.21"}catch(e){try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");hasFlash=!0,flashVersion=getFlashVersion(ax.GetVariable("$version"))}catch(e){}}}

// Tracking - DO NOT TUTCH
var ad_width = WID;
var ad_height = HEI;
var ad_campaign = "15_SKYLANDERS_SUPERCHARGES_BATTLE"; 
var ad_type = "html" + (rich ? "_polite" : "_standard");
var ad_client = "actv";
var ad_country = navigator.language;
var ad_agent = navigator.userAgent;
var ad_flash = hasFlash;
var ad_flashVersion = flashVersion;
// End Tracking

var forceMobile = false;		//use true to pretend unit is running on a device, FALSE IN PRODUCTION
var isMobile;

//  V       V  VVV   VVVVV  VVVVVV   VVV   VVVVV   VV     VVVVVV  VVVVV
//   V     V  V   V  V    V   VV    V   V  VV   V  VV     VV     VV
//    V   V  VVVVVVV VVVVV    VV   VVVVVVV VVVVV   VV     VVVV   VVVVV
//     V V   V     V V    V   VV   V     V VV   V  VV     VV          V
//      V    V     V V    V VVVVVV V     V VVVVV   VVVVVV VVVVVV VVVVV

//Display list
var root = $("root");
 	var mc_snow = $("mc_snow");
 	var mc_logo = $("mc_logo");
 	var mc_cta = $("mc_cta");
    var mc_box = $("mc_box");
    var mc_shadow = $("mc_shadow");
    var mc_christmas = $("mc_christmas");
    var mc_home = $("mc_home");
    var mc_characters = $("mc_characters");
	    var mc_link = $("mc_link");
		var mc_link_shadow = $("mc_link_shadow");
	    var mc_pacman = $("mc_pacman");
	    var mc_pacman_shadow = $("mc_pacman_shadow");
	    var mc_falco = $("mc_falco");
	    var mc_falco_shadow = $("mc_falco_shadow");
	var mc_particles = $("mc_particles");
    var mc_amiibo = $("mc_amiibo");
    var mc_crack = $("mc_crack");

var box_bits = [];
var snowflakes = [];

//scripts
var scriptConfig				= "config_preorder.xml";
var scriptDevice				= "device_sm.min.js";
var scriptTracker				= "fbf_tr.js";
var scriptGreensockCSS 			= "CSSPlugin.min.js";	//http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/
var scriptGreensockEase 		= "EasePack.min.js";	//http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/easing/
var scriptGreensockTweenLite 	= "TweenLite.min.js";	//http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/

//////////////////////////////////////////////////	
//	 $$$$$$\  $$\                         
//	$$  __$$\ $$ |                        
//	$$ /  \__|$$ | $$$$$$\  $$\  $$\  $$\ 
//	$$$$\     $$ |$$  __$$\ $$ | $$ | $$ |
//	$$  _|    $$ |$$ /  $$ |$$ | $$ | $$ |
//	$$ |      $$ |$$ |  $$ |$$ | $$ | $$ |
//	$$ |      $$ |\$$$$$$  |\$$$$$\$$$$  |
//	\__|      \__| \______/  \_____\____/ 
//////////////////////////////////////////////////	

function startBanner()
{
	logging = true;	//enable logging
	debug = true;	//enable line and file info in logs
	if(!local){
		logging = false;
		debug = false;
	}
	//load shizzle
	//, scriptTracker
	loadJS([scriptDevice, scriptGreensockCSS, scriptGreensockEase, scriptGreensockTweenLite], onScriptsLoaded);
}
//LOADING SECTION
function onScriptsLoaded()
{
	//init checker
	checker = new DeviceCheck();
	checker.init();
	isMobile = (checker.desktop == false);
	if(local && forceMobile) isMobile = true;
	preInit();
}
function preInit()
{
	if (Enabler.isInitialized()){
		init();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
	}
}
function init()
{
	log("init");
	initSetup();
	if(rich)
	{
		if(isMobile)	richMobileFlow();
		else 			richDesktopFlow();
	} else {
		if(isMobile)	standardMobileFlow();
		else 			standardDesktopFlow();
	}
}
function richMobileFlow()
{
	log("richMobileFlow");
	richDesktopFlow();
}
function richDesktopFlow()
{
	log("richDesktopFlow");
	playVideo();
}
function standardMobileFlow()
{
	log("standardMobileFlow");
	standardDesktopFlow();
}
function standardDesktopFlow()
{
	log("standardDesktopFlow");
	animateIntro();
}

function showEndscreen(now)
{
	log("showEndscreen", endscreen_reached);
    if(typeof now === "undefined") now = false;
	var t = now ? 0 : 1;

	mc_logo.visible = true;
    //move logo to the right
    TweenLite.to(mc_logo, 0, {scaleX:1, scaleY:1, y:70});
    TweenLite.to(mc_logo, t * 0.25, {x:700});

    if(endscreen_reached == false)
    {
    	//animate txt
		TweenLite.from(txt_drive, t * 1, {y:-50, ease:Elastic.easeOut.config(1, 0.5), delay:t * 0.25});
		//animate pack
		TweenLite.from(mc_pack, t * 1, {x:WID + WID * 0.5, ease:Elastic.easeOut.config(1, 0.5), delay:t * 0.5});

		//aniamte button - lazy
		TweenLite.from(btn_preorder, t * 0.5, {y:HEI + 50, delay:t * 1});
		TweenLite.from(btn_buy, t * 0.5, {y:HEI + 50, delay:t * 1});
		TweenLite.from(btn_trailer, t * 0.5, {y:HEI + 50, delay:t * 1});
		TweenLite.from(btn_race, t * 0.5, {y:HEI + 50, delay:t * 1.25});

		TweenLite.from(mc_rating, t * 0.25, {alpha:0, delay:t * 2});
		TweenLite.from(mc_devLogos, t * 0.25, {alpha:0, delay:t * 2.25});
		endscreen_reached = true;
    }

   
    mc_endscreen.visible = true;
    /*
	mc_bg.visible = true;
	hide(mc_black, mc_video);
	show(mc_logo, mc_date, mc_rating, mc_ps4);
	for (var i = 0; i < anims_end.length; i++)
	{
		var anim = anims_end[i];
		if(anim.tween.delay && now) anim.tween.delay = 0;
		TweenLite[anim.type](anim.target, now ? 0 : anim.duration, anim.tween);
	};*/
}


////////////////////////////////////////////////////////////////////////////
//                     	 $$\                         
//                     	 $$ |                        
//	 $$$$$$$\  $$$$$$\ $$$$$$\   $$\   $$\  $$$$$$\  
//	$$  _____|$$  __$$\\_$$  _|  $$ |  $$ |$$  __$$\ 
//	\$$$$$$\  $$$$$$$$ | $$ |    $$ |  $$ |$$ /  $$ |
// 	 \____$$\ $$   ____| $$ |$$\ $$ |  $$ |$$ |  $$ |
//	$$$$$$$  |\$$$$$$$\  \$$$$  |\$$$$$$  |$$$$$$$  |
//	\_______/  \_______|  \____/  \______/ $$  ____/ 
//                                       $$ |      
//////////////////////////////////////// $$ | /////////////////////////////////// 
//                                       \__|  


function initSetup()
{
	//show the ad and trigger layout
	document.body.style.display = "block";
	root.style.display = "block";
    root.visible = true;


	//create the def:
    var svgns = "http://www.w3.org/2000/svg";	//"http://www.w3.org/2000/xmlns/
    var ns = "http://www.w3.org/2000/xmlns/";
    var nameSpace = "http://www.w3.org/1999/xlink";
	var svg = document.createElementNS(svgns, "svg");
	svg.setAttributeNS(ns, "xmlns", svgns);
	//svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttributeNS(ns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttributeNS(null, 'width', 0);
	svg.setAttributeNS(null,'height', 0);
	svg.setAttribute('class', "do");
	//svg.setAttribute('style', "display:none");

	var defs = document.createElementNS(svgns, 'defs');

	for(var i = 0; i < mc_crack.children.length; i++)
	{
		var pattern = document.createElementNS(svgns, 'pattern');
		var image = document.createElementNS(svgns, 'image');
	   
	    pattern.setAttributeNS(null,'id', 'img'+i);    
	    pattern.setAttributeNS(null,'patternUnits', 'userSpaceOnUse');	//"objectBoundingBox"
	    pattern.setAttributeNS(null,'width', 220);
	    pattern.setAttributeNS(null,'height', 240);

		var child = mc_crack.children[i];
		var target_svg = child.getElementsByTagName("svg")[0];

		box_bits.push(child);
		child.visible = false;

		var matrix = {a:1,b:0,c:0,d:1,tx:0,ty:0};
		var style = document.defaultView.getComputedStyle(target_svg, null);
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
		log(matrix.tx,child._x,mc_crack._x )
		var x = matrix.tx+child._x+110;
    	var y = matrix.ty+child._y-240;
    	pattern.setAttribute('patternTransform', 'translate('+(-x)+','+(-y)+')');

	    image.setAttributeNS(nameSpace,'xlink:href', 'box.png');
		image.setAttributeNS(null,'x', 0);    
	    image.setAttributeNS(null,'y', 0);
	    image.setAttributeNS(null,'width', 220);
	    image.setAttributeNS(null,'height', 240);

	    pattern.appendChild(image);
	    defs.appendChild(pattern);
	}
	
    svg.appendChild(defs);

	root.appendChild(svg);
	//root.insertBefore(svg, root.firstChild);
   

    for (var i = 0; i < mc_crack.children.length; i++) {
    	var child = mc_crack.children[i];
    	var target_svg = child.getElementsByTagName("svg")[0];
    	//target_svg.setAttribute("filter", "url(#image)");
    	//log(i, child, "svg", target_svg);
    	var target_path = target_svg.getElementsByTagName("path")[0];
    	target_path.setAttribute("fill", "url(#img"+i+")");
    	
    	//target_path.removeAttribute("fill");
    }


    mc_logo.style.pointerEvents = "none";
    
    TweenLite.to(mc_cta.firstElementChild, 0, {alpha:0});
    hide(mc_cta, mc_characters, mc_particles, mc_amiibo, mc_falco.lastElementChild, mc_link.lastElementChild, mc_pacman.lastElementChild, mc_christmas, mc_home);
    hide(mc_falco_shadow, mc_link_shadow, mc_pacman_shadow);


    for (var i = 0; i < 10; i++) {
    	for (var j = 0; j < 3; j++) {    		
    		mc_particles.appendChild(mc_particles.children[j].cloneNode(true));
    	};
    };

    //add listeners
    /*
    mc_hits.style.display = "none";
    mc_hit_left._("path").addEventListener("mouseover", onOverlayOverOut);
    mc_hit_left._("path").addEventListener("click", onSkyClick);
*/

    var disablePointer = function(node){
       if(typeof node.style === "undefined") return;
        node.style.pointerEvents = "none";
    }
    /*
    traverseDOM(mc_hit_left, disablePointer);
    traverseDOM(mc_hit_right, disablePointer);
    traverseDOM(mc_hit_middle, disablePointer);
*/

/*
	mc_hit_left._("path").style.pointerEvents = "all";
        mc_course.style.display = "none";
    */

	
	//create snowflakes
	var numFlakes = 10;
	for (var i = 0; i < numFlakes; i++) {
		var snowflake = mc_snow.appendChild(mc_snow.children[0].cloneNode(true));
		snowflakes.push(snowflake);
		var scale = 0.25 + Math.random() * 0.75;
		snowflake.x = Math.random() * WID;
		snowflake.speed = scale * 0.5;
		snowflake.rotationDelta = 0.1 + Math.random() * 0.6;
		snowflake.rotationDelta *= (Math.random() > 0.5) ? -1 : 1;
		snowflake.rotation = Math.random() * 360;
		snowflake.counter = Math.random() * Math.PI * 2;
		TweenLite.to(snowflake, 0, {scaleX:scale, scaleY:scale, x:snowflake.x, y:Math.random() * HEI, rotationZ:snowflake.rotation});
	}
	//hide the inital one
	mc_snow.children[0].style.display = "none";

	//keyline
	addKeylineTo(root,WID,HEI,"#c4c4c4",1);

	root.style.backgroundColor  = "#FFF";
	root.style.cursor = "pointer";

	//main click listener TODO merge into one
	root.addEventListener("click", handleClick);
	root.addEventListener("mouseover", handleOverOut);
	root.addEventListener("mouseout", handleOverOut);

	var dummy = {x:0};
	TweenLite.to(dummy, 15, {x:1, onUpdate:updateFlakes, onComplete:hideFlakes})
}
function hideFlakes()
{
	TweenLite.to(mc_snow, 0.5, {alpha:0, onUpdate:updateFlakes, onComplete:killFlakes});
}
function killFlakes()
{
	mc_snow.style.display = "none";
}

//TODO work out why rotation no worky :(
function updateFlakes()
{

	for (var i = 0; i < snowflakes.length; i++) {
		var snowflake = snowflakes[i];
		snowflake.counter += 0.02;
		snowflake.rotation += snowflake.rotationDelta;
		TweenLite.to(snowflake, 0, {x:snowflake.x + Math.sin(snowflake.counter) * 25 * snowflake.speed, y:snowflake._y + snowflake.speed * 2, rotationZ:snowflake.rotation});// 	//x:Math.random() * WID,
		if(snowflake._y > HEI + 50)	TweenLite.to(snowflake, 0, {y:-50});
	}
}
function setupButton(button)
{
	TweenLite.to(button.children[button.children.length-1], 0, {alpha:0});
	button.style.pointerEvents = "none";
	button.firstElementChild.style.pointerEvents = "all";
	button.addEventListener("mouseover", onButtonOver);
	button.addEventListener("mouseout", onButtonOut);
}
function onButtonOver(event)
{
	TweenLite.to(this.children[this.children.length-1], 0.25, {alpha:1});
}
function onButtonOut(event)
{
	TweenLite.to(this.children[this.children.length-1], 0.25, {alpha:0});
}


////////////////////////////////////////////////////////////////////////////          
// 	                    $$\               
//	                    \__|              
//	 $$$$$$\  $$$$$$$\  $$\ $$$$$$\$$$$\  
//	 \____$$\ $$  __$$\ $$ |$$  _$$  _$$\ 
//	 $$$$$$$ |$$ |  $$ |$$ |$$ / $$ / $$ |
//	$$  __$$ |$$ |  $$ |$$ |$$ | $$ | $$ |
//	\$$$$$$$ |$$ |  $$ |$$ |$$ | $$ | $$ |
//	 \_______|\__|  \__|\__|\__| \__| \__|
////////////////////////////////////////////////////////////////////////////

function animateIntro()
{
	//logo animation of justice
	TweenLite.from(mc_logo, 0.5, {y:-100, ease:Back.easeOut.config(1.25), delay:0.25});
	

	//intro animation of doom
	TweenLite.from(mc_intro.children[2], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25), delay:0.75});
	TweenLite.from(mc_intro.children[1], 0.5, {x:"+=300", ease:Back.easeOut.config(1.25), delay:1});
	TweenLite.from(mc_intro.children[0], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25), delay:1.25});

	TweenLite.delayedCall(2.5, animateBox);
	TweenLite.delayedCall(0.5, wiggleBox);

	//TweenLite.from(btn_start, 0.5, {scaleX:0, scaleY:0, delay:0.5, ease:Back.easeOut.config(1.25)});
}
function wiggleBox()
{
	//wiggle box
	TweenLite.to(mc_box, 0, {rotation: -1 });
	TweenLite.to(mc_box, 2, { ease: RoughEase.ease.config({ template: Expo.easeOut, strength: 25, points: 50, taper: "out", randomize: true, clamp: false}), rotation: 0});
	
	//failed tests
	//TweenLite.to(mc_box, 0.25, { ease: Back.easeInOut.config(1.5), y: "-=30", delay:1.75 });
	//TweenLite.to(mc_box, 0.25, { ease: Back.easeInOut.config(1.5), y: "+=30", delay:2 });
	//TweenLite.to(mc_box, 1, { ease: Bounce.easeIn, y: "-=50", delay:1.5 });

	//jump box
	TweenLite.to(mc_box, 0.25, { ease: Power2.easeOut, y: "-=50", delay:1.5 });
	TweenLite.to(mc_box, 0.25, { ease: Power2.easeOut, y: "+=50", delay:1.75 });
	TweenLite.to(mc_box, 0.25, { ease: Power2.easeOut, y: "-=80", delay:2.0 });
	TweenLite.to(mc_box, 0.25, { ease: Power2.easeOut, y: "+=80", delay:2.25 });

	//shadow to match
	TweenLite.to(mc_shadow, 0.25, {alpha:0.5, ease: Power2.easeOut, delay:1.5});
	TweenLite.to(mc_shadow, 0.25, {alpha:1.0, ease: Power2.easeOut, delay:1.75 });
	TweenLite.to(mc_shadow, 0.25, {alpha:0.5, ease: Power2.easeOut, delay:2.0 });
	TweenLite.to(mc_shadow, 0.25, {alpha:1.0, ease: Power2.easeOut, delay:2.25 });
}
function animateBox()
{
	//hide intro
	TweenLite.to(mc_intro.children[2], 0.5, {x:"+=300", ease:Back.easeOut.config(1.25)});
	TweenLite.to(mc_intro.children[1], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25)});
	TweenLite.to(mc_intro.children[0], 0.5, {x:"+=300", ease:Back.easeOut.config(1.25)});

	//animate box
	TweenLite.to(mc_box, 0.5, {scaleY:1.25, delay:0.5, ease:Back.easeIn.config(3)});
	TweenLite.to(mc_box, 0.25, {scaleY:1, delay:1, ease:Back.easeOut.config(3), onComplete:explodeBox});
	TweenLite.to(mc_box, 0.25, {y:400, delay:0.75});

	//animate box shadow
	TweenLite.to(mc_shadow, 0.2, {alpha:0, delay:0.75});
}
function explodeBox()
{
	mc_box.visible = false;
	for (var i = 0; i < box_bits.length; i++) {
		var bit = box_bits[i];
		bit.visible = true;
		var radius = 500;
		var x = Math.sin(Math.random() *  Math.PI*2) * (radius);
		var y = Math.cos(Math.random() *  Math.PI*2) * (radius);
		x = x < 0 ? "-=" + (-x) : "+=" + x;
		y = y < 0 ? "-=" + (-y) : "+=" + y;
		if(Math.abs(x) < 50) x = Math.abs(x)/x + 50;
		if(Math.abs(y) < 50) y = Math.abs(y)/y + 50;
		var t = 1 + Math.random() * 1;
		TweenLite.to(bit, t, {rotation:Math.random()*360, x:x, y:y, ease: Power1.easeOut});	//, onComplete:mc_crack.removeChild, onCompleteParams:[bit]
		TweenLite.to(bit, t, {alpha:0, ease: Power4.easeIn});
	};


	for (var i = 0; i < mc_particles.children.length; i++) {
		var particle = mc_particles.children[i];
		var radius = 500;
		var x = Math.sin(Math.random() *  Math.PI*2) * radius;
		var y = Math.cos(Math.random() *  Math.PI*2) * radius;

		if(Math.abs(x) < 50) x = Math.abs(x)/x + 50;
		if(Math.abs(y) < 50) y = Math.abs(y)/y + 50;
		//x = x < 0 ? "-=" + (-x) : "+=" + x;
		//y = y < 0 ? "-=" + (-y) : "+=" + y;
		TweenLite.to(particle, 0, {scaleX:0, scaleY:0});
		var scale = 0.25 + Math.random()*0.75;
		var t = 1 + Math.random() * 1;
		TweenLite.to(particle, t, {scaleX:scale, scaleY:scale, rotation:Math.random()*360, x:x, y:y, ease: Power1.easeOut});	//, onComplete:mc_particles.removeChild, onCompleteParams:[particle]
		TweenLite.to(particle, t, {alpha:0, ease: Power4.easeIn});
	};	

	//show amiibo
	mc_amiibo.visible = true;
	//nudge up
	TweenLite.to(mc_amiibo, 0, {y:"-=50"});
	//animate from box
	TweenLite.from(mc_amiibo, 0.25, {y:mc_box._y - 25, scaleX:0.2, scaleY:0.2});

	var s1 = 0.5;
	var s2 = 0.65;
	var s3 = 1;

	var x = 70;

	var left = mc_link;//mc_pacman;
	var middle = mc_pacman;//mc_falco;
	var right = mc_falco;//mc_link;
	var shadow_left = mc_link_shadow;//mc_pacman_shadow;
	var shadow_middle = mc_pacman_shadow;//mc_falco_shadow;
	var shadow_right = mc_falco_shadow;//mc_link_shadow;

	//set the intial states for the characters
	TweenLite.to(left, 0, 	{scaleX:s1, scaleY:s1, y:mc_box._y-20});
	TweenLite.to(middle, 0, {scaleX:s1, scaleY:s1, y:mc_box._y-20});
	TweenLite.to(right, 0, 	{scaleX:s1, scaleY:s1, y:mc_box._y-20});

	//initial character pop out animation
	TweenLite.to(left, 0.4, 	{scaleX:s2, scaleY:s2, x:"-=50",y:"-=20"});	//y:"+=50"
	TweenLite.to(middle, 0.4, 	{scaleX:s2, scaleY:s2, y:"+=50"});
	TweenLite.to(right, 0.4, 	{scaleX:s2, scaleY:s2, x:"+=50",y:"-=20"});	//y:"+=50"

	//rotate out the left and right characters \<-|  |->/
	TweenLite.to(left, 0.5, {rotation:-5});
	TweenLite.to(right, 0.5, {rotation:5});

	//scale up to full size and spread out
	TweenLite.to(left, 0.5, 	{delay:0.75, scaleX:s3, scaleY:s3, x:-300, y:500});
	TweenLite.to(middle, 0.5, 	{delay:0.75, scaleX:s3, scaleY:s3, y:500});
	TweenLite.to(right, 0.5, 	{delay:0.75, scaleX:s3, scaleY:s3, x:300, y:500});

	//show middle characters name
	TweenLite.delayedCall(1, animateCharacterName, [middle]);

	//show other two characters buy moving their container and also reveal their names when the animations are complete (was 150 but falco sticks out)
	TweenLite.to(mc_characters, 0.5, {delay:3, x:-160, onComplete:animateCharacterName, onCompleteParams:[right], ease: Back.easeOut.config(1)});
	TweenLite.to(mc_characters, 0.5, {delay:6, x:450, onComplete:animateCharacterName, onCompleteParams:[left], ease: Back.easeOut.config(1)});

	//bring the characters back together in the middle
	TweenLite.to(mc_characters, 0.5, 	{delay:9, x:WID*0.5});
	TweenLite.to(left, 0.25, 	{delay:9, scaleX:s2 * 0.75, scaleY:s2 * 0.75, x:-x, y:mc_box._y-20, rotation:0});
	TweenLite.to(middle, 0.25, 	{delay:9, scaleX:s2, scaleY:s2, y:mc_box._y+20});
	TweenLite.to(right, 0.25, 	{delay:9, scaleX:s2 * 0.75, scaleY:s2 * 0.75, x:x, y:mc_box._y-20, rotation:0});

	//drop the characters onto the floor plane (staggered - middle first)
	TweenLite.to(middle, 0.25, 	{delay:9.25, y:"+=90", ease: Back.easeIn.config(1)});
	TweenLite.to(left, 0.25, 	{delay:9.45, y:"+=90", ease: Back.easeIn.config(1)});
	TweenLite.to(right, 0.25, 	{delay:9.65, y:"+=90", ease: Back.easeIn.config(1)});

	//show the character shadows
	show(shadow_left, shadow_middle, shadow_right);

	//position the characters shadows in their final resting places
	TweenLite.to(shadow_left, 0, {x:-x, y:mc_box._y-20+90, alpha:0.75});
	TweenLite.to(shadow_middle, 0, {y:mc_box._y+20+90, alpha:0.75});
	TweenLite.to(shadow_right, 0, {x:x, y:mc_box._y-20+90, alpha:0.75});

	//fade character shadows in
	TweenLite.from(shadow_middle, 	0.25, {alpha:0, delay:9.25, y:"-=20"});
	TweenLite.from(shadow_left, 	0.25, {alpha:0, delay:9.45, y:"-=20"});
	TweenLite.from(shadow_right, 	0.25, {alpha:0, delay:9.65, y:"-=20"});


	//final amiibo animation
	TweenLite.to(mc_amiibo, 1, {y:"+=50", delay:10, ease: Elastic.easeInOut.config(1, 1)});

	//animate "the home of" and "this christmas" in from the left and right
	TweenLite.from(mc_home, 0.75, {x:-250, delay:10.5, ease: Elastic.easeOut.config(1, 1), onStart:show, onStartParams:[mc_home]});
	TweenLite.from(mc_christmas, 0.75, {x:WID+250, delay:10.75, ease: Elastic.easeOut.config(1, 1), onStart:show, onStartParams:[mc_christmas]});

	//animate in the cta
	TweenLite.from(mc_cta, 0.75, {y:HEI+60, delay:11, ease: Elastic.easeOut.config(1, 1), onStart:show, onStartParams:[mc_cta]});

	show(mc_characters, mc_particles);
}
function animateCharacterName(character)
{
	var name = character.lastElementChild;
	show(name);
	TweenLite.from(name, 0.5, 	{x:"+=300", ease: Elastic.easeOut.config(1, 0.75)});
	TweenLite.to(name, 0.5, {x:"-=300", delay:1.5, ease: Elastic.easeIn.config(1, 0.75), onComplete:hide, onCompleteParams:[character.lastElementChild]});
}
function handleClick(event)
{
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	log("main click", window.clickTag);
	
	Enabler.exit('BackgroundExit');

	//cleanup
	//TweenLite.killDelayedCallsTo(showEndscreen);
	//showEndscreen(true);
}

function handleOverOut(event)
{
	if(event.type == "mouseover")
	{
		TweenLite.to(mc_cta.firstElementChild, 0.2, {alpha:1});
	}else{
		TweenLite.to(mc_cta.firstElementChild, 0.2, {alpha:0});
	}
}

////////////////////////////////////////////////////////////////////////////
//	            $$\     $$\ $$\
//	            $$ |    \__|$$ |
//	$$\   $$\ $$$$$$\   $$\ $$ |
//	$$ |  $$ |\_$$  _|  $$ |$$ |
//	$$ |  $$ |  $$ |    $$ |$$ |
//	$$ |  $$ |  $$ |$$\ $$ |$$ |
//	\$$$$$$  |  \$$$$  |$$ |$$ |
//	 \______/    \____/ \__|\__|
////////////////////////////////////////////////////////////////////////////

//video utils
function createVideo(id, width, height /*src, src, src...*/)
{
	log("createVideo("+id+")");
	var vid = document.createElement('video');
	vid.id = id;
	vid.width = width;
	vid.height = height;
	vid.preload = "none";
	vid.style.position = "absolute";
	for (var i = 3; i < arguments.length; i++){
		var source = arguments[i];
		var type = source.substr(source.lastIndexOf(".")+1);
		vid.appendChild(generateVideoSource(source, "video/"+type));
	};
	return vid;		
}
function generateVideoSource(src, type)
{
	var source = document.createElement('source');
    source.src = src;
    source.type = type;
    return source;
}
function traverseDOM(node, func) {
    func(node);
    /*
    for(var i = 0; i < node.children.length; i++)
    {
         traverseDOM(node.children[i], func);
    }*/
    node = node.firstChild;
    while (node) {
        traverseDOM(node, func);
        node = node.nextSibling;
    }
}

/*

function VideoController(video) {
  this.video = video;
  this.test = function(arg) {
   	//
  };
}*/