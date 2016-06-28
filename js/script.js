$(document).ready(function(){
	
	// $("#start-location").geocomplete().bind("geocode:result",function(event,result){
	// 	var startLatitude=result.geometry.location.lat();
	// 	var startLongitude=result.geometry.location.lng();
		
	// });

	// $("#end-location").geocomplete().bind(function(event,result){
	// 	var endLatitude=result.geometry.location.lat();
	// 	var endLongitude=result.geometry.location.lng();
		
	// });
	
	// console.log(startLatitude,startLongitude,endLatitude,endLongitude);

	var startLatitude=0;
	var startLongitude=0;
	
	$("#start-location").geocomplete({
		details:'.details-start',
		detailsAttribute:'data-geo-start'
	});

	

	$("button").click(function(){
		startLatitude=$("#start-latitude").html();
		startLongitude=$("#start-longitude").html();
		

		console.log(startLatitude,startLongitude);
		getEstimatesForUserLocation(startLatitude,startLongitude);

		function getEstimatesForUserLocation(latitude,longitude) {

  		
  		$.ajax({
    		url:"http://api.openweathermap.org/data/2.5/forecast/daily",
    		type:'GET',
    		datatype:"jsonp",
    		data: {
        		lat:latitude,
        		lon: longitude,
        		cnt:7
        		},
    		success: function(result) {
        	console.log(result);
    		}
  		});
		}
		

	});
});