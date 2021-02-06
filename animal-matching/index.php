<!DOCTYPE HTML>

<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<link href="style.css" rel="stylesheet" type="text/css">

	<script
	src="https://code.jquery.com/jquery-3.5.1.slim.js"
	integrity="sha256-DrT5NfxfbHvMHux31Lkhxg42LY6of8TaYyK50jnxRnM="
	crossorigin="anonymous"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>


    <!-- <link href="./lib/ihmodals/ihmodals.css" rel="stylesheet">-->
	<script src="./lib/ihmodals/ihmodals.min.js"></script> 

	<script  src="./lib/qr-generator/qrcode.min.js"></script>
	<script  src="./lib/qr-scanner/jsPretty/jsqrscanner.nocache.js"></script>

</head>
<style>

body{
font-size:2rem;
}

.modal {
	background: gray;
}
.modal-full {
	min-width: 90%;
    /* margin-left: 80; */
}

.modal-full{
    height: 80vh;
}

.modal-content {
	/* min-height: 100vh; */
}

.qrPreviewVideo {
	width: 300px;
}
.swap1 label{
	width:150px;
	height:100%;
}

.btn-lg{
	width:15rem;
	height:5rem;
}
</style>
<body>

<!-- <audio src="audio/jungle.mid" autoplay="true" display="visible" loop></audio>  -->
	<!-- <div class="container"> -->
