
module.exports = {
	JSON2string: function(object){
		function isJsonString(jsonString) {
			try {
				var o = JSON.parse(jsonString);
				if (o && typeof o === "object" && o !== null) {
					return o;
				}
			}
			catch (e) { }

			return false;
		}
		if(isJsonString(object)) {
			object = JSON.parse(object);
		}
		return JSON.stringify(object,null, 2);
	},
	decodeURI: function(str) {
		return decodeURI(str);
	}
}