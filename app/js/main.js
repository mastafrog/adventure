"use strict";

requirejs.config({

    baseUrl: 'app',
    paths: {
        main  : 'main' ,
        jquery:     '../libs/jquery-2.1.4.min',
        createjs:   '../libs/easeljs-0.8.1.min',
        preload:    '../libs/preloadjs-0.6.1.min',
        tween:      '../libs/tweenjs-0.6.1.min'
    },
    shim: {
        createjs:   {exports: 'createjs'},
        preload:    {exports: 'preload'},
        tween:      {exports: 'tween'}
        }

    });


require( ['jquery', 'createjs', 'preload', '../js/character', 'tween'],
    function() {
        var $           = require('jquery'), 
            createjs    = require('createjs'),
            preload     = require('preload'),
            tween       = require('tween'),
            character   = require('../js/character');

    var imagesLoaded = false;
    var imagescount = 2;
    var stage, preload, guy, charDir;

    function handleFileComplete(event) {
        console.log("fileload complete");
        var item = event.item; // A reference to the item that was passed in to the LoadQueue
        var type = item.type;

         // Add any images to the page body.
         if (type == createjs.LoadQueue.IMAGE) {
             imagescount -= 1;
         }
         if (imagescount === 0){
            console.log("render");
            render();

         }
    } 

    function loadImages() {
        preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", handleFileComplete);
        preload.loadFile({id:"bg", src:"assets/bgs/Ghost Trick Supers Office.png"});
        preload.loadFile({id:"guybrush_sprite", src:"assets/sprites/gb_walk.png"});
    }

    function setHorisontalDirection(x, targetx) {
        charDir = ((x - targetx) >= 0 ? 1 : -1);
    }

    function stopCharacterInDir(){
        if(charDir <= 0){ guy.gotoAndPlay("standRight");}
        else { guy.gotoAndPlay("standLeft");}
    }

    function render() {
        var Char = new character;

        $(document).ready(function() {

            stage = new createjs.Stage("CANVAS");
            var BOTTOM = 200;
            var roomBg = new createjs.Bitmap(preload.getResult("bg"));
            stage.addChild(roomBg);
            createjs.Ticker.addEventListener("tick", handleTick);

            var data = {
                images: [preload.getResult("guybrush_sprite")],
                frames: {width:104, height:150},
                animations: {
                    standRight:12,
                    standLeft:13,
                    walkRight:[0,5],
                    walkLeft:[6,11]
                }
            };

            var spriteSheet = new createjs.SpriteSheet(data);
            guy = new createjs.Sprite(spriteSheet, "standRight");
            guy.framerate = 12;
            stage.addChild(guy);

            guy.setTransform(BOTTOM, 200);

            function handleTick(event) {
                stage.update();
            }

            roomBg.addEventListener("click", handleClick);
            function handleClick(event){

                var targetX = event.stageX-25;
                var dist = Math.abs(guy.x - event.stageX)-25;
                setHorisontalDirection(guy.x, event.stageX);

                if(charDir <= 0){ guy.gotoAndPlay("walkRight"); console.log("walkRight");}
                else { guy.gotoAndPlay("walkLeft"); console.log("walkLeft");}

                createjs.Tween.get(guy, {override:true})
                        .to({ x: targetX, y: BOTTOM }, dist*guy.framerate)
                        .call(stopCharacterInDir);
            }

            stage.addEventListener("mousedown", handlePress);
            function handlePress(event) {                           // A mouse press happened.
                event.addEventListener("mousemove", handleMove);    // Listen for mouse move while the mouse is down:
            }
            function handleMove(event) {
                console.log(event);
            }

            stage.update();
            });
    }

    function init() {
        loadImages();
    };

    init(); 

});