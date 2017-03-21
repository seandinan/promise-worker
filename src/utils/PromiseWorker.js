/*
Wraps a Web Worker inside of a promise. Takes up to 3 arguments.

processFunc: The function to be processed by the worker. Whatever this function returns is what the worker will return. Will be called as follows: processFunc(params, transfers, onFinish). Including the onFinish callback allows the processFunc to have access to the worker's self.postMessage method so it can have better control over what gets sent back to the main thread.
processParams[optional]: Parameters to be passed into the processFunc.
transferablesArray[optional]: An array of transferable objects. See https://developer.mozilla.org/en-US/docs/Web/API/Transferable for more on what qualifies as a transferable and the consequences of using them.

Example:
let worker = new PromiseWorker(processFunc[, messageParams, transferablesArray]);
worker.then(result => {
	// Do something with the result
}).catch(err => {throw new Error(err)});

let worker = new PromiseWorker({}, [someBuffer])
 */

import Promise from 'bluebird';

export default function PromiseWorker(processFunc, processParams, transferablesArray = []){
	return new Promise((resolve, reject) => {
		if (window.Worker === undefined) reject('This browser does not appear to support the WebWorker API.');

		let worker = new Worker('src/utils/baseworker.js');

		worker.onmessage = (message) => {resolve(message.data)};

		worker.postMessage(
			{
				function: '' + processFunc,
				params: processParams,
				transfers: transferablesArray
			},
			transferablesArray);
	})
}
