define(['jquery','../js/colors'], function() {
    var colors  = require('../js/colors'),
        $       = require('jquery');

    var Character = function(){

        var Colors = new colors;

        this.color = "blue";

       if(Colors.okay) {
            console.log("Colors are ok!!!");
            console.log(Colors.whichColor());
        }

        this.testing = function(){
            this.color = Colors.color;
            console.log("Asigned new Color Colors.color -> "+this.color);
            $('#canvas').css('background-color', this.color);
        };
    };

    return Character;
});