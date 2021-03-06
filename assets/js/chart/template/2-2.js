var data = [24,119,60,21,5,12];
var dataSum = 0;
var series = []
var agreeLabel = ['No opinion','Strongly disagree','Disagree','Neutral','Agree','Strongly agree']
for (var i=0;i < data.length;i++) {
	dataSum += data[i];
	series[i] = [agreeLabel[i], data[i]];
}

var question = 'Do you agree that the acquisition will trigger even more expansion of Free and Open Source contributors in GitHub?';

Highcharts.chart('container', {
	chart: {
		type: 'column'
	},
	title: {
		text: question
	},
	// subtitle: {
	//     text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
	// },
	xAxis: {
		type: 'category',
		labels: {
			// rotation: -45,
			style: {
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif'
			}
		}
	},
	yAxis: {
		min: 0,
		max: 125,
		title: {
			text: 'Responses'
		}
	},
	legend: {
		enabled: false
	},
	tooltip: {
		pointFormat: '{point.y}</b>'
	},
	series: [{
		name: 'Population',
		data: series,
		dataLabels: {
			enabled: true,
			// rotation: -90,
			color: '#FFFFFF',
			// align: 'right',
			formatter: function(){
				var pcnt = (this.y / dataSum) * 100;
				// return agreeLabel[this.x] + ' '+ Highcharts.numberFormat(pcnt) + '%';
				return this.y + ' ('+ Highcharts.numberFormat(pcnt,1) + ')%';

			},
			y: 10, // 10 pixels down from the top
			style: {
				fontSize: '13px',
				fontFamily: 'Verdana, sans-serif'
			}
		}
	}]
});