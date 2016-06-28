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
	var cityName="";
	var city="";
	$("#start-location").geocomplete({
		details:'.details-start',
		detailsAttribute:'data-geo-start'
	});

	cityName=$("#start-location").val();
	var city=cityName.split(",");



	$("button").click(function(){
		startLatitude=$("#start-latitude").html();
		startLongitude=$("#start-longitude").html();
		

		console.log(startLatitude,startLongitude);
		getEstimatesForUserLocation(city[0]);

		function getEstimatesForUserLocation(cityName) {

  		
  		$.ajax({
    		url:"https://api.openweathermap.org/data/2.5/forecast/daily",
    		type:'GET',
    		datatype:"jsonp",
    		data: {
        		q:cityName
        		},
    		success: function(result) {
        	console.log(result);
    		}
  		});
		}
		

	});
});