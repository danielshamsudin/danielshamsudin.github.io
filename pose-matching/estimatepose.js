// include('@https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
// include('@https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet');

importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet');

var architecture = "ResNet50";
quantBytes = 4;
outputStride = 16;
console.log('Using architecture ' + architecture);
console.log('quantBytes: ' + quantBytes);
console.log('outputStride: ' + outputStride);


this.addEventListener('message', function(e) {
	// let start = Date.now();			
	posenet.load()
			.then(function(net){
			let _pose = net.estimateSinglePose(e.data, {
					// architecture: 'MobileNetV1',
					architecture: architecture,
					//fliphorizontal: true,
					outputStride: outputStride,
					inputResolution: {width: e.data.width, height:e.data.height},
					quantBytes: quantBytes       
				})
				tf.dispose(net);
				return _pose;
			})
			.then(function(poses){
				// let fps = Math.round(1000 / (Date.now() - start));
				// console.log('FPS: ' + fps);
				postMessage(poses);
				// tf.dispose(poses);
			});
	// console.log( tf.memory());	
})