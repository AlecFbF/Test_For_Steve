//SETUP
var local = window.location.protocol === "file:";

var WID = 300;			//width of unit
var HEI = 600;			//height of unit
var rich = false;

//device checker thing
var checker;

var snowflakes = [];
var snowDuration = 20; // how long the snow should run for;
var snowDeath = false;

var autoPilotOn = false; // when no interactivity this will be true;
var initialConsole;
var autoPilotCounter = 0;

var exitURL; //dynamic exit URL cobbled together from dynamic sheet columns

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
    var mc_intro1 = $("mc_intro1");
    var mc_intro2 = $("mc_intro2");
    var mc_outro = $("mc_outro");
    var mc_countdown = $("mc_countdown");
        var mc_d0 = $("mc_d0");
        var mc_d1 = $("mc_d1");
    var btn_buy = $("btn_buy"); 
    var mc_roundel = $("mc_roundel"); 
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


/*
INTRO
    logo
    countdown
MAIN
    order
    bundle sequence
MAIN (no u's)
    give the gift
    bundle sequence
END
    endscreen


*/

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


    Enabler.setProfileId(1063722);  //1062599
    var devDynamicContent = {};

    devDynamicContent.Nintendo_Phase3_remarketing_u7= [{}];
    devDynamicContent.Nintendo_Phase3_remarketing_u7[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u7[0].id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u7[0].u7 = ["A001"];
    devDynamicContent.Nintendo_Phase3_remarketing_u7[0].isDefault = false;

    devDynamicContent.Nintendo_Phase3_remarketing_u7[0].consoleURL = "http:\/\/store.nintendo.co.uk\/build-your-own-bundle\/wii-u.list?widget_id=136766";
    devDynamicContent.Nintendo_Phase3_remarketing_u7[0].utmURL = "?utm_source=%s&utm_medium=Display&utm_campaign=BYOB&utm_content=Phase3";


    devDynamicContent.Nintendo_Phase3_remarketing_u8= [{}];
    devDynamicContent.Nintendo_Phase3_remarketing_u8[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u8[0].id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u8[0].u8 = ["B001"];
    devDynamicContent.Nintendo_Phase3_remarketing_u8[0].isDefault = false;
    devDynamicContent.Nintendo_Phase3_remarketing_u9= [{}];
    devDynamicContent.Nintendo_Phase3_remarketing_u9[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u9[0].id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u9[0].u9 = ["C001"];
    devDynamicContent.Nintendo_Phase3_remarketing_u9[0].isDefault = false;
    devDynamicContent.Nintendo_Phase3_remarketing_u10= [{}];
    devDynamicContent.Nintendo_Phase3_remarketing_u10[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u10[0].id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u10[0].u10 = ["D001"];
    devDynamicContent.Nintendo_Phase3_remarketing_u10[0].isDefault = false;
    devDynamicContent.Nintendo_Phase3_remarketing_u11= [{}];
    devDynamicContent.Nintendo_Phase3_remarketing_u11[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u11[0].id = 0;
    devDynamicContent.Nintendo_Phase3_remarketing_u11[0].u11 = ["E001"];
    devDynamicContent.Nintendo_Phase3_remarketing_u11[0].isDefault = false;



    Enabler.setDevDynamicContent(devDynamicContent);

    bundle.push(dynamicContent.Nintendo_Phase3_remarketing_u7[0].u7[0],
                    dynamicContent.Nintendo_Phase3_remarketing_u8[0].u8[0],
                    dynamicContent.Nintendo_Phase3_remarketing_u9[0].u9[0],
                    dynamicContent.Nintendo_Phase3_remarketing_u10[0].u10[0],
                    dynamicContent.Nintendo_Phase3_remarketing_u11[0].u11[0]);

    var consoleExitURL = dynamicContent.Nintendo_Phase3_remarketing_u7[0].consoleURL;
    var utmParams = dynamicContent.Nintendo_Phase3_remarketing_u7[0].utmURL;
    utmParams = utmParams.replace('%s',Enabler.getDartSiteName());

    exitURL = consoleExitURL + utmParams + "_" + WID+"x"+HEI;

    if(dynamicContent.Nintendo_Phase3_remarketing_u7[0].isDefault &&
       dynamicContent.Nintendo_Phase3_remarketing_u8[0].isDefault &&
       dynamicContent.Nintendo_Phase3_remarketing_u9[0].isDefault &&
       dynamicContent.Nintendo_Phase3_remarketing_u10[0].isDefault &&
       dynamicContent.Nintendo_Phase3_remarketing_u11[0].isDefault){
        bundleFromCookie = false;
    }else{
        bundleFromCookie = true;
    }   

    //bundleFromCookie = false; //- uncomment to test

    //strip the trailing underscores from the default vars
    if(bundleFromCookie == false)
    {
        for (var i = 0; i < bundle.length; i++) {
            var id = bundle[i];
            if(id.indexOf("_" != -1))
            {
                bundle[i] = id.split("_").join("");
            }
        };
    }
    /*
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1= [{}];
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0]._id = 0;
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].id = 0;
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u0 = "A001";
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u1 = "B001";
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u2 = "C001";
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u3 = "D001";
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u4 = "E001";
    devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].default = "A001,B001,C001,D001,E001";
   
    Enabler.setDevDynamicContent(devDynamicContent);
    
    if(dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u0.indexOf("000") != -1)
    {
        bundle = devDynamicContent.Nintendo_Phase3_sheet_Sheet1[0].default.split(",");
        bundleFromCookie = false;
    }else{
        bundleFromCookie = true;
        bundle.push(dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u0,
                    dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u1,
                    dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u2,
                    dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u3,
                    dynamicContent.Nintendo_Phase3_sheet_Sheet1[0].u4);
    }
    */
    //bundleFromCookie = false;
	initSetup();	
}
function startFlow()
{
    if(rich)
    {
        if(isMobile)    richMobileFlow();
        else            richDesktopFlow();
    } else {
        if(isMobile)    standardMobileFlow();
        else            standardDesktopFlow();
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
	animateLogo();
    animateCountdown();

    TweenLite.delayedCall(3.5, bundleFromCookie ? animateIntro1 : animateIntro2);
    TweenLite.delayedCall(4, openBox);
    TweenLite.delayedCall(4, animateIndicator);
    TweenLite.delayedCall(4.75, loadBundle);

}

var bundleFromCookie = false;
var bundle = [];     //"A001","B001","C001","D001","E001"  (u0, u1, u2, u3, u4)

function loadBundle()
{
    loadNextItem();
}
var itemIndex = 0;
var loadedItems = [];
function loadNextItem()
{
    //all items loaded
    if(itemIndex > bundle.length-1)
    {
        animateEndscreen();
        return;
    }
    var code = bundle[itemIndex];
    var image = getImage(code + ".png", onItemLoaded);  
    var label = getImage(code + "_txt.png", onItemLoaded);   
    loadedItems.push({image:image, label:label});
    mc_box_contents.appendChild(image);
    TweenLite.to(image, 0, {x:-imageSize*0.5, y:-220-imageSize*0.5, alpha:0});
    var id;
    for (var j = 0; j < items.length; j++) {
        if(items[j].code == code)
        {
            id = j;
            break;
        }
    };
    var lblData = labels[id];
    
    mc_box_contents.appendChild(label);        
    TweenLite.to(label, 0, {x:-(lblData.w*0.5), y:-300+imageSize-lblData.h*0.5, alpha:0});
}
var itemsLoaded = 0;
function onItemLoaded()
{
    itemsLoaded++;
    if(itemsLoaded == 2)
    {
        itemsLoaded = 0;

        if(loadedItems.length > 1)
        {
             var previousLoadedItem = loadedItems[loadedItems.length-2];
             mc_box_contents.removeChild(previousLoadedItem.label);
             //TweenLite.to(previousLoadedItem.label, 0.15, {alpha:0, onComplete:mc_box_contents.removeChild, onCompleteParams:[previousLoadedItem.label]});
        }
        var index = loadedItems.length-1;
        var loadedItem = loadedItems[index];
        TweenLite.to(loadedItem.image, 0.25, {alpha:1});
        var scale = 0.5;
        var space = 30;
        var offset = -60;
        TweenLite.to(loadedItem.image, 0.5, {scaleX:scale, scaleY:scale, x:offset + (-imageSize*0.5*scale) + (index) * space, y:((index%2==0) ? -20 : 0 )+-imageSize*0.5*scale, delay:0.5, ease:Back.easeIn.config(1)});
        TweenLite.to(loadedItem.label, 0.25, {alpha:1});
        TweenLite.to(loadedItem.label, 0.25, {alpha:0, delay:1});
        TweenLite.delayedCall(2, loadNextItem);
        TweenLite.delayedCall(1.75, onSelect);

        itemIndex++;
    }
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

    //if u variables are available then we will show intro1, otherwise intro2
    hide(mc_logo, mc_countdown, mc_intro1, mc_intro2, mc_roundel, btn_buy, mc_indicator);

    var cons = bundle[0];
    cons = Number(cons.charAt(cons.length-1));  //last char
    
    if(cons < 5)            //wii u
    {
        hide(mc_roundel.children[1], mc_roundel.children[2]);
    }else if (cons < 7){    //3ds
        hide(mc_roundel.children[2], mc_roundel.children[3]);
    }else{                  //3ds - xl
         hide(mc_roundel.children[1], mc_roundel.children[3]);
    } 


    mc_logo.style.pointerEvents = "none";
    
    
    TweenLite.to(mc_box, 0, {y:400}); //-------------------------------------------------------------------------------------------------------------------HARD CODED BOX POSISH
    
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
	root.addEventListener("click", handleClick);
	root.addEventListener("mouseover", handleOverOut);
	root.addEventListener("mouseout", handleOverOut);

//--------------------------------------------------------------------------------------------------------------------------------------------------------------- PARTICLES (STARS)!!!!

/*
 for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 3; j++) {           
            mc_particles.appendChild(mc_particles.children[j].cloneNode(true));
        };
    };

    hide(mc_particles);
    TweenLite.to(mc_particles,0,{y:150});
*/
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
    TweenLite.to(dummy, snowDuration, {x:1, onUpdate:updateFlakes, onComplete:hideFlakes});

    //hide the lid
    //hide(mc_box.lastElementChild);
    
    //load in the console selection
	//loadConsoles();
    
    //no days til crimbo
    var dtc = getDaysUntilChristmas();

    //pad string
    if(dtc < 10) dtc = "0" + dtc;
    else dtc += "";

    //extract and insert (saucy)
    var d0 = getImage("txt_"+dtc.charAt(0)+".png", charLoaded);
    var d1 = getImage("txt_"+dtc.charAt(1)+".png", charLoaded);

    mc_d0.appendChild(d0);
    mc_d1.appendChild(d1);
}
var charsLoaded = 0;
function charLoaded()
{
    charsLoaded++;
    log("charLoaded", charsLoaded);
    if(charsLoaded == 2)
    {
        startFlow();
    }
}
function getDaysUntilChristmas(){
    var oneMinute = 60 * 1000;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;
    var today = new Date();
    var nextXmas = new Date();
    nextXmas.setMonth(11);
    nextXmas.setDate(25);
    if (today.getMonth() == 11 && today.getDate() > 25)     nextXmas.setFullYear(nextXmas.getFullYear() + 1);
    var diff = nextXmas.getTime() - today.getTime();
    diff = Math.floor(diff/oneDay);
    return diff;
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

function onSelect() //------------------------------------------------------------------------------------------------------------------------- // ON SELECT
{
	log("onSelect");
    log("indicator_index: "+indicator_index);
   
	indicator_index++
    if(indicator_index > 4) return;
    
	TweenLite.to(mc_indicator.lastElementChild, 0.5, {x:-40 + indicator_index * 20, ease:Power1.easeInOut});
	TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:-10, scaleX:1.4, scaleY:1.4, ease:Power1.easeIn});
	TweenLite.to(mc_indicator.lastElementChild, 0.25, {y:0, scaleX:1, scaleY:1, ease:Power1.easeOut, delay:0.25});

	//TweenLite.to(mc_stages.children[indicator_index-1], 0.5, {x:"-="+WID, ease:Power1.easeInOut, onComplete:hide, onCompleteParams:[mc_stages.children[indicator_index-1]]});
	//TweenLite.from(mc_stages.children[indicator_index], 0.5, {x:"+="+WID, ease:Power1.easeInOut, onStart:show, onStartParams:[mc_stages.children[indicator_index]]});
    
	//load the next image set
	//loadImages(); //------------------------------------------------------------------------------------------------------------------------------------------ LOAD IMAGES
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





function getImage(src, onload)
{
    //log("getImage");   
    var img = new Image();
    img.className = "do";
    if(typeof onload !== "undefined" && typeof onload === "function")
    {
        img.onload = onload;
    }
    img.src = src;
    return img;
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

function animateLogo()
{
    //logo animation of justice
    show(mc_logo);
    TweenLite.from(mc_logo, 0.5, {y:-100, ease:Back.easeOut.config(1.25), delay:0.25});
}
function animateCountdown()
{
    show(mc_countdown);

    TweenLite.to(mc_countdown, 0, {scaleX:0.75, scaleY:0.75});

    TweenLite.from(mc_countdown.children[0], 0.25, {x:"-=350", ease:Back.easeOut.config(1.25), delay:1.50});
    TweenLite.from(mc_countdown.children[1], 0.25, {x:"+=350", ease:Back.easeOut.config(1.25), delay:1.25});
    TweenLite.from(mc_countdown.children[2], 0.25, {x:"-=350", ease:Back.easeOut.config(1.25), delay:1.00});
    TweenLite.from(mc_countdown.children[3], 0.25, {x:"-=350", ease:Back.easeOut.config(1.25), delay:1.00});
    TweenLite.from(mc_countdown.children[4], 0.25, {x:"+=350", ease:Back.easeOut.config(1.25), delay:0.75});

    TweenLite.to(mc_countdown, 0.5, {scaleX:1, scaleY:1, ease:Back.easeOut.config(1.25), delay:2});
    TweenLite.to(mc_countdown, 0.25, {scaleX:2, scaleY:2, alpha:0, ease:Back.easeOut.config(1.25), delay:3});
}
function animateIntro1()
{
	log("animateIntro1");
    show(mc_intro1);
   	for (var i = 0; i < mc_intro1.children.length; i++)
    {
        TweenLite.from(mc_intro1.children[mc_intro1.children.length-1-i], 0.25, {x:(i%2==0) ? "+=300" : "-=300", ease:Back.easeOut.config(1.25), delay:i * 0.25});
    }
    TweenLite.to(mc_intro1, 0.25, {scaleX:0.8, scaleY:0.8, y:"-=70", ease:Back.easeOut.config(1.25), delay:mc_intro1.children.length * 0.25});
}
function animateIntro2()
{
    log("animateIntro2");
    show(mc_intro2);
    for (var i = 0; i < mc_intro2.children.length; i++)
    {
        TweenLite.from(mc_intro2.children[mc_intro2.children.length-1-i], 0.25, {x:(i%2==0) ? "+=300" : "-=300", ease:Back.easeOut.config(1.25), delay:i * 0.25});
    }
    TweenLite.to(mc_intro2, 0.25, {scaleX:0.8, scaleY:0.8, y:"-=20", ease:Back.easeOut.config(1.25), delay:mc_intro2.children.length * 0.25});
}
function animateIndicator()
{
    show(mc_indicator);
    for (var i = 0; i < mc_indicator.children.length; i++) {
         mc_indicator.children.length
         TweenLite.from(mc_indicator.children[i], 0.5, {scaleX:0, scaleY:0, ease:Power1.easeInOut, delay:i*0.2});
    };
    //TweenLite.to(mc_indicator.lastElementChild, 0.5, {x:-40 + indicator_index * 20, ease:Power1.easeInOut});
}
function animateEndscreen()
{
    closeBox();
    show(btn_buy);
    show(mc_roundel);
    throbMeNow(btn_buy);
    hide(mc_indicator);
    TweenLite.from(mc_roundel, 0.25, {scaleX:0, scaleY:0, ease:Power1.easeInOut, delay:0.75});
}
function giveBoxOpenClose()
{
     mc_box.addEventListener("click", toggleBox);
}


function handleClick(event)
{
	log("handleClick");

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	log("main click", window.clickTag);
	
	Enabler.exitOverride('BackgroundExit',exitURL);

	//cleanup
	//TweenLite.killDelayedCallsTo(showEndscreen);
	//showEndscreen(true);
}

function onClickCTA(event)
{
	log("onClickCTA");
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	Enabler.exit();
}
function handleOverOut(event)
{
	log("handleOverOut");
    return; //TODO
    if(event.type == "mouseover")
	{
		TweenLite.to(btn_buy.firstElementChild, 0.2, {alpha:1});
	}else{
		TweenLite.to(btn_buy.firstElementChild, 0.2, {alpha:0});
	}
}

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