/*
 * SPEC
 * 	1. there is no difference between id and class, uses only id
 *  2. to style all instances of particular UI object use _(object)
 *  3. to style specific ones use id
 * 	4. font alone gets inherited 
 */


/*
 TODO
 	1. ideally this funciton shld have been prototype of base class window in titanium and every other object will get it by default
 	2. nice: this function shld figure out the corresponding style file by default
 */

var _s = {};

Titanium.include('defaultStyles.js')

// takes an array of style sheet file names
function Styles(options) {
	this.styles = {};
	
	/* can this be converted into fluid layout ?? */

	this.gridColumnWidth = 45;
	this.gridGutterWidth = 20;

	// now whole range of default can be used here
	
	
	for(var i=0;i<options.length;i++) {
		var fileName = options[i];
		Titanium.include(fileName);
		var vals = fileName.split('/');
		var name = vals[vals.length-1];
		var nameString = '_' + (fileName.split('.'))[0];
		var spaceName = _s[nameString];
		
		for(key in spaceName) {
			this.styles[key] = spaceName[key];
		}
	}
	
	/*
	 * utility functions, still not made private
	 */
	this.spanSize = function(range) {
		var arr = range.split('-');
		if(arr[0] != 'span' && arr[0] != 'offset') {
			return range; // return what ever was passed, helpful 
		}
		range = arr[1];
		return (range*this.gridColumnWidth + (range-1)*this.gridGutterWidth);
	}

	
	/*
	 * function called by controls to apply the style
	 */	
	this.apply = function(control) {
		var idspace = this.styles;
		var id = control.id;
		var className = control.className;

		// TODO: hardcoded values, can be changed to regex
		var controlName = control.toString().slice(12, (control.toString().length - 1));

		// read info from variable whose name is specified in id/className values
		var idProp = idspace[id];

		// if id is defined, ignore everything else
		// NOTE: once id is set there is no more recursion post that level
		if(idProp != undefined) {
			for(var key in idProp) {
				control[key] = this.spanSize(idProp[key]);
			}
			return;
		}

		// handle the generic control type styling
		var genericProp = idspace[controlName];
		if(undefined != genericProp) {
			for(var key in genericProp) {
				control[key] = this.spanSize(genericProp[key]);
			}
		}

		// this will override control level properties where its defined at class level
		var classProp = idspace[className];
		if(undefined != classProp) {
			for(var key in classProp) {
				control[key] = this.spanSize(classProp[key]);
			}
		}

		var childs = control.getChildren();
		if(undefined == childs) {
			return;
		}

		// TODO: some reason for in loop is not working fine
		for(var i = 0; i < childs.length; i++) {
			var ch = childs[i];
			// child has id set, so dont set any inherited properties
			if(undefined != ch.id && undefined != idspace[ch.id]) {
				return;
			}

			// inherit parent properties
			for(var key in genericProp) {
				if(key.match(/font/gi)) {
					ch[key] = genericProp[key];
				} // write other else if properties here, to support them also, like foreground color etc.,
			}
			for(var key in classProp) {
				if(key.match(/font/gi)) {
					ch[key] = classProp[key];
				} // write other else if properties here, to support them also, like foreground color etc.,
			}

			// now call function to style children
			this.apply(ch);
		}
	}
	
}

