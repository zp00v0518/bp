const cluster = require('cluster');

function createCluster(data) {
	return new Promise((resolve)=>{
		const worker = cluster.fork(data);
		worker.on('exit', (code, signal) => {
			resolve({worker, code, signal});
		});
	})

}

module.exports = createCluster;
