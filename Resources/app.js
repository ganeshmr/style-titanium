Titanium.include('handler_style.js'); // this is always done in app.js, once

var appStyle = new Styles(['app_style.js']); // in each to apply styles


var win = Titanium.UI.createWindow({
	backgroundImage: 'ipad-grid.png'

});

var button = Titanium.UI.createButton({
	className: 'defButton',
	title: "My Button",
});

var row = Titanium.UI.createTableViewRow({});

// global method for now
appStyle.apply(win);
win.open();
