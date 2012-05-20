Titanium.include('styleHandler.js'); // this is always done in app.js, once

var appStyle = new Styles(['appstyle.js']); // in each to apply styles

var win = Titanium.UI.createWindow({
	className: 'basewin'
	
});

var button = Titanium.UI.createButton({
	className: 'defButton',
	title: "My Button"
});

win.add(button);

var row = Titanium.UI.createTableViewRow({});

// global method for now
appStyle.apply(win);
win.open();
