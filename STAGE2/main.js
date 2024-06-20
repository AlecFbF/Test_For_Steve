//SETUP
var local = window.location.protocol === "file:";

var WID = 300;			//width of unit
var HEI = 600;			//height of unit
var rich = false;

//device checker thing
var checker;

var snowflakes = [];
var snowDuration = 200; // how long the snow should run for;
var snowDeath = false;

var autoPilotOn = false; // when no interactivity this will be true;
var initialConsole;
var autoPilotCounter = 0;

//flash detection, produces hasFlash and flashVersion
function getFlashVersion(a){var e=a.match(/[\d]+/g);return e.length=3,e.join(".")}var hasFlash=!1,flashVersion="";if(navigator.plugins&&navigator.plugins.length){var plugin=navigator.plugins["Shockwave Flash"];plugin&&(hasFlash=!0,plugin.description&&(flashVersion=getFlashVersion(plugin.description))),navigator.plugins["Shockwave Flash 2.0"]&&(hasFlash=!0,flashVersion="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var mimeType=navigator.mimeTypes["application/x-shockwave-flash"];hasFlash=mimeType&&mimeType.enabledPlugin,hasFlash&&(flashVersion=getFlashVersion(mimeType.enabledPlugin.description))}else try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");hasFlash=!0,flashVersion=getFlashVersion(ax.GetVariable("$version"))}catch(e){try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");hasFlash=!0,flashVersion="6.0.21"}catch(e){try{var ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");hasFlash=!0,flashVersion=getFlashVersion(ax.GetVariable("$version"))}catch(e){}}}

// Tracking - DO NOT TUTCH
var ad_width = WID;
var ad_height = HEI;
var ad_campaign = "15_NINTENDO_PHASE2_BUNDLE"; 
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
    var mc_intro = $("mc_intro");
    var mc_outro = $("mc_outro");
    var mc_bundle = $("mc_bundle"); //container for arrows and bundle stuff
        var mc_arrows = $("mc_arrows");
            var mc_prev_hit = $("mc_prev_hit");
            var mc_next_hit = $("mc_next_hit");
            var mc_prev = $("mc_prev");
            var mc_next = $("mc_next");
        var mc_container = $("mc_container");
        var mc_stages = $("mc_stages");
        var btn_select = $("btn_select");
            var btn_select_arrow;
        var btn_finish = $("btn_finish");
            var btn_finish_arrow;
        var mc_indicator = $("mc_indicator");
    var btn_build = $("btn_build"); 
 	var mc_logo = $("mc_logo");
 //	var mc_cta = $("mc_cta");
    var btn_cta = $("btn_cta");
    var mc_box = $("mc_box");
        var mc_box_contents = $("mc_box_contents");
 //   var mc_christmas = $("mc_christmas");
    var mc_home = $("mc_home");
    var mc_amiibo = $("mc_amiibo");
    var mc_snow = $("mc_snow");
    var mc_particles = $("mc_particles");

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
    //intro animation (logo and text)
	animateIntro();
    //open the box
    TweenLite.delayedCall(2, toggleBox);
    //generate a random bundle for the box
    TweenLite.delayedCall(2.75, generateRandomBundle);
    //generateRandomBundle();
    TweenLite.from(btn_build, 0.25, {delay:3.25, alpha:0,onComplete:buildReady});
    throbMe(btn_build);
}

function buildReady()
{
    log("buildReady");
   // btn_select.children[4].addEventListener("click", buildBundle);
    btn_select.lastElementChild._("path").addEventListener("click", onSelect);
    btn_finish.lastElementChild._("path").addEventListener("click", onSelect);
    btn_build.children[4].addEventListener("click", buildBundle);
     root.addEventListener("click", buildBundle);
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
	log("initSetup");

    //show the ad and trigger layout
	document.body.style.display = "block";
	root.style.display = "block";
    root.visible = true;



    mc_logo.style.pointerEvents = "none";
    
    TweenLite.to(mc_cta.firstElementChild, 0, {alpha:0});
    hide(mc_outro, mc_cta, mc_amiibo, mc_christmas, mc_home, mc_bundle);
    hide(mc_stages.children, btn_finish, btn_cta);
    show(mc_stages.children[0]); // first children - step 1

   // btn_cta.lastElementChild._("path").addEventListener("click", onClickCTA);
    btn_cta.lastElementChild._("path").addEventListener("mouseover", throbCTAMe);
   

    btn_select_arrow = btn_select.children[btn_select.children.length-2];
	btn_select_arrow.cache = {x:btn_select_arrow._x};

    btn_finish_arrow = btn_finish.children[btn_finish.children.length-2];
	btn_finish_arrow.cache = {x:btn_finish_arrow._x};
    
	//btn_select.lastElementChild._("path").addEventListener("click", onSelect);
	btn_select.lastElementChild._("path").addEventListener("mouseover", onSelectOverOut);
    //btn_finish.lastElementChild._("path").addEventListener("click", onSelect);
	btn_finish.lastElementChild._("path").addEventListener("mouseover", onFinishOverOut);
    
	//btn_select.addEventListener("mouseout", onSelectOverOut);
	//mc_prev_hit._("path").addEventListener("click", onPrev);
  //  mc_next_hit._("path").addEventListener("click", onNext);
    mc_prev_hit._("path").addEventListener("mouseover", onPrevOverOut);
	mc_prev_hit._("path").addEventListener("mouseout", onPrevOverOut);
    mc_next_hit._("path").addEventListener("mouseover", onNextOverOut);
    mc_next_hit._("path").addEventListener("mouseout", onNextOverOut);

	mc_prev.cache = {x:mc_prev._x};
	mc_next.cache = {x:mc_next._x};

   // mc_box.addEventListener("click", toggleBox);// do this at the end
    TweenLite.to(mc_box, 0, {y:450}); //-------------------------------------------------------------------------------------------------------------------HARD CODED BOX POSISH
    
    //btn_build.addEventListener("click", buildBundle);
    
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

	

	//keyline
	//addKeylineTo(root,WID,HEI,"#c4c4c4",1);

    addKeylineTo(root,WID,HEI,"#c4c4c4",1);

	root.style.backgroundColor  = "#FFF";
	root.style.cursor = "pointer";

	//main click listener TODO merge into one
	//root.addEventListener("click", handleClick);
	root.addEventListener("mouseover", handleOverOut);
	root.addEventListener("mouseout", handleOverOut);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------- PARTICLES (STARS)!!!!

 for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 3; j++) {           
            mc_particles.appendChild(mc_particles.children[j].cloneNode(true));
        };
    };

    hide(mc_particles);
    TweenLite.to(mc_particles,0,{y:150});

//explodeParticles();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------- SNOW FLAKES!!!!
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
    var dummy = {x:0};
    TweenLite.to(dummy, snowDuration, {x:1, onUpdate:updateFlakes, onComplete:hideFlakes})

    //hide the lid
    //hide(mc_box.lastElementChild);
    
    //load in the console selection
	loadConsoles();
    
    
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------- SNOW FLAKES!!!!
function hideFlakes()
{
    TweenLite.to(mc_snow, 0.5, {alpha:0, onUpdate:updateFlakes, onComplete:killFlakes});
}