<!-- Button trigger modal -->

		<center>
			<div id="home row" >
				<div class="col-12 ">
					<div class="row " style="background:black">
						<div class="col-4">
							<a href="#"><img src="image/home.png" style="width:50px"></a>
						</div>
						<div class="col-6">
						<span id="player-info" style="font-size:20px; color:white; padding:10px;font-family:Arial;float:left"></span> 
						</div>
					</div>
		

					<div class="row pb-5 pt-5 d-flex justify-content-center flex-row">
						<div class="col-lg-6 col-md-12 col-12 d-flex justify-content-center align-items-center mb-5 ">
							<div id="current-image-1" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
							
							<div id="current-image-2" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
							
							<div id="current-image-3" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
						</div>
						<div class="col-lg-6 col-md-12 col-12 d-flex justify-content-center align-items-center  ">
							<div id="panel" >
								<div id="description" class=" p-1">
									<center><span style="font-weight:bold; font-family:Verdana;color:white">HOW TO PLAY?</span></center><br>
									
									<span style="font-family:Arial;color:lightgreen">The different parts of image are sent to different smartphone, you are required to find another player to combine the result in a given time.<br><br></span>
									
									<center><span style="color:red;font-family:Arial;">**You can either enter the player id manually or scan the qr code.</span></center>
								</div>
								<div id="plyerid">
			<!-- 					
										<center><input type="text" name="playerid" placeholder="    Enter Player ID to exchange image"></center> -->
										<center>
											<select id="player_slt" name="playerid">
											</select>
										</center>
				
										<input type="submit" id="plyerbtn" name="plyerbtn" value="Match with player." style="background:white">

										<!-- <a href="scanner.php"><img src="image/scanner.png" style="width:30px; height:30px; border:2px solid white; padding:13px;background-color:lightgrey; border-radius:20px;"></a> -->
										<br>
										<div class="btn"><img src="image/scanner.png" style="width:150px; height:150px; border:2px solid white;  border-radius:20px;background:gray" data-toggle="modal" data-target="#qrScannerModal" onclick="openCamera()"></div>
										<div class="btn"><img src="image/qr-code.png" style="width:150px; height:150px; border:2px solid white;  border-radius:20px;" data-toggle="modal" data-target="#qrCodeModel"></div>
							
														<hr>
														<br>
										
										<span style="font-family:Arial;color:orange">Arrange your image id by selecting two images.</span><br><br>
										<!--<center><span style="color:red">**Enter the order of the image (first/second/third)</span></center>-->
										
									
										<!--<div id= "imgid">
											<input type="text" name="img1" placeholder="first/second/third">
											<input type="text" name="img2" placeholder="first/second/third">
											
										</div>-->

									
										<div id="arrange-image " class="swap1 text-center  d-flex justify-content-center w-100">
											<div id="current-image-1" class=" p-3">
												<input type="checkbox" id="img-1" name="img[]" value="first">
												<label for="img-1"><img id="image-src" src=""></label>
											</div>

											<div id="current-image-2" class=" p-3">
												<input type="checkbox" id="img-2" name="img[]" value="second">
												<label for="img-2"><img id="image-src" src=""></label>
											</div>

											<div id="current-image-3" class=" p-3">
												<input type="checkbox" id="img-3" name="img[]" value="third">
												<label for="img-3"><img id="image-src" src=""></label>
											</div>
										</div>
								
										<input type="submit" id="swapbtn" name="swapbtn" value="Swap Now" style="background:white">
								</div>
							</div>
						</div>
					</div>
				
				</div>
		
		</div>
	</center>


	</div>

	<div class="modal fade" id="openSwapModel" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-full " role="document">
			<div class="modal-content" style="opacity1">
				<!-- <div class="modal-header">
					<h5 class="modal-title">Modal</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div> -->
				<center>
				<div class="modal-body p-4" >
				<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#processExchangeModel" data-backdrop="static"  data-keyboard="false" >
				Launch demo modal
				</button> -->
					<div class="wrapper row" id="exchange-div" class="" >
						<div class="col-lg-6 col-md-12 col-12 d-flex justify-content-center p-5">
							<div id="current-image-1" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
							
							<div id="current-image-2" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
							
							<div id="current-image-3" class="image">
								<div id="image-id" class="imageid"></div>
								<img id="image-src" src="">	
							</div>
						</div>

						<div id="panel" class="col-lg-6 col-md-12 col-12" >
							<div id="description">

								<center style="font-family:Arial;font-weight:bold;color:white">You are exchanging images with Player <span id="opponent_span"></span></center><br>
								<center><span style="color:red;font-family:Arial;">**Image id can be found at top of the image.</span></center>
							</div>
							<div id="plyerid">

								<div id="exchange-img-div">
									<span style="font-family:Arial;color:orange;">Please select the image you want to exchange:</span><br>
									<div id="radio1" class="radio1">
									<input type="radio" id="plyer1-1" name="plyer1" value="0" checked>
									<label for="plyer1-1" id="label-1">12</label>

									<input type="radio" id="plyer1-2" name="plyer1" value="1">
									<label for="plyer1-2" id="label-2"></label>

									<input type="radio" id="plyer1-3" name="plyer1" value="2">
									<label for="plyer1-3" id="label-3"></label>
									</div>
							
									<br>

									<span style="font-family:Arial;color:orange;">Please select the image Player  wants to exchange:</span><br>
									<div id="radio2" class="radio2">
									<input type="radio" id="plyer2-1" name="plyer2" value="0" checked>
									<label for="plyer2-1">?</label>

									<input type="radio" id="plyer2-2" name="plyer2" value="1">
									<label for="plyer2-2">?</label>

									<input type="radio" id="plyer2-3" name="plyer2" value="2">
									<label for="plyer2-3">?</label>
								</div>
							
								<input type="submit" id="exchangebtn" name="plyerbtn" value="Exchange" style="background:white">
							</div>
						</div>


					</div>
				</div>
				</center>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">CLOSE</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="processExchangeModelReceiver" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" style="background:gray;">
		<div class="modal-dialog modal-dialog-centered modal-full " role="document" style="background:gray;opacity:1">
			<div class="modal-content" style="opacity1">
				<!-- <div class="modal-header">
					<h5 class="modal-title">Receiver</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div> -->
				<center>
				<div class="modal-body p-4" >
					<div class="row pt-5">
						<div class="col-4 d-flex justify-content-center">
							<div id="" class="image">	
								<img id="image-src" src="image/unknown.png">	
							</div>

						</div>
						<div class="col-4 d-flex justify-content-center align-items-center">
							<div id="" class=" ">	
								<img id="image-src" src="image/transfer.png" style="width:50px;height:40px" >	
							</div>
						</div>

						<div class="col-4 d-flex justify-content-center">
							<div id="receiver-image" class="image">
								<img id="image-src" src="">	
							</div>
						</div>



					</div>
					<button type="button" class="btn btn-secondary mt-5 btn-lg" id="rejectExchangeRequestBtn" name="rejectExchangeRequestBtn" class="close" data-dismiss="modal" aria-label="Close">Reject</button>
					<button type="button" class="btn btn-success  mt-5 btn-lg" id="acceptExchangeRequestBtn" name="acceptExchangeRequestBtn" class="close" data-dismiss="modal" aria-label="Close">Accept </button>
				</div>
				</center>
			</div>
		</div>
	</div>

	<div class="modal fade" id="processExchangeModelSender" tabindex="-1" role="dialog" aria-hidden="true" data-keyboard="false" style="background:gray;">
		<div class="modal-dialog modal-dialog-centered modal-full " role="document" style="background:gray;opacity:1">
			<div class="modal-content" style="opacity1">
				<!-- <div class="modal-header">
					<h5 class="modal-title">Sender</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div> -->
				<center>
				<div class="modal-body p-4" >
					<div class="row pt-5">
						<div class="col-4 d-flex justify-content-center">
							<div id="sender-image" class="image">
								<img id="image-src" src="">	
							</div>

						</div>
						<div class="col-4 d-flex justify-content-center align-items-center">
							<div id="" class=" ">	
								<img id="image-src" src="image/transfer.png" style="width:50px;height:40px" >	
							</div>
						</div>

						<div class="col-4 d-flex justify-content-center">
							<div id="" class="image">	
								<img id="image-src" src="image/unknown.png">	
							</div>
						</div>



					</div>
				
					<button type="button" class="btn btn-secondary btn-lg" id="cancelExchangeRequestBtn" name="cancelExchangeRequestBtn" class="close" data-dismiss="modal" aria-label="Close">Cancel Request</button>
				</div>
				</center>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="qrCodeModel" tabindex="-1" role="dialog" aria-labelledby="qrCodeModel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-full" role="document">
		<div class="modal-content">
			<div class="modal-header">
				QR code
			</div>
			<div class="modal-body text-center pt-5">
				<div id="output" style="width:100%; " ></div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
				<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
			</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="qrScannerModal" tabindex="-1" role="dialog" aria-labelledby="qrScannerModal" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-full" role="document">
			<div class="modal-content">
			<div class="modal-header">
				Scan QR code to match player
			</div>
			<div class="modal-body text-center pt-5">
				<noscript>
					<div class="row-element-set error_message">
						Your web browser must have JavaScript enabled
						in order for this application to display correctly.
					</div>
				</noscript>  
				<div class="row">
					<div class="col">
						<div class="qrscanner" id="scanner" style="width:100%;height:100%">
						</div> 
					</div>
				</div>
			

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
				<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
			</div>
			</div>
		</div>
	</div>

	

