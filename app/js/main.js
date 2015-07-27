"use strict";

requirejs.config({

    baseUrl: 'app',
    paths: {
        main  : 'main' ,
        jquery: '../libs/jquery-2.1.4.min',
//      createjs: '../libs/createjs-2015.05.21.min'
        createjs: '../libs/easeljs-0.8.1.min',
        preload: 'preloadjs-0.6.1.min.js'
      
    },
    shim: {
        createjs: {
            exports: 'createjs'
        },
        preload: {
            exports: 'preload'
        }

    }
});


require( ['jquery', 'createjs', 'preload', '../js/character'],
    function() {
        var $           = require('jquery'), 
            createjs    = require('createjs'),
            preload    = require('preload'),
            character   = require('../js/character');

    var stage, circle;
    
    function handleFileComplete(event) {
        console.log("fileload complete")
    } 

    function loadImage() {
        var preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", handleFileComplete);
        preload.loadFile("assets/bgs/Ghost Trick Supers Office.png");
        preload.loadFile("assets/sprites/gb_walk.png");
    }


    function init() {
        var Char = new character;

        $(document).ready(function() {

            stage = new createjs.Stage("CANVAS");
            var BOTTOM = 200;
            circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(0, 0, 40);
            circle.x = circle.y = 50;
            stage.addChild(circle);

            var image = new createjs.Bitmap("assets/bgs/Ghost Trick Supers Office.png");
            stage.addChild(image);
            createjs.Ticker.addEventListener("tick", handleTick);

            var data = {
                images: ["assets/sprites/gb_walk.png"],
                frames: {width:104, height:151},
                framerate: 5,
                animations: {
                    standRight:12,
                    standLeft:13,
                    runRight:[0,5],
                    runLeft:[6,11]

                }
            };



            var spriteSheet = new createjs.SpriteSheet(data);
            var animation = new createjs.Sprite(spriteSheet, "standRight");
            stage.addChild(animation);

            animation.setTransform(BOTTOM, 200);

            function handleTick(event) {
              //  image.x += 1;
                stage.update();
            } 

            circle.addEventListener("click", handleClick);
            function handleClick(event){
                console.log("blabla");
            }

            stage.addEventListener("mousedown", handlePress);
            function handlePress(event) {             // A mouse press happened.
                event.addEventListener("mousemove", handleMove);             // Listen for mouse move while the mouse is down:
            }
            function handleMove(event) {
                console.log(event);
            }

            stage.update();
            });

    };

    init(); 
});