function showFlakes()
{
    snowDeath = false;
    reviveFlakes();
    TweenLite.to(mc_snow, 0.5, {alpha:1,delay:1, onUpdate:updateFlakes});
}

function pauseSnow()
{
    log("pauseSnow");
    hideFlakes();
   //  TweenLite.to(mc_snow, 0.5, {x:0, onUpdate:updateFlakes, onComplete:killFlakes});
  // TweenLite.killTweensOf(updateFlakes);
}

function killFlakes()
{
    mc_snow.style.display = "none";
    snowDeath = true;
}

function reviveFlakes()
{
    mc_snow.style.display ="block";
}

//TODO work out why rotation no worky :(
function updateFlakes()
{

    for (var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];
        snowflake.counter += 0.02;
        snowflake.rotation += snowflake.rotationDelta;
        TweenLite.to(snowflake, 0, {x:snowflake.x + Math.sin(snowflake.counter) * 25 * snowflake.speed, y:snowflake._y + snowflake.speed * 2, rotationZ:snowflake.rotation});//     //x:Math.random() * WID,
        if(snowflake._y > HEI + 50) TweenLite.to(snowflake, 0, {y:-50});
    }
}

function resetBundle() //------------------------------------------------------------------------------------------------------------------------------------------- RESET BUNDLE
{
    log("-----------------------------------RESET BUNDLE");

    if(snowDeath){
        showFlakes();
    }
    emptyBox();

    chosenConsole = -1;
    indicator_index = 0;

    numSelections = 0;          //number of items to choose from
    currentSelection = 0;   //currently selected index
    selections = [];        //list of selections
    clearImages();


   TweenLite.to(mc_container, 0, {x:WID*0.5});    
    TweenLite.to(mc_indicator.lastElementChild, 0.5, {x:-40 + indicator_index * 20, ease:Power1.easeInOut});
    TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:-10, scaleX:1.4, scaleY:1.4, ease:Power1.easeIn});
    TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:0, scaleX:1, scaleY:1, ease:Power1.easeOut, delay:0.25});

    for (var stagetitle = 0; stagetitle < mc_stages.children.length; stagetitle++) { 
        hide(mc_stages.children[stagetitle]);
         TweenLite.to(mc_stages.children[stagetitle], 0, {x:0});
    }

    show(mc_stages.children[0]);
    TweenLite.to(mc_stages.children[0], 0, {x:0});
   // TweenLite.delayedCall(1,loadImages);
    loadConsoles();

   // loadImages();
  //onSelect();
   
}

function buildBundle(event) //-------------------------------------------------------------------------------------------------------------------------------------- BUILD BUNDLE
{
  // log(event);
  root.removeEventListener("click", buildBundle);
   log("buildBundle");
    if(event != undefined){
         event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
         autoPilotOn = false;
         killAutoPilot();         
    }
  
    mc_bundle.visible = true;
    mc_intro.visible = false;
   if(autoPilotOn) {
       btn_build.visible = true;
       btn_select.visible = false;
       TweenLite.to(btn_build,0.5,{y:395,ease: Back.easeOut.config(2)});
    } else {
       btn_build.visible = false;
        btn_select.visible = true;
    }
   //snowDuration +=20;
    moveBoxDown();
    emptyBox();
    if(!autoPilotOn){
      mc_prev_hit._("path").addEventListener("click", onPrev);
      mc_next_hit._("path").addEventListener("click", onNext);
    }

}

function moveBoxDown()
{
    TweenLite.to(mc_box,0.5,{y:HEI*0.7,ease: Back.easeOut.config(2)});
}

function moveBoxUp()
{
    TweenLite.to(mc_box,0.5,{y:HEI*0.6,ease: Back.easeIn.config(2)});
}
function emptyBox()
{
    log("emptyBox");
    while(mc_box_contents.firstChild)  mc_box_contents.removeChild(mc_box_contents.firstChild); 
}

var indicator_index = 0;

var numSelections;          //number of items to choose from
var currentSelection = 0;   //currently selected index
var selections = [];        //list of selections

function onSelect(event) //------------------------------------------------------------------------------------------------------------------------- // ON SELECT
{
	log("onSelect");

    log("indicator_index: "+indicator_index);

    if(event != undefined){
         event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
       //  autoPilotOn = false;
        // killAutoPilot();
    }
    //event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	
    //no console chosen yet
    if(chosenConsole == -1)
    {
        //need to work out which one was selected
        for(var i = 0; i < link.length; i++)
        {
            var vo = link[i];
            if(vo.item_id == currentSelection + 1)
            {
                chosenConsole = vo.type_id;
                break;
            }
        }
    }
    //log("chosenConsole", chosenConsole);
    
    putImageInBox(mc_container.children[currentSelection * 2]); // takes images out of container and puts in box container
    if(indicator_index == 3)
    {
        hide(btn_select);
        if(autoPilotOn){

        } else {
          show(btn_finish); 
        }
       
    }
    if(indicator_index >= 4){
        hide(mc_bundle);
        if(autoPilotOn){
           autoPilotOutro();
        } else {
            root.addEventListener("click", onClickCTA);
            animateOutro();
        }
     
        return;
    }

    
	selections.push(indicator_index);

	indicator_index++
    currentSelection = 0;
    TweenLite.to(mc_container, 0, {x:WID*0.5});

    
    
	TweenLite.to(mc_indicator.lastElementChild, 0.5, {x:-40 + indicator_index * 20, ease:Power1.easeInOut});
	TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:-10, scaleX:1.4, scaleY:1.4, ease:Power1.easeIn});
	TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:0, scaleX:1, scaleY:1, ease:Power1.easeOut, delay:0.25});
	TweenLite.to(mc_stages.children[indicator_index-1], 0.5, {x:"-="+WID, ease:Power1.easeInOut, onComplete:hide, onCompleteParams:[mc_stages.children[indicator_index-1]]});
	TweenLite.from(mc_stages.children[indicator_index], 0.5, {x:"+="+WID, ease:Power1.easeInOut, onStart:show, onStartParams:[mc_stages.children[indicator_index]]});
    
	//load the next image set
	loadImages(); //------------------------------------------------------------------------------------------------------------------------------------------ LOAD IMAGES
}
function onSelectOverOut(event)
{
	log("onSelectOverOut");

    if(event.type == "mouseover")
	{
		TweenLite.to(btn_select_arrow, 0.25, {x:btn_select_arrow.cache.x+10, ease:Power1.easeInOut});
		TweenLite.to(btn_select_arrow, 0.25, {x:btn_select_arrow.cache.x, ease:Power1.easeInOut, delay:0.25});
	}
}
function onFinishOverOut(event)
{
	log("onFinishOverOut");

    if(event.type == "mouseover")
	{
		TweenLite.to(btn_finish_arrow, 0.25, {x:btn_finish_arrow.cache.x+10, ease:Power1.easeInOut});
		TweenLite.to(btn_finish_arrow, 0.25, {x:btn_finish_arrow.cache.x, ease:Power1.easeInOut, delay:0.25});
	}
}

