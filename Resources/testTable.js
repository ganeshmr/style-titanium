var rows = [];
var newwin = Titanium.UI.createWindow({});


rows[0] = Titanium.UI.createTableViewRow({
	title: "Row 1"
});
rows[1] = Titanium.UI.createTableViewRow({
	title: "Row 2"
});

var table = Titanium.UI.createTableView({
	data: rows
});

newwin.add(table);
styleControl(table,'appStyle.js');

newwin.open();
