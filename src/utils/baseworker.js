
self.onmessage = function(message){

	var funcStr = message.data.function;
	var funcParams = funcStr.slice(funcStr.indexOf('(') + 1, funcStr.indexOf(')')).trim();
	var funcBody = funcStr.slice(funcStr.indexOf('{') + 1, -1).trim();
	var process = new Function(funcParams, funcBody);

	process(message.data.params, message.data.transfers, self.postMessage);
	return null;
}
