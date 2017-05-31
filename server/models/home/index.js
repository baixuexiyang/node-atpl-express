axios = require('axios');
exports.test = function() {
	return axios({
	  method:'get',
	  url:'http://192.168.119.162:9090/test.json'
	});
};
