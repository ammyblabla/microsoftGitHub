var responses = 136;

var themeColor = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
'#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
var redBlueColor = ['#0000FF','#FF0000','#00FF00'];

var agreeLabel = ['No opinion','Strongly disagree','Disagree','Neutral','Agree','Strongly agree'];
var benefitLabel = ['No opinion','Very detrimental','Detrimental','Neutral','Beneficial','Very beneficial'];

var createSeries= function(label, data) {
  var series = [];
  for(var i = 0; i<data.length; i++) {
    series[i] = [label[i], data[i]]
  }
  return series;
};

var style = {
    fontSize: '13px',
    fontFamily: 'Helvetica'
};

var xAxis = {
  type: 'category',
  labels: {
    // rotation: -45,
    style: style
    }
  }

var yAxis = function(max=undefined) {
  return {
    min: 0,
    title: { text: 'Responses' },
    max :max
  }
}

var createPieLabel = function(label, data) {
  var series = []
  for (let i=0; i<data.length; i++) {
    series[i] = {name: label[i], y:data[i]};
  }
  return series;
}

var config = {
  // project manager
  '13-2': {
    type: 'pie',
    question: 'Are you a fan of GitHub?',
    data: [
      { name: 'Yes', y: 80 }, 
      { name: 'No',  y: 56 }
    ]
  },
  '14-2': {
    type: 'column',
    data: [8,25,7,2,2,1],
    question: 'Do you agree that the acquisition will trigger even more expansion of Free and Open Source contributors in GitHub?',
    label: agreeLabel,
    max: 25

  },
  '14-4': {
    type: 'pie',
    data: [69,47,20],
    question: 'Which statement best describes your current situation with any of your contributed projects?',
    label: [ 'The projects that I contribute to the most is currently using GitHub (currently using GitHub)',
    'One of the projects that have made contributions has already left GitHub (used before but not now)',
    'All projects that I contribute to have never used GitHub (none of the above)'
    ]
  }
}

$(function() {
  $(document).ready(function() {
    Highcharts.setOptions({
      colors: themeColor
    });


    Highcharts.setOptions({
      colors: redBlueColor
    });

    var chart132 = new Highcharts.Chart('13-2', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: config['13-2'].type
      },
      title: { text: config['13-2'].question },
      tooltip: { pointFormat: '{point.y} ({point.percentage:.1f}%)</b>'},
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}: {point.y}</b> ({point.percentage:.1f} %)',
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: config['13-2'].data
      }]
    });

    Highcharts.setOptions({
      colors: themeColor
    });

    var chart142 = new Highcharts.Chart('14-2', {
      chart: { type: config['14-2'].type },
      title: { text: config['14-2'].question },
      xAxis: xAxis,
      yAxis: yAxis(config['14-2'].max),
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{point.y}</b>'
      },
      series: [{
        name: 'Population',
        data: createSeries(config['14-2'].label, config['14-2'].data),
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          formatter: function(){
            var pcnt = (this.y / responses) * 100;
            return this.y + ' ('+ Highcharts.numberFormat(pcnt,1) + ')%';
    
          },
          y: 10, // 10 pixels down from the top
          style: style
        }
      }]
    });

    Highcharts.setOptions({
      colors: redBlueColor
    });
    var chart144 = new Highcharts.Chart('14-4', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: config['14-4'].type
      },
      title: {
          text: config['14-4'].question
      },
      tooltip: {
          pointFormat: '{point.y} ({point.percentage:.1f}%)</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              }
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: createPieLabel(config['14-4'].label, config['14-4'].data)
      }]
    });


  });
});