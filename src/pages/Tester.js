import React from 'react';
import PromiseWorker from './../utils/PromiseWorker';

export default class Tester extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let doStuff = (params, transfers, onFinish) => {
			let result = `Hi! I'm ${params.name}. I'm ${params.type}.`;
			onFinish({result, other: params.buffer}, [params.buffer]);
			return null;
		}

		var buffer = new ArrayBuffer(2000);

		let worker = new PromiseWorker(doStuff, {
			name: 'Toby',
			type: 'adorable',
			buffer,
		}, [buffer]);

		worker.then(response => {
			console.log('RESPONSE: ', response);
		}).catch(err => {throw new Error(err)});
	}

	render(){
		return <div>Runnin...</div>
	}
}
