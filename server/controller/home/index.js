const home = require('../../models/home/');
// home page 
exports.index = function(req, res) {
	home.test()
	.then(function(data) {
		res.render('modules/home', {name: data.data.name});
	})
	.catch(function(err) {

	});
};