function onPrevOverOut(event)
{
	log("onPrevOverOut");

    if(event.type == "mouseover")
	{
		TweenLite.to(mc_prev, 0.25, {x:mc_prev.cache.x-5, ease:Back.easeIn.config(1.5)});
	}else{
		TweenLite.to(mc_prev, 0.25, {x:mc_prev.cache.x, ease:Back.easeOut.config(1.5)});
	}
}
function onNextOverOut(event)
{
	log("onNextOverOut");
    if(!autoPilotOn) {
        if(event != undefined){
            if(event.type == "mouseover")
                 {
                     TweenLite.to(mc_next, 0.25, {x:mc_next.cache.x+5, ease:Back.easeIn.config(1.5)});
                      }else{
                  TweenLite.to(mc_next, 0.25, {x:mc_next.cache.x, ease:Back.easeOut.config(1.5)});
                     }
        }
       
    } else {
        TweenLite.to(mc_next, 0.25, {x:mc_next.cache.x+5, ease:Back.easeIn.config(1.5)});
        TweenLite.to(mc_next, 0.25, {x:mc_next.cache.x, delay:0.25, ease:Back.easeOut.config(1.5)});
    }
    
}
function onPrev(event)
{
	log("onPrev");
    currentSelection--;
    currentSelection = wrapNumber(currentSelection, 0, numSelections);
	//if(currentSelection < 0) currentSelection = 2
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	var target = WID * currentSelection;
	target = target % (WID * numSelections);
	TweenLite.to(mc_container, 0.25, {x:150 - target});
}
function onNext(event)
{
	log("onNext");
    currentSelection++;
    currentSelection = wrapNumber(currentSelection, 0, numSelections)
     if(event != undefined){
         event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
        // autoPilotOn = false;
        // killAutoPilot();
    }
	//event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	var target = WID * currentSelection;
	target = target % (WID * numSelections);
	TweenLite.to(mc_container, 0.25, {x:150 - target});
}
function wrapNumber(kx, kLowerBound, kUpperBound)
{
    log("wrapNumber");
    var range = kUpperBound - kLowerBound;
    kx = ((kx-kLowerBound) % range);
    if(kx<0)    return kUpperBound + kx;
    else        return kLowerBound + kx
}
function getRandomItemFromArray(arr)
{
   log("getRandomItemFromArray");
   return arr[Math.floor(Math.random()*arr.length)];
}
function getRandomIndexFromArray(arr)
{
   log("getRandomIndexFromArray");
    return Math.floor(Math.random()*arr.length);
}
function getRandomIndexFromArrayLength(len)
{
    log("getRandomIndexFromArray");
    return Math.floor(Math.random()*len);
}
function toggleBox(event)
{
	log("toggleBox");
    if(event)event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	if(mc_box.lastElementChild._y !== 0) 	closeBox();
	else 									openBox();
}

function throbCTAMe(event)
{
    throbMeNow(btn_cta);

}

function throbMeNow(div)
{
    TweenLite.to(div,0.15,{scaleX:1.1,scaleY:1.1});
    TweenLite.to(div,0.15,{delay:0.25,scaleX:1,scaleY:1});
    TweenLite.to(div,0.15,{delay:0.5,scaleX:1.1,scaleY:1.1});
    TweenLite.to(div,0.15,{delay:0.75,scaleX:1,scaleY:1});
}

function throbMe(div)
{
    TweenLite.to(div,0.15,{delay:3.75,scaleX:1.1,scaleY:1.1});
    TweenLite.to(div,0.15,{delay:3.9,scaleX:1,scaleY:1});
    TweenLite.to(div,0.15,{delay:4.15,scaleX:1.1,scaleY:1.1});
    TweenLite.to(div,0.15,{delay:4.3,scaleX:1,scaleY:1});
}
var imageSize = 184; 

/*
3 console types
    wiiu
    3ds
    3ds xl
    
*/
var levels = [{"id":1,"title":"Console"},{"id":2,"title":"Software \/ Controller"},{"id":3,"title":"amiibo"},{"id":4,"title":"Accessory"},{"id":5,"title":"Gift"}]

