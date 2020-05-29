var akvoOptions = {

	hour: false,
	am_pm: false,
	advanced_mode: false,
	compact_design: false,
	gps: false,
	location_code: '2388327',
	isF: false,
	date_weather_font: 'Colfax-Thin',
	time_font: 'AgencyFB-Light',
	black_mode: false,
	zero_h: true,
	zero_m: true,
	invert: true

}

// MAIN APP

handleOptions()
applyOptions()
updateDateTime()
setInterval(updateDateTime, 1000)
if (akvoOptions.advanced_mode) loadWeather()


// FUNCTIONS

function handleOptions () {
	for (var key in akvoOptions) {
		if (typeof window[key] !== 'undefined') {
			akvoOptions[key] = window[key]
		}
	}
}

function applyOptions () {

	// ADVANCED MODE
	if (akvoOptions.advanced_mode) {

		var date = ''+
			'<div id="date_weather">' +
				'<table>' +
					'<tr><td id="date-advanced">' +
						'<div id="day-advanced"></div>' +
						'<div id="daynum-advanced"></div>' +
						'<div id="month-advanced"></div>' +
					'</td><td id="weather" class="weatherFeed">' +
						'<div class="weatherCity">Unknown</div>' +
						'<div class="icon_temp">' +
							'<div class="weatherItem odd night" '+
							'style="background-image: url(./Images/icons-'+((akvoOptions.black_mode)?'black':'white')+'/3200.png); background-repeat: no-repeat;">' +
							'</div><div class="weatherTemp">0°' +
						'</div></div>' +
						'<div class="weatherDesc">Weather</div>' +
					'</td></tr>' +
				'</table>' +
			'</div>'
		var time = ''+
			'<div id="time-advanced" class="time-text '+
				((akvoOptions.am_pm)?'am_pm':'')+'">' +
				'<div id="hours-advanced"></div>' +
				'<div id="points-advanced">:</div>' +
				'<div id="minutes-advanced"></div>' +
			'</div>'
		var line = '<div id="line-advanced"></div>'

		$("#advanced-ui").html( (akvoOptions.invert)? date+line+time : time+line+date )
	}

	// SIMPLE MODE
	else {

		var date = ''+
			'<div id="day-simple"></div>' +
			'<div id="daynum-simple"></div>' +
			'<div id="month-simple"></div>'

		var line = '<div id="line-simple"></div>'
		var time = ''+
			'<div id="time-simple" class="time-text '+
				((akvoOptions.am_pm)?'am_pm':'')+'">' +
				'<div id="hours-simple"></div>' +
				'<div id="points-simple">:</div>' +
				'<div id="minutes-simple"></div>' +
			'</div>'
		$("#simple-ui").html( (akvoOptions.invert)? date+line+time : time+line+date )
	}

	// DATE AND WEATHER FONT
	$('body').css('font-family', akvoOptions.date_weather_font)

	// HOURS AND MINUTES FONT 
	$('#time-' +(akvoOptions.advanced_mode?'advanced':'simple')).css('font-family', akvoOptions.time_font)

	// BLACK MODE
	if (akvoOptions.black_mode) {

		$('body').css('color', 'black')

		$('#line-'+(akvoOptions.advanced_mode?'advanced':'simple')).css('background', 'black')

	}

	// COMPACT DESIGN
	if (akvoOptions.compact_design && akvoOptions.advanced_mode) {
		$('#date-advanced').addClass('compact')
		$('#daynum-advanced').addClass('compact')
		$('#month-advanced').addClass('compact')
		$("<style type='text/css'> .weatherCity, {margin-right : 0px;} .icon_temp{margin-left:0px;}</style>").appendTo("head")
	}
}


function updateDateTime () {
	var data_set = {day:null,daynum:null,month:null,hours:null,minutes:null}
	var mode = (akvoOptions.advanced_mode ? 'advanced' : 'simple')
	var d = new Date()

	for (key in data_set) {
		$('#'+key+'-'+mode).html(window[key](d))
	}

	// add am/pm
	if (akvoOptions.am_pm) {
		$('#time-'+mode).attr('data-ampm',(+d.getHours() >= 12 ? 'pm' : 'am'))
	}

	// fix width 
	setTimeout(updateLine,50) // got to timout else the intitial time_width calculated will be wrong due to font loading
}

function day(d) {
	var weekdays = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday" ]
	return weekdays[ d.getDay() ]
}

function daynum(d) {
	var d = d.getDate()
	return (d < 10) ? '0'+d : ''+d
}

function month(d) {
	mon = [ "January","February","March","April","May","June","July","August","September","October","November","December" ]
	return mon [ d.getMonth() ]
}

function hours(t) {
	var now = getCurrentTime(t)
	
	var h = now[0]

	if (akvoOptions.hour) {

		if (h < 10 && akvoOptions.zero_h)
			h = '0' + h

	} else {

		if (h > 12)
			h -= 12
		if (h < 10 && akvoOptions.zero_h) {
			h = '0' + h
		}

	}

	return h
}

function minutes(t) {
	var now = getCurrentTime(t)
	
	var m = now[1]
	
	if (m < 10 && akvoOptions.zero_m)
		m = '0' + m

	return m
}

function getCurrentTime (t) {
	var result = [ t.getHours(), t.getMinutes(), t.getSeconds() ]
	return result
}

// TODO : check here beacause when first culaculated the width of the time is not correct beacuase the new font is not applied yet
function updateLine () {
	var time_width = $("#time-" + (akvoOptions.advanced_mode?'advanced':'simple')).width()

	// fix table width
	$("table").css("min-width", time_width-10 + "px")

	var line_width = (akvoOptions.advanced_mode) ? time_width+60 : time_width-60
	var line = $("#line-" + (akvoOptions.advanced_mode?'advanced':'simple'))
	line.css('width', line_width + "px")
	line.css('height',"1px")
}

function loadWeather() {

	if (akvoOptions.gps)
		try {
			akvoOptions.location_code = getWOEID()
		} catch (err) {
			console.log(err)
		}

	var tunit = (akvoOptions.isF) ? 'f' : 'c'
	
	$('#weather').weatherfeed(
		[akvoOptions.location_code],
		{
			unit:tunit,
			woeid:true
		}
	)
}

function getWOEID() {

	var woeid = akvoOptions.location_code ;

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET","file:///var/mobile/Documents/widgetweather.xml",false);
	xmlhttp.send();

	woeid = xmlhttp.responseXML.getElementsByTagName("woeid")[0].childNodes[0].nodeValue ;

	return woeid ;
}