</body>
</html>


<script>

	var jbScanner 

	let user;
	let opponent_id;
	let socket;
	let place =0;
	let images_list_arr =[
		"monkey-1.jpg",
		"monkey-2.jpg",
		"monkey-3.jpg",
		"snake-1.jpg",
		"snake-2.jpg",
		"snake-3.jpg",		
		"lizard-1.jpg",
		"lizard-2.jpg",
		"lizard-3.jpg",
		"frog-1.jpg",
		"frog-2.jpg",
		"frog-3.jpg",
		"butterfly-1.jpg",
		"butterfly-2.jpg",
		"butterfly-3.jpg",
	]



	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');
	console.log("show client token "+token)

joinws()

function joinws()
	{
		if (!window.WebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		if (window.WebSocket) {
			// socket = new WebSocket("ws:192.168.0.134:911" );
			socket = new WebSocket("wss:fuyoh-ads.com/ws/animal_matching/"+token);
			socket.onmessage = function (event) {
				// var ta = document.getElementById('responseText');
				// ta.value = ta.value + '\n' + event.data
				console.log(event.data)
			
				

				if(event.data)
				{
					let data = JSON.parse(event.data)
					let status = data.success
					let returnData = data.data 
					let player_info = JSON.parse(event.data)
					console.log(data.type)

					if(status == true)
					{
						if(data.type =="player_info")
						{
							user = returnData.player_info
							
							$("#player-info").html("Player ("+user.name+")")

							$('#output').empty();
							$('#output').qrcode({
								width: 500,
								height:  500,
								text: JSON.stringify(user)
							});



							// if(player_info[i].user_id == 7)
							// 	{
							console.log("setup player onhold images")
							let player_images = user.images 

							// current-image-1

							for(var j=0;j<player_images.length;j++)
							{
								let image_number =j+1;

								let image_idx = player_images[j]
								let img_url = "admin/"+images_list_arr[image_idx-1];

								$("#current-image-"+image_number+" #image-id").html(image_idx)
								$("#current-image-"+image_number+" #image-src").attr("src",img_url);

								$("#arrange-image current-image-"+image_number+" #image-src").attr("src",img_url);
								
								
								$("#exchange-img-div #radio1 #label-"+(j+1)).html(image_idx)
								console.log(image_idx)
							}
								//}

						}
						else if(data.type =="all_player_info")
						{
							$("#player_slt").empty();
							let player_info = returnData.player_arr
							for (var i = 0; i < player_info.length; i++) {
								
								if(player_info[i].user_id!=user.user_id)
									$("#player_slt").append($('<option ></option>').val(player_info[i].user_id).html(player_info[i].name));
							}
						}else if(data.type =="exchange_image_pending")
						{
							let exchange_data =returnData.exchange
							
							hideAllModal()
							if(exchange_data.type=="receiver")
							{
								console.log("reveiver")
								let player_images = user.images 
								let idx = player_images[exchange_data.give_img_idx]
								let img_url = "admin/"+images_list_arr[idx-1];
								$("#receiver-image #image-src").attr("src",img_url);

								$('#processExchangeModelReceiver').modal({
									backdrop: 'static',
									keyboard: false
								})

							}else if(exchange_data.type=="sender")
							{
								console.log("sender")
								console.log(user)

								let player_images = user.images 
								let idx = player_images[exchange_data.give_img_idx]

								let img_url = "admin/"+images_list_arr[idx-1];
								$("#sender-image #image-src").attr("src",img_url);

								$('#processExchangeModelSender').modal({
									backdrop: 'static',
									keyboard: false
								})
							}

						}else if(data.type =="exchange_successful"||data.type =="exchange_rejected"||data.type =="finish_game")
						{
							alert(data.message)

							$('.modal').modal('hide');

						}else if(data.type =="insert_score")
						{
							 place = returnData.place

							// alert("final score "+10*place)
							window.parent.wsCreateScore(10*place);
							window.parent.finishGame();
						}
						else if(data.type =="end_session")
						{
							// alert(data.message)
							window.parent.wsCreateScore(0);
						}


					}else
					{
						alert(data.message)
					}
					
	
				}


			};
			socket.onopen = function (event) {
				// alert("connecting with server")

				socket.send(JSON.stringify(	{
					"type":"join_game",
					"payload":{
	
					}
					//"payload":{"error":"error 1"}
				}));
			};
			socket.onclose = function (event) {
				// alert("Disconnect with server")
			};
		} else {
			alert("Current Browser Not Support WebSocket！");
		}

	}

	$( document ).ready(function() {
		$( "#plyerbtn" ).click(function(evt) {
			// alert("matching player...")
			opponent_id =$("#player_slt").val();

			socket.send(JSON.stringify(	{
				"type":"matching_player",
				"payload":{
					opponent_id:$("#player_slt").val(),
				}
				//"payload":{"error":"error 1"}
			}));
			$("#player_slt").val()
			

			$("#opponent_span ").html("("+$("#player_slt option:selected").text()+")")

			// <a href="#openSwapModel" role="button" class="btn btn-primary" data-toggle="modal">Launch modal</a>
			$('#openSwapModel').modal({
				// backdrop: 'static',
				// keyboard: false
			})
		
		})

		// $('#processExchangeModel').modal({
		// 	backdrop: 'static',
		// 	keyboard: false
		// })
	});
	


	$("#exchangebtn").click(function() {
		// alert("oponent id "+opponent_id)
			// alert("waiting player to accept..."+$("input[name=plyer1]:checked").val())
			// alert("waiting player to accept..."+$("input[name=plyer2]:checked").val())
		
			socket.send(JSON.stringify(	{
				"type":"exchange_image_request",
				"payload":{
					// user_id:user.user_id,
					opponent_id:opponent_id,
					user_img_idx:$("input[name=plyer1]:checked").val(),
					opponent_img_idx:$("input[name=plyer2]:checked").val()
				}
				//"payload":{"error":"error 1"}
			}));

		
		})


	$( "#swapbtn" ).click(function() {

		let count =0;
		let exchange_arr =[];

		$('input[type=checkbox]').each(function () {
			if (this.checked) {
				console.log($(this).val()); 
				count++;
				exchange_arr.push($(this).val())

			}
		});

		if(count!=2)
		{
			alert("Please select exactly 2 images.");
		}else
		{
			socket.send(JSON.stringify(	{
				"type":"rearrange_image",
				"payload":{
					// user_id:"7",
					img1:exchange_arr[0],
					img2:exchange_arr[1]
				}
				//"payload":{"error":"error 1"}
			}));

			$('input[type=checkbox]').each(function () {
				if (this.checked) {
					$(this).prop('checked', false);
				}
				
			});

			// alert("rearrange")
		}

	});

	$( "#acceptExchangeRequestBtn" ).click(function() {
		socket.send(JSON.stringify(	{
			"type":"accept_exchange",
			"payload":{
			}
			//"payload":{"error":"error 1"}
		}));

	})

	$( "#cancelExchangeRequestBtn" ).click(function() {
		$('.modal').modal('hide');
		socket.send(JSON.stringify(	{
			"type":"reject_exchange",
			"payload":{
			}
			//"payload":{"error":"error 1"}
		}));

	})

	$( "#rejectExchangeRequestBtn" ).click(function() {
		$('.modal').modal('hide');
		socket.send(JSON.stringify(	{
			"type":"reject_exchange",
			"payload":{
			}
			//"payload":{"error":"error 1"}
		}));

	})



</script>

<script type="text/javascript">
    function onQRCodeScanned(scannedText)
    {	
		
			
		if(scannedText)
		{

			try {
				let json = JSON.parse(scannedText)
				// alert("Matching player....")

				jbScanner.stopScanning()
				let name =json.name
				let id = json.user_id
				opponent_id =id
				
				$("#opponent_span ").html("("+name+")")

				hideAllModal()

				$('#openSwapModel').modal();
			}
			catch(err) {
			}
		

		}
	
    }
    
    
    function provideVideo()
    {
        var n = navigator;

        if (n.mediaDevices && n.mediaDevices.getUserMedia)
        {
          return n.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment"
            },
            audio: false
          });
        } 
        
        return Promise.reject('Your browser does not support getUserMedia');
    }

    function provideVideoQQ()
    {
        return navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            var exCameras = [];
            devices.forEach(function(device) {
            if (device.kind === 'videoinput') {
              exCameras.push(device.deviceId)
            }
         });
            
            return Promise.resolve(exCameras);
        }).then(function(ids){
            if(ids.length === 0)
            {
              return Promise.reject('Could not find a webcam');
            }
            
            return navigator.mediaDevices.getUserMedia({
                video: {
                  'optional': [{
                    'sourceId': ids.length === 1 ? ids[0] : ids[1]//this way QQ browser opens the rear camera
                    }]
                }
            });        
        });                
    }
    
    //this function will be called when JsQRScanner is ready to use
    function JsQRScannerReady()
    {
        //create a new scanner passing to it a callback function that will be invoked when
        //the scanner succesfully scan a QR code
         jbScanner = new JsQRScanner(onQRCodeScanned);
        //var jbScanner = new JsQRScanner(onQRCodeScanned, provideVideo);
        //reduce the size of analyzed image to increase performance on mobile devices
        jbScanner.setSnapImageMaxSize(500);
    	var scannerParentElement = document.getElementById("scanner");
    	if(scannerParentElement)
    	{
    	    //append the jbScanner to an existing DOM element
    		jbScanner.appendTo(scannerParentElement);
		}        
	
	}
	
	function hideAllModal(){
		$('.modal').hide();
		$('.modal-backdrop').hide();
		$('.modal-backdrop').hide();

		
	}
	function openCamera(){
		jbScanner.resumeScanning()
	}

	
	function wsGameService(type,callback){
		console.log(type)
		// state.current = state.over;

		let data ={}
		
		switch(type) {
			case "end_game":
				data.score =10;
				callback(data);
				break;
			default:
				alert("invalid request")
		}
	
	}

  </script>  