items = [{"id":1,"title":"Wii U Mario Kart 8","code":"A001","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":2,"title":"Wii U Super Mario Maker","code":"A002","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":3,"title":"Wii U Splatoon","code":"A003","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":4,"title":"Wii U Mario Kart 8 + Splatoon","code":"A004","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":5,"title":"New Nintendo 3DS White","code":"A005","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":6,"title":"New Nintendo 3DS Black","code":"A006","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":7,"title":"New Nintendo 3DS XL Metallic Blue","code":"A007","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":8,"title":"New Nintendo 3DS XL Metallic Black","code":"A008","level_id":1,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":9,"title":"Super Smash Bros. for Wii U","code":"B001","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":10,"title":"Mario Kart 8","code":"B002","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":11,"title":"Super Mario Maker","code":"B003","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":12,"title":"Splatoon","code":"B004","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":13,"title":"Yoshi's Woolly World","code":"B005","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":14,"title":"Hyrule Warriors","code":"B006","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":15,"title":"Kirby and the Rainbow Paintbrush","code":"B007","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":16,"title":"Mario Party 10","code":"B008","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":17,"title":"Captain Toad: Treasure Tracker","code":"B009","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":18,"title":"Wii Remote Plus Mario","code":"B010","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":19,"title":"Wii Remote Plus Luigi","code":"B011","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":20,"title":"Wii Remote Plus Yoshi","code":"B012","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":21,"title":"Wii Remote Plus Peach","code":"B013","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":22,"title":"Wii Remote Plus Black","code":"B014","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":23,"title":"Wii Remote Plus White","code":"B015","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":24,"title":"Wii U Pro Controller","code":"B016","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":25,"title":"Super Smash Bros. for Nintendo 3DS","code":"B017","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":26,"title":"Pokémon Omega Ruby","code":"B018","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":27,"title":"Pokémon Alpha Sapphire","code":"B019","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":28,"title":"Animal Crossing: Happy Home Designer","code":"B020","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":29,"title":"Monster Hunter 4","code":"B021","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":30,"title":"Xenoblade Chronicles 3D","code":"B022","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":31,"title":"Code Name: S.T.E.A.M.","code":"B023","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":32,"title":"Chibi-Robo! Zip Lash","code":"B024","level_id":2,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":33,"title":"Mario No.1 amiibo","code":"C001","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":34,"title":"Link No.5 amiibo","code":"C002","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":35,"title":"Peach amiibo (Super Mario Collection)","code":"C003","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":36,"title":"Inkling Boy amiibo","code":"C004","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":37,"title":"Inkling Girl amiibo","code":"C005","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":38,"title":"Yoshi No.3 amiibo","code":"C006","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":39,"title":"PAC-MAN No.35 amiibo","code":"C007","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":40,"title":"Toad amiibo (Super Mario Collection)","code":"C008","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":41,"title":"Ganondorf No.41 amiibo","code":"C009","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":42,"title":"Toon Link No.22 amiibo","code":"C010","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":43,"title":"Mario amiibo (Super Mario Collection)","code":"C011","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":44,"title":"Bowser No.20 amiibo","code":"C012","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":45,"title":"Yarn Yoshi Pink","code":"C013","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":46,"title":"Yarn Yoshi Blue","code":"C014","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":47,"title":"Yarn Yoshi Green","code":"C015","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":48,"title":"Kirby No.11 amiibo","code":"C016","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":49,"title":"Captain Falcon No.18 amiibo","code":"C017","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":50,"title":"King Dedede No.28 amiibo","code":"C018","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":51,"title":"Meta Knight No.29 amiibo","code":"C019","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":52,"title":"Pikachu No.10 amiibo","code":"C020","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":53,"title":"Mario Modern Colours amiibo","code":"C021","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":54,"title":"Mario Classic Colours amiibo","code":"C022","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":55,"title":"Squid Inkling amiibo","code":"C023","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":56,"title":"Animal Crossing amiibo Cards - 3 packs","code":"C024","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":57,"title":"Luigi amiibo (Super Mario Collection)","code":"C025","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":58,"title":"Jigglypuff No.37 amiibo","code":"C026","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":59,"title":"Greninja No.36 amiibo","code":"C027","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":60,"title":"Robin No.30 amiibo","code":"C028","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":61,"title":"Marth No.12 amiibo","code":"C029","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":62,"title":"Zelda No.13 amiibo","code":"C030","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":63,"title":"Lucina No.31 amiibo","code":"C031","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":64,"title":"Pikachu No.10 amiibo","code":"C032","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":65,"title":"Chibi-Robo amiibo","code":"C033","level_id":3,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":66,"title":"Super Mario Maker T-Shirt","code":"D001","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":67,"title":"Splatoon T-Shirt","code":"D002","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":68,"title":"Mario Kart 8 T-Shirt","code":"D003","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":69,"title":"Bullet Bill T Shirt","code":"D004","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":70,"title":"Mario 30th Anniversary T-Shirt","code":"D005","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":71,"title":"The Legend of Zelda Triangle Faces T-Shirt","code":"D006","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":72,"title":"Cover Plate 002","code":"D007","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":73,"title":"Cover Plate 004","code":"D008","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":74,"title":"Cover Plate 011","code":"D009","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":75,"title":"Cover Plate 016","code":"D010","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":76,"title":"Cover Plate 017","code":"D011","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":77,"title":"Cover Plate - Monster Hunter 4","code":"D012","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":78,"title":"Cover Plate 20","code":"D013","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":79,"title":"Cover Plate 024 - The Legend of Zelda","code":"D014","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":80,"title":"Cover Plate 025 - Xenoblade Chronicles","code":"D015","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":81,"title":"Cover Plate 19","code":"D016","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":82,"title":"Cover Plate 18","code":"D017","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":83,"title":"Cover Plate 15","code":"D018","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":84,"title":"Cover Plate 08","code":"D019","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":85,"title":"Cover Plate 07","code":"D020","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":86,"title":"Cover Plate 13","code":"D021","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":87,"title":"Cover Plate 14","code":"D022","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":88,"title":"Cover Plate 26 - Splatoon","code":"D023","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":89,"title":"Cover Plate 05 - Animal Crossing","code":"D024","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":90,"title":"Cover Plate 06 -Animal Crossing","code":"D025","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":91,"title":"Cover Plate 27 - Animal Crossing","code":"D026","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":92,"title":"Pokémon Omega Ruby Case","code":"D027","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":93,"title":"Pokémon Alpha Sapphire Case","code":"D028","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":94,"title":"Retro Mario Case","code":"D029","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":95,"title":"Pikachu Case","code":"D030","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":96,"title":"The Legend of Zelda: Majoras Mask Case","code":"D031","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":97,"title":"Retro Controller Case","code":"D032","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":98,"title":"Animal Crossing Multi Case and Stylus Kit","code":"D033","level_id":4,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":99,"title":"Splatoon Hat","code":"E001","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":100,"title":"Mario Soft Toy","code":"E002","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":101,"title":"8 Bit Mario Soft Toy","code":"E003","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":102,"title":"Link Gold Wheel","code":"E004","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":103,"title":"Super Mario Maker Gamepad Protector","code":"E005","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":104,"title":"Splatoon Gamepad Cover","code":"E006","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":105,"title":"Yoshi Mini Bag","code":"E007","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":106,"title":"Mario Red Wheel","code":"E008","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":107,"title":"The Legend of Zelda - Hylian Shield Backpack","code":"E009","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":108,"title":"Luigi Green Wheel","code":"E010","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":109,"title":"Mario Kart 8 digital download pack","code":"E011","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":110,"title":"Mario Hat","code":"E012","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":111,"title":"Luigi Hat","code":"E013","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":112,"title":"Super Smash Bros. Classic Battle Pad","code":"E014","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":113,"title":"amiibo Display case","code":"E015","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":114,"title":"Mario Holder","code":"E016","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":115,"title":"Pikachu Travel Multi Case","code":"E017","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":116,"title":"Mario Travel Multi Case","code":"E018","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"},
{"id":117,"title":"Animal Crossing Multi Case and Stylus Kit","code":"E019","level_id":5,"created_at":"-0001-11-30 00:00:00","updated_at":"-0001-11-30 00:00:00"}];

types = [{"id":1,"title":"Wii U"},{"id":2,"title":"3DS"},{"id":3,"title":"3DS XL"}];

link = [{"id":1,"item_id":1,"type_id":1},{"id":3,"item_id":2,"type_id":1},{"id":5,"item_id":3,"type_id":1},{"id":7,"item_id":4,"type_id":1},{"id":9,"item_id":9,"type_id":1},{"id":11,"item_id":10,"type_id":1},{"id":13,"item_id":11,"type_id":1},{"id":15,"item_id":12,"type_id":1},{"id":17,"item_id":13,"type_id":1},{"id":19,"item_id":14,"type_id":1},{"id":21,"item_id":15,"type_id":1},{"id":23,"item_id":16,"type_id":1},{"id":25,"item_id":17,"type_id":1},{"id":27,"item_id":18,"type_id":1},{"id":29,"item_id":19,"type_id":1},{"id":31,"item_id":20,"type_id":1},{"id":33,"item_id":21,"type_id":1},{"id":35,"item_id":22,"type_id":1},{"id":37,"item_id":23,"type_id":1},{"id":39,"item_id":24,"type_id":1},{"id":41,"item_id":33,"type_id":1},{"id":43,"item_id":34,"type_id":1},{"id":45,"item_id":35,"type_id":1},{"id":47,"item_id":36,"type_id":1},{"id":49,"item_id":37,"type_id":1},{"id":51,"item_id":38,"type_id":1},{"id":53,"item_id":39,"type_id":1},{"id":55,"item_id":40,"type_id":1},{"id":57,"item_id":41,"type_id":1},{"id":59,"item_id":42,"type_id":1},{"id":61,"item_id":43,"type_id":1},{"id":63,"item_id":44,"type_id":1},{"id":65,"item_id":45,"type_id":1},{"id":67,"item_id":46,"type_id":1},{"id":69,"item_id":47,"type_id":1},{"id":71,"item_id":48,"type_id":1},{"id":73,"item_id":49,"type_id":1},{"id":75,"item_id":50,"type_id":1},{"id":77,"item_id":51,"type_id":1},{"id":79,"item_id":52,"type_id":1},{"id":81,"item_id":53,"type_id":1},{"id":83,"item_id":54,"type_id":1},{"id":85,"item_id":55,"type_id":1},{"id":87,"item_id":66,"type_id":1},{"id":89,"item_id":67,"type_id":1},{"id":91,"item_id":68,"type_id":1},{"id":93,"item_id":69,"type_id":1},{"id":95,"item_id":70,"type_id":1},{"id":97,"item_id":71,"type_id":1},{"id":99,"item_id":99,"type_id":1},{"id":101,"item_id":100,"type_id":1},{"id":103,"item_id":101,"type_id":1},{"id":105,"item_id":102,"type_id":1},{"id":107,"item_id":103,"type_id":1},{"id":109,"item_id":104,"type_id":1},{"id":111,"item_id":105,"type_id":1},{"id":113,"item_id":106,"type_id":1},{"id":115,"item_id":107,"type_id":1},{"id":117,"item_id":108,"type_id":1},{"id":119,"item_id":109,"type_id":1},{"id":121,"item_id":110,"type_id":1},{"id":123,"item_id":111,"type_id":1},{"id":125,"item_id":112,"type_id":1},{"id":127,"item_id":113,"type_id":1},{"id":129,"item_id":5,"type_id":2},{"id":131,"item_id":6,"type_id":2},{"id":133,"item_id":25,"type_id":2},{"id":135,"item_id":26,"type_id":2},{"id":137,"item_id":27,"type_id":2},{"id":139,"item_id":28,"type_id":2},{"id":141,"item_id":29,"type_id":2},{"id":143,"item_id":30,"type_id":2},{"id":145,"item_id":31,"type_id":2},{"id":147,"item_id":32,"type_id":2},{"id":149,"item_id":33,"type_id":2},{"id":151,"item_id":34,"type_id":2},{"id":153,"item_id":35,"type_id":2},{"id":155,"item_id":38,"type_id":2},{"id":157,"item_id":39,"type_id":2},{"id":159,"item_id":40,"type_id":2},{"id":161,"item_id":41,"type_id":2},{"id":163,"item_id":42,"type_id":2},{"id":165,"item_id":43,"type_id":2},{"id":167,"item_id":52,"type_id":2},{"id":169,"item_id":56,"type_id":2},{"id":171,"item_id":57,"type_id":2},{"id":173,"item_id":58,"type_id":2},{"id":175,"item_id":59,"type_id":2},{"id":177,"item_id":60,"type_id":2},{"id":179,"item_id":61,"type_id":2},{"id":181,"item_id":62,"type_id":2},{"id":183,"item_id":63,"type_id":2},{"id":185,"item_id":64,"type_id":2},{"id":187,"item_id":65,"type_id":2},{"id":189,"item_id":72,"type_id":2},{"id":191,"item_id":73,"type_id":2},{"id":193,"item_id":74,"type_id":2},{"id":195,"item_id":75,"type_id":2},{"id":197,"item_id":76,"type_id":2},{"id":199,"item_id":77,"type_id":2},{"id":201,"item_id":78,"type_id":2},{"id":203,"item_id":79,"type_id":2},{"id":205,"item_id":80,"type_id":2},{"id":207,"item_id":81,"type_id":2},{"id":209,"item_id":82,"type_id":2},{"id":211,"item_id":83,"type_id":2},{"id":213,"item_id":84,"type_id":2},{"id":215,"item_id":85,"type_id":2},{"id":217,"item_id":86,"type_id":2},{"id":219,"item_id":87,"type_id":2},{"id":221,"item_id":88,"type_id":2},{"id":223,"item_id":89,"type_id":2},{"id":225,"item_id":90,"type_id":2},{"id":227,"item_id":91,"type_id":2},{"id":229,"item_id":100,"type_id":2},{"id":231,"item_id":101,"type_id":2},{"id":233,"item_id":110,"type_id":2},{"id":235,"item_id":113,"type_id":2},{"id":237,"item_id":114,"type_id":2},{"id":239,"item_id":115,"type_id":2},{"id":241,"item_id":116,"type_id":2},{"id":243,"item_id":117,"type_id":2},{"id":245,"item_id":7,"type_id":3},{"id":247,"item_id":8,"type_id":3},{"id":249,"item_id":25,"type_id":3},{"id":251,"item_id":26,"type_id":3},{"id":253,"item_id":27,"type_id":3},{"id":255,"item_id":28,"type_id":3},{"id":257,"item_id":30,"type_id":3},{"id":259,"item_id":31,"type_id":3},{"id":261,"item_id":32,"type_id":3},{"id":263,"item_id":33,"type_id":3},{"id":265,"item_id":34,"type_id":3},{"id":267,"item_id":35,"type_id":3},{"id":269,"item_id":38,"type_id":3},{"id":271,"item_id":39,"type_id":3},{"id":273,"item_id":40,"type_id":3},{"id":275,"item_id":41,"type_id":3},{"id":277,"item_id":42,"type_id":3},{"id":279,"item_id":43,"type_id":3},{"id":281,"item_id":52,"type_id":3},{"id":283,"item_id":56,"type_id":3},{"id":285,"item_id":57,"type_id":3},{"id":287,"item_id":58,"type_id":3},{"id":289,"item_id":59,"type_id":3},{"id":291,"item_id":60,"type_id":3},{"id":293,"item_id":61,"type_id":3},{"id":295,"item_id":62,"type_id":3},{"id":297,"item_id":63,"type_id":3},{"id":299,"item_id":64,"type_id":3},{"id":301,"item_id":65,"type_id":3},{"id":303,"item_id":92,"type_id":3},{"id":305,"item_id":93,"type_id":3},{"id":307,"item_id":94,"type_id":3},{"id":309,"item_id":95,"type_id":3},{"id":311,"item_id":96,"type_id":3},{"id":313,"item_id":97,"type_id":3},{"id":315,"item_id":98,"type_id":3},{"id":317,"item_id":100,"type_id":3},{"id":319,"item_id":101,"type_id":3},{"id":321,"item_id":110,"type_id":3},{"id":323,"item_id":113,"type_id":3}];

labels = [{"w":124,"h":22},{"w":173,"h":22},{"w":107,"h":22},{"w":206,"h":22},{"w":179,"h":22},{"w":178,"h":22},{"w":248,"h":22},{"w":255,"h":22},{"w":130,"h":22},{"w":86,"h":22},{"w":135,"h":22},{"w":69,"h":22},{"w":145,"h":22},{"w":108,"h":22},{"w":243,"h":22},{"w":103,"h":22},{"w":216,"h":22},{"w":158,"h":22},{"w":151,"h":22},{"w":153,"h":22},{"w":163,"h":22},{"w":156,"h":22},{"w":157,"h":22},{"w":299,"h":22},{"w":130,"h":22},{"w":159,"h":22},{"w":175,"h":22},{"w":284,"h":22},{"w":123,"h":22},{"w":186,"h":22},{"w":162,"h":22},{"w":149,"h":22},{"w":131,"h":22},{"w":119,"h":22},{"w":278,"h":22},{"w":131,"h":22},{"w":130,"h":22},{"w":130,"h":22},{"w":165,"h":22},{"w":269,"h":22},{"w":179,"h":22},{"w":167,"h":22},{"w":274,"h":22},{"w":149,"h":22},{"w":108,"h":22},{"w":110,"h":22},{"w":125,"h":22},{"w":132,"h":22},{"w":210,"h":22},{"w":194,"h":22},{"w":186,"h":22},{"w":155,"h":22},{"w":213,"h":22},{"w":209,"h":22},{"w":147,"h":22},{"w":282,"h":22},{"w":267,"h":22},{"w":169,"h":22},{"w":162,"h":22},{"w":142,"h":22},{"w":142,"h":22},{"w":139,"h":22},{"w":147,"h":22},{"w":155,"h":22},{"w":135,"h":22},{"w":178,"h":22},{"w":112,"h":22},{"w":130,"h":22},{"w":108,"h":22},{"w":208,"h":22},{"w":295,"h":22},{"w":114,"h":22},{"w":114,"h":22},{"w":114,"h":22},{"w":114,"h":22},{"w":114,"h":22},{"w":215,"h":22},{"w":107,"h":22},{"w":268,"h":22},{"w":285,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":105,"h":22},{"w":182,"h":22},{"w":232,"h":22},{"w":228,"h":22},{"w":231,"h":22},{"w":199,"h":22},{"w":215,"h":22},{"w":125,"h":22},{"w":99,"h":22},{"w":294,"h":22},{"w":153,"h":22},{"w":294,"h":22},{"w":97,"h":22},{"w":99,"h":22},{"w":132,"h":22},{"w":117,"h":22},{"w":278,"h":22},{"w":191,"h":22},{"w":106,"h":22},{"w":123,"h":22},{"w":324,"h":22},{"w":133,"h":22},{"w":251,"h":22},{"w":72,"h":22},{"w":64,"h":22},{"w":124,"h":22},{"w":145,"h":22},{"w":94,"h":22},{"w":178,"h":22},{"w":164,"h":22},{"w":294,"h":22}];


var data = [];
data.push([2,2,3,2,2]);
data.push([1,1,1,1,1]);

var numConsoles = types.length;//data.length;
var chosenConsole = -1;
/*
var numConsoleVariations = 0;
for (var i = 0; i < numConsoles; i++) {
    numConsoleVariations += data[i][0];    
}
*/
function loadConsoles()
{
   log("loadConsoles");
    clearImages(); // removes images from container.
    var count = 0;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if(item.level_id == 1)
        {
            var img = getImage(item.code + ".png");
            mc_container.appendChild(img);
			//log("creating image", i, item.code);
			TweenLite.to(img, 0, {x:-(imageSize*0.5) + (WID * count), y:-imageSize*0.5});
            var lbl = getImage(item.code + "_txt.png");
            var lblData = labels[i];
            TweenLite.to(lbl, 0, {x:-(lblData.w*0.5) + (WID * count), y:(imageSize * 0.5) -lblData.h*0.5});
            mc_container.appendChild(lbl);
            count++;
        }
    }
    numSelections = count;
    log("numSelections",numSelections);
    /*
	var numConsoles = 0;
	var numTypes = data.length;
	for (var i = 0; i < numTypes; i++) {
		var numVariations = data[i][0];
		for (var j = 0; j < numVariations; j++) {
			var img = getImage("_" + i + "_" + j + ".png");
			mc_container.appendChild(img);
			log("creating image", i, j);
			TweenLite.to(img, 0, {x:-(imageSize*0.5) + (WID * numConsoles), y:-imageSize*0.5});
			numConsoles++;
		}		
	}*/
	//log("numConsoles",numConsoles);
   // numSelections = numConsoles;
}
function clearImages()
{
   log("clearImages");
    while(mc_container.firstChild)  mc_container.removeChild(mc_container.firstChild);  
}
function loadImages()
{
	log("loadImages");
    clearImages();
    var count = 0;
    for (var i = 0; i < link.length; i++) {
        var linkVO = link[i];
       // log(linkVO.type_id == chosenConsole);
        if(linkVO.type_id == chosenConsole)
        {
            var item_id = linkVO.item_id - 1;   //non zero based :(
            var item = items[item_id];

            //log("\t" + item.level_id, selections.length +1);
            if(item.level_id == selections.length +1)
            {
                var img = getImage(item.code + ".png");
                mc_container.appendChild(img);
               // log("creating image", i, item.code);
                TweenLite.to(img, 0, {x:-(imageSize*0.5) + (WID * count), y:-imageSize*0.5});
                var lbl = getImage(item.code + "_txt.png");
                var lblData = labels[item_id];
                var scale = 1;
                if(lblData.w > WID - 20)
                {
                    scale = (WID - 20) / lblData.w;
                }
                TweenLite.to(lbl, 0, {x:-(lblData.w*0.5*scale) + (WID * count), y:(imageSize * 0.5) -lblData.h*0.5*scale, scaleX:scale, scaleY:scale});
                mc_container.appendChild(lbl);
                count++;
            }
        }
        
    }
    numSelections = count;
    return;
    var selectedConsole;
    for (var i = 0; i < data.length; i++) {
        var numVariations = data[i][0];
    }
	var type = selections.length; //0 - hardware, 1 - software, 2 - amiibo, 3 - accessory, 4 - gift

	//load consoles
	if(type == 0)
	{
		var num = typeData[type];
	}else{
	    console = selections[0];
		//var selection = selections[selections.length-1];
       // var instock = data[instock];
       // log("instock:"+instock);
		var src = "_"+console+"_"+type+"_";
		var typeData = data[console];
		var num = typeData[type];
		log("console", console, src, num);
		for (var i = 0; i < num; i++) {
			
			var img = getImage(src + i + ".png");
            mc_container.appendChild(img);
			TweenLite.to(img, 0, {x:-(imageSize*0.5) + (WID * i), y:-imageSize*0.5});
			/*
			img.style.margin = "0 auto";
			img.style.position = "absolute";
			img.style.margin = "auto";
			img.style.top = "0";
			img.style.bottom = "0";
			img.style.left = "0";
			img.style.right = "0";*/

			/*
			var img = document.createElement("div");
			img.className = "do";
			img.style.width = imageSize + "px";
			img.style.height = imageSize + "px";
    		img.style.background ="url("+src + i + ".png" + ") no-repeat";
    		img.style.transformOrigin = "50% 50%";
    		mc_container.appendChild(img);*/

		}
        numSelections = num;
	}
	
}
function getImage(src)
{
    //log("getImage");
    var img = new Image();
    img.className = "do";
    img.src = src;
    return img;
}
//picks a random console and random addons
function generateRandomBundle()
{
    log("generateRandomBundle");
    var consoles = [];
    var randomItems = [[],[],[],[]];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if(item.level_id == 1)
        {
            consoles.push(item);
        }
    }
    var console = getRandomIndexFromArray(consoles);
    initialConsole = console;
    var consoleType;
    //need to work out which of the 3
    for(var i = 0; i < link.length; i++)
    {
        var vo = link[i];
        if(vo.item_id == console + 1)
        {
            consoleType = vo.type_id;
            break;
        }
    }
    
    for (var i = 0; i < link.length; i++) {
        var linkVO = link[i];
        if(linkVO.type_id == consoleType)
        {
            var item_id = linkVO.item_id - 1;   //non zero based :(
            var item = items[item_id];
            if(item.level_id == 1) continue;    //as its a console already
            randomItems[item.level_id-2].push(item);
        }
    }
    log("random console", console, consoles[console].code);
    log("random items", randomItems);
    
    var consoleImage = getImage(consoles[console].code+".png");
    mc_box_contents.appendChild(consoleImage);
    
    for(var i = 0; i < randomItems.length; i++)
    {
        var item = getRandomItemFromArray(randomItems[i]);
        var image = getImage(item.code+".png");
        mc_box_contents.appendChild(image);
    }
    var boxW = 256;
    var boxHW = boxW * 0.5;
    for(var i = 0; i < mc_box_contents.children.length; i++)
    {
        var y = (i % 2 == 0) ? -35 : -15;
        TweenLite.to(mc_box_contents.children[i], 0, {y:y-(138*0.25), x:-boxHW+(138*0.25) + i * 30, scaleX:0.5, scaleY:0.5});
        TweenLite.from(mc_box_contents.children[i], 0.25, {delay:i * 0.2, alpha:0, y:-150});
    }
    /*
    var console = getRandomIndexFromArray(data);
    var variation = getRandomIndexFromArrayLength(data[console][0]);
    var consoleImage = getImage("_"+console+"_"+variation+".png");
    mc_box_contents.appendChild(consoleImage);
    
    for(var i = 1; i < data[console].length; i++)
    {
        variation = getRandomIndexFromArrayLength(data[console][i]);
        var image = getImage("_"+console+"_"+i+"_"+variation+".png");
        mc_box_contents.appendChild(image);
    }
    
    
    var boxW = 256;
    var boxHW = boxW * 0.5;
    for(var i = 0; i < mc_box_contents.children.length; i++)
    {
        var y = (i % 2 == 0) ? -35 : -15;
        TweenLite.to(mc_box_contents.children[i], 0, {y:y-(138*0.25), x:-boxHW+(138*0.25) + i * 30, scaleX:0.5, scaleY:0.5});
        TweenLite.from(mc_box_contents.children[i], 0.25, {delay:1+i * 0.2, alpha:0, y:-150});
    }
    */
    
}
function putImageInBox(image)
{
    log("putImageInBox");
    var num = mc_box_contents.children.length;
    mc_box_contents.appendChild(image);   
    var yoff = (num % 2 == 0) ? -35 : -15;
    var boxW = 256;
    var boxHW = boxW * 0.5;
    var x = (150 - (imageSize * 0.5)) - mc_box._x - mc_box_contents._x;
    var y = (mc_container._y - (imageSize * 0.5)) - mc_box._y - mc_box_contents._y;
    TweenLite.to(image, 0, {x:x, y:y});
    
    TweenLite.to(image, 0.25, {y:yoff-(138*0.25), x:-boxHW+(138*0.25) + num * 30, scaleX:0.5, scaleY:0.5});
}
function openBox()
{
	log("openBox");
    var lid = mc_box.lastElementChild;
	//, x:lid.getBoundingClientRect().width * 0.1, , scaleX:0.8, scaleY:0.8

    //original animation
	//TweenLite.to(lid, 0.25, {y:-50, ease:Power1.easeOut});
	//TweenLite.to(lid, 0.25, {y:-200, x:-300, ease:Power1.easeOut, delay:0.25});

    //drop from high above 
    TweenLite.to(lid, 0.25, {y:-600, ease: Back.easeIn.config(1), delay:0.25});

}
function closeBox()
{
	log("closeBox");
    //, x:0, scaleX:1, scaleY:1
	//TweenLite.to(mc_box.lastElementChild, 0.25, {y:0,ease:Power1.easeIn, scaleX:1, scaleY:1});
//	TweenLite.to(mc_box.lastElementChild, 0.25, {y:-50,x:0,ease:Power1.easeIn});
	TweenLite.to(mc_box.lastElementChild, 0.25, {y:0,x:0,ease: Back.easeOut.config(1), delay:0.25});
}
function setupButton(button)
{
	log("setupButton");
    TweenLite.to(button.children[button.children.length-1], 0, {alpha:0});
	button.style.pointerEvents = "none";
	button.firstElementChild.style.pointerEvents = "all";
	button.addEventListener("mouseover", onButtonOver);
	button.addEventListener("mouseout", onButtonOut);
}
function onButtonOver(event)
{
	log("onButtonOver");
    TweenLite.to(this.children[this.children.length-1], 0.25, {alpha:1});
}
function onButtonOut(event)
{
	log("onButtonOut");
    TweenLite.to(this.children[this.children.length-1], 0.25, {alpha:0});
}

/*
//////////////////////////////////////////////////////////////////////////// 
             _              _ _       _   
  __ _ _   _| |_ ___  _ __ (_) | ___ | |_ 
 / _` | | | | __/ _ \| '_ \| | |/ _ \| __|
| (_| | |_| | || (_) | |_) | | | (_) | |_ 
 \__,_|\__,_|\__\___/| .__/|_|_|\___/ \__|
                     |_| 
//////////////////////////////////////////////////////////////////////////// 
*/

/* needs to:

    - after 5secs of inactivity
    - don't show select button
    ----------------------------------------    CONSOLES
    - go to first screen (with arrows and consoles)
    - get a random number between limit of consoles and 0 
    - click to that so it falls into basket
    - go to next screen
    ----------------------------------------    GAMES / CONTROLLER
    - get a random number between limit of game/controller and 0
    - click to that so it falls into basket
    - go to next screen
    ----------------------------------------    AMIBO
    - get a random number between limit of game/controller and 0
    - click to that so it falls into basket
    - go to next screen
    ---------------------------------------     CASE / T-SHIRT
     - get a random number between limit of game/controller and 0
    - click to that so it falls into basket
    - go to next screen
     ---------------------------------------     CHOOSE A GIFT
    - get a random number between limit of game/controller and 0
    - click to that so it falls into basket
    - go to next screen
      ---------------------------------------   BUILD A BUNDLE
    - go to front screen again 

*/

function autoPilot()
{
    log("autoPilot");
    autoPilotOn = true;
    buildBundle();
  //  initialConsole = getRandomIndexFromArray(consoles);
    log(initialConsole);
    //get the number of children in the mc_container baby
    autoPilotRun();

}


function autoPilotRun()
{
  
   if(autoPilotCounter < 5){
          var i =0;
      var containerNum = (mc_container.children.length)*0.5;
         log("container amount:"+containerNum);

         var autochose = Math.floor(Math.random()*containerNum);//initialConsole;//Math.floor(Math.random()*initialConsole);
         if(autochose < 1) {
          autochose++;
        }
         log("console chose: "+autochose);
         //lots of tweenLite delays
        for (i = 0; i < autochose; i++) { 
         TweenLite.delayedCall(0.5*i,onNext);
         TweenLite.delayedCall(0.5*i,onNextOverOut);
         log(i);
        if(i == autochose-1){
          TweenLite.delayedCall((i*0.5)+0.5,onSelect); //little delay than drops that mutha into the box (put the f'n lotion in the basket!)
            log("ready for next thing");
             TweenLite.delayedCall((i*0.5)+1,autoPilotRun);
         }

     } 
     autoPilotCounter++;
   } else {
    log("we are done!");
   }
   
}

function killAutoPilot()
{
    log("killAutoPilot");
    //kill all the delayed tweens and stuff associate with the autopilot
    TweenLite.killDelayedCallsTo(autoPilot);
    TweenLite.killDelayedCallsTo(autoPilotRun);
    TweenLite.killDelayedCallsTo(onNext);
    TweenLite.killDelayedCallsTo(onNextOverOut);
    TweenLite.killDelayedCallsTo(onSelect);
    resetBundle();
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
	log("animateIntro");

    //logo animation of justice
	TweenLite.from(mc_logo, 0.5, {y:-100, ease:Back.easeOut.config(1.25), delay:0.25});
	

	//intro animation of doom
	//TweenLite.from(mc_intro.children[2], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25), delay:0.75});
	TweenLite.from(mc_intro.children[1], 0.25, {x:"+=300", ease:Back.easeOut.config(1.25), delay:1.5});
	TweenLite.from(mc_intro.children[0], 0.25, {x:"-=300", ease:Back.easeOut.config(1.25), delay:1.75});

    TweenLite.from(mc_intro.children[2], 0.5, {alpha:0,scaleX:2, scaleY:2, ease: Expo.easeOut, delay:0.75 });

	TweenLite.delayedCall(0.75, explodeParticles);

    TweenLite.to(mc_box,0,{y:HEI*0.53});
    TweenLite.from(mc_box,1,{y:HEI*0.3,delay:0.8, ease: Elastic.easeOut.config(1, 0.3)});

    TweenLite.to(btn_build,0,{y:HEI*0.5});

    TweenLite.delayedCall(7,autoPilot);

    //TweenLite.from(mc_box,1,{y:100, ease: Expo.easeOut,});
	//TweenLite.delayedCall(0.5, wiggleBox);

	//TweenLite.from(btn_start, 0.5, {scaleX:0, scaleY:0, delay:0.5, ease:Back.easeOut.config(1.25)});
}

function autoPilotOutro()
{
    log("animatePilotOutro");
      //intro animation of doom
    show(mc_intro);
    //TweenLite.from(mc_intro.children[2], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25), delay:0.75});
    TweenLite.from(mc_intro.children[1], 0.25, {x:"+=300", ease:Back.easeOut.config(1.25), delay:1});
    TweenLite.from(mc_intro.children[0], 0.25, {x:"-=300", ease:Back.easeOut.config(1.25), delay:1.25});
    TweenLite.from(mc_intro.children[2], 0.5, {alpha:0,scaleX:2, scaleY:2, ease: Expo.easeOut, delay:0.75 });

    resetParticles();
    TweenLite.delayedCall(0.75,explodeParticles);
   //TweenLite.delayedCall(3,hideParticles);

    TweenLite.to(btn_build,0.5,{y:HEI*0.5,ease: Back.easeIn.config(2)});
    TweenLite.delayedCall(0.5,throbMe,[btn_build]);
    TweenLite.to(mc_box,1,{y:HEI*0.53, ease: Back.easeIn.config(1, 0.3)});
    TweenLite.delayedCall(3,pauseSnow);

}
function animateOutro()
{
   log("animateOutro");

    show(btn_cta);
    TweenLite.to(btn_cta,0,{y:HEI*0.442});
    TweenLite.from(btn_cta, 0.5, {alpha:0, delay:2});
 
   //------------------------------------------------------------------------------------------------------------------------------AFTER BOX IS COMPLETE
    mc_outro.visible = true;
	//outro animation of doom
	//TweenLite.from(mc_outro.children[1], 0.5, {x:"-=300", ease:Back.easeOut.config(1.25), delay:0.75});
    TweenLite.from(mc_outro.children[1], 0.5, {alpha:0,scaleX:2, scaleY:2, ease: Expo.easeOut, delay:0.75 });
	TweenLite.from(mc_outro.children[0], 0.5, {x:"+=300", ease:Back.easeOut.config(1.25), delay:1});
    resetParticles();
   //TweenLite.to(mc_particles,0,{y:HEI*0.65});
   // explodeParticles();

    TweenLite.to(mc_box,1,{y:HEI*0.53, ease: Elastic.easeOut.config(1, 0.3)});
	TweenLite.delayedCall(2, toggleBox);
    TweenLite.delayedCall(0.75,explodeParticles);
	//TweenLite.delayedCall(0.5, wiggleBox);
    
    TweenLite.delayedCall(4,hideFlakes);
    TweenLite.delayedCall(3,hideParticles);

    TweenLite.delayedCall(1,giveBoxOpenClose);
}

function giveBoxOpenClose()
{
     mc_box.addEventListener("click", toggleBox);
}
function wiggleBox() //wiggle wiggle wiggle!
{
	log("wiggleBox");
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
	log("animateBox");
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

function resetParticles()
{
    log("resetParticles");
    for (var i = 0; i < mc_particles.children.length; i++) {
        var particle = mc_particles.children[i];
        var radius = 500;
        var x = Math.sin(Math.random() *  Math.PI*2) * radius;
        var y = Math.cos(Math.random() *  Math.PI*2) * radius;

        if(Math.abs(x) < 50) x = Math.abs(x)/x + 50;
        if(Math.abs(y) < 50) y = Math.abs(y)/y + 50;
        //x = x < 0 ? "-=" + (-x) : "+=" + x;
        //y = y < 0 ? "-=" + (-y) : "+=" + y;
        TweenLite.to(particle, 0, {scaleX:0, scaleY:0,x:0,y:0,alpha:1});      
    };  
}

function explodeParticles()
{
    log("explodeParticles");

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
        TweenLite.to(particle, t, {scaleX:scale, scaleY:scale, rotation:Math.random()*360, x:x, y:y, ease: Power1.easeOut});    //, onComplete:mc_particles.removeChild, onCompleteParams:[particle]
        TweenLite.to(particle, t, {alpha:0, ease: Power4.easeIn});
    };  
 
    show(mc_particles);
}

function hideParticles()
{
    mc_particles.style.display = "none";
}

function handleClick(event)
{
	log("handleClick");

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	log("main click", window.clickTag);
	
	Enabler.exit('BackgroundExit');

	//cleanup
	//TweenLite.killDelayedCallsTo(showEndscreen);
	//showEndscreen(true);
}

function onClickCTA(event)
{
	log("onClickCTA");

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	
    var params = "";
    for(var i = 0; i < mc_box_contents.children.length; i++)
    {
        var src = mc_box_contents.children[i].src;
        src = src.substr(src.lastIndexOf("/")+1);
        params += src + "_";
    }
    params = params.substr(0, params.lastIndexOf("_"));
    params = params.split(".png").join("");
    log("params", params);
	Enabler.exitOverride('BundleExit', "http://myperfectchristmasbundle.co.uk/bundle/"+params);

}
function handleOverOut(event)
{
	log("handleOverOut");
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