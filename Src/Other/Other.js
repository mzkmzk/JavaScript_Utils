var Other = {
	DownTime: function(surplusSecond) {
	var hour = 0,
		minute = 0,
		second = 0;
		if ( surplusSecond < 60) {
			second = surplusSecond;
		} else if (surplusSecond < 3600) {
			second = surplusSecond % 60;
			minute = (surplusSecond - second ) / 60;
		}else {
			hour = parseInt(surplusSecond / 3600 );
			minute = parseInt((surplusSecond - 3600 * hour) /60);
			second = surplusSecond - 3600 * hour - 60 * minute
		}
		
		var timerHtml = ""; 
		setInterval(function(){

			second -= 1;
			if (second == -1 ) {
				minute -=1;
				second = 59;
			}
			if (minute == -1) {
				hour -=1;
				minute = 59;
			}
			if (hour == -1) {
				hour = 0,
				minute = 0,
				second = 0;
			}					

			secondHtml = second < 10 ? "0" + second : second;
			minuteHtml = minute < 10 ? "0" + minute : minute;
			hourHtml = hour < 10 ? "0" + hour : hour;
			//hourHtml = hour > 99 ? 99 : hourHtml;
			$("#timer").html("<span>" + hourHtml + "</span>" + " : " + "<span>" + minuteHtml + "</span>" + " : " + "<span>" + secondHtml + "</span>" );

		},1000);
	},
	getTomorrowSecond: function(){
		var nowDate = new Date();
		var remainingTime = 0;
	    remainingTime += (23 - nowDate.getHours()) * 3600;
	    remainingTime += (59 - nowDate.getMinutes()) * 60;
	    remainingTime += nowDate.getSeconds();
		return remainingTime;
	},	
};