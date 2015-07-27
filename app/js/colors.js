define(function() {

    var Colors = function(){
        this.okay =  true;
        this.color = 'red';
        this.whichColor = function() {
	    	return("whichColor(): "+this.color);
    	};
    };
    
    return Colors;
});