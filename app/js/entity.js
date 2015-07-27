define(function() {

    var Entity = function(){

        this.id = id;
        this.okay =  true;
        this.kind = kind;

        // Renderer
        this.sprite = null;

        // Modes
        this.isLoaded = false;

    	this.setName: function(name) {
            this.name = name;
        };

        this.setPosition: function(x, y) {
            this.x = x;
            this.y = y;
        };

    };
    
    return Entity;
});