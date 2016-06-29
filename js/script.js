$(document).ready(function(){

	
	var latitude=0;
	var longitude=0;
	var dayCount=3;
	var month_names=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	$("#location").geocomplete({
		details:'.details',
		detailsAttribute:'data-geo'
	});
	
	

	

	$("button").click(function(){
		latitude=$("#latitude").html();
		longitude=$("#longitude").html();
		$(".results").css("display","block");
		// showResults(dayCount);
		getWeatherReport(latitude,longitude,dayCount);

		$("#day-3").click(function(){
			dayCount=3;
			// showResults(dayCount);
			getWeatherReport(latitude,longitude,dayCount);
		});
		$("#day-5").click(function(){
			dayCount=5;
			// showResults(dayCount);
			getWeatherReport(latitude,longitude,dayCount);
		});
		$("#day-7").click(function(){
			dayCount=7;
			// showResults(dayCount);
			getWeatherReport(latitude,longitude,dayCount);
		});

		

		function showResults(dayCount){

			for(var i=1;i<=dayCount;i++){
				$(".panel-day-"+i).css("visibility","visible");
			}
			
			if (dayCount==3) {
				for(var i=4;i<8;i++){
						$(".panel-day-"+i).css("visibility","hidden");
				}
			}
			
			else if (dayCount==5) {
				for(var i=6;i<8;i++){
						$(".panel-day-"+i).css("visibility","hidden");
				}
			}

			
		}
		console.log(latitude,longitude,dayCount);
		getWeatherReport(latitude,longitude,dayCount);

		function getWeatherReport(latitude,longitude,count) {
			console.log(count);
  		
  		$.ajax({
    		url:"http://api.openweathermap.org/data/2.5/forecast/daily",
    		type:'GET',
    		datatype:"jsonp",
    		data: {
        		lat:latitude,
        		lon: longitude,
        		appid: 'cdd59afc159cde02f6321b9893177f80',
        		cnt:count
        		},
    		success: function(result) {
    			
        	console.log(result.list[0].temp.day);
        	console.log(result.list[0].dt);
        	
        	for(var i=1;i<=count;i++){
        		console.log(result.list[i-1].dt);
        		var returnedDate=dateDisplay(result.list[i-1].dt);
        		
        		$(".panel-day-"+i+" .panel-heading").html("<b>"+returnedDate+"</b>");

        		var dayTemp=dayAndNightTemp(result.list[i-1].temp.day);
        		var nightTemp=dayAndNightTemp(result.list[i-1].temp.night);

        		
        		$(".panel-day-"+i+" .panel-body").html("DayTime:"+dayTemp+ '&#8451'+"<br><br>"+"NightTime:"+nightTemp+'&#8451');
        		
        		showResults(count);
        	}

        	function dateDisplay(day){
        		var date=new Date(day*1000);
        		var monthPanel=month_names[date.getMonth()];
        		var dayPanel=date.getDate();
        		var yearPanel=date.getFullYear();
        		var completeDate=monthPanel+' '+dayPanel+', '+yearPanel;
        		console.log(completeDate);
        		return completeDate;
        	}
        	function dayAndNightTemp(KelvinTemp){
        		var degreesTemp=Math.round(KelvinTemp-273.15);
        		return degreesTemp;
        	}
    		},
    		error:function(){
    			alert("Please enter a valid field");
    		}
  		});
		}
		

	});
	
});