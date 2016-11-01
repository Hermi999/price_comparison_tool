var input_field_remote_request_max_length = 1000;
var green = "rgb(138, 216, 142)";
var red = "rgb(236, 143, 136)";
var input_wrapper = $('#input_wrapper');
var get_more_results = $("#get_more_results_wrapper");
var input_field = $("#myinput");
var input_field2 = $("#myinput2");
var input_field3 = $("#myinput3");
var input_field4 = $("#myinput4");
var input_email = $("#emailAddr");
var input_label = $("#input_label");
var input_label2 = $("#input_label2");
var input_label3 = $("#input_label3");
var input_label4 = $("#input_label4");
var results = $("#results");
var btn = $("#getPrices");
var btn2 = $("#submitRequest");
var btn_back = $("#back");
var btn_back2 = $("#back2");
var success_message = $("#success_message");
var new_request = $("#new_request");
var terms = $("#terms");
var accessCode = $('#accessCode');
var accessCode2 = $('#accessCode2');
var old_input = "";
var old_input2 = "";
var old_input3 = "";
var old_input4 = "";
var displaySeller = true;
var serverURI = "https://tools.rentog.com/";
var active_element_id = document.activeElement.id;
var data_source;
var awesome_temp;
var old_input_temp;
var input_field_temp;
var text = [];
var teaser_text_electronic = "";
var teaser_text_whitelabel = "";
var feedback_type = "";
var feedback_page = 1;
var mixpanel = mixpanel || undefined;
var enable_device_preview = false;
var enable_exact_match = false;

var opts = {
  lines: 9 // The number of lines to draw
, length: 28 // The length of each line
, width: 10 // The line thickness
, radius: 20 // The radius of the inner circle
, scale: 1 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#fff' // #rgb or #rrggbb or array of colors
, opacity: 0.2 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1.5 // Rounds per second
, trail: 54 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '49%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: true // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}


function getServerURI(){
	if(window.location.href.includes("home")){
		// Development
		serverURI = "http://lvh.me:3000/";
	}

	if(window.location.href.includes("/de") || window.location.href.includes("_de")){
		text[0] = "Wir haben ";
		text[1] = " Gerät(e) in unserer Datenbank gefunden.";
		text[2] = "Zugriffscode eingeben ...";
		text[3] = " Gerät(e) in unserer Datenbank gefunden. Die besten "
		text[4] = " Suchergebnisse werden angezeigt. Verwenden Sie 'genaue Übereinstimmung' um die Suche einzugrenzen."
		teaser_text_electronic = "Wir haben die Preise von Marken wie Megger, Omicron und FLIR.";
		teaser_text_whitelabel = "Ihr Design, Ihr Werbeslogan, Ihr Logo.";
	}
	else if(window.location.href.includes("/ru") || window.location.href.includes("_ru")){
		text[0] = "Мы нашли ";
		text[1] = " устройств по Вашему запросу.";
    text[2] = "Введите код доступа ...";
    teaser_text_electronic = "У нас есть цены от известных брендов, например Megger, Omicron и FLIR."
    teaser_text_whitelabel = "Ваш дизайн, Ваш слоган, Ваш логотип.";

	}
	else{
		text[0] = "We found ";
		text[1] = " device(s) for your request.";
		text[2] = "Enter access code ...";
		text[3] = " device(s) in our database. The top "
		text[4] = " search results are displayed. You can use the 'exact match' feature to limit the search results."
		teaser_text_electronic = "We have the prices from your favourite brands like Megger, Omicron and FLIR."
		teaser_text_whitelabel = "Your design, your slogan, your logo.";
	}
}
getServerURI();

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

// Get URL Parameters
var getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function changeUserInterface(){
	if(getUrlParameter("energy")){
		$('#page').css("backgroundImage", 'url("/price_comparison/bg3.jpg")');
		$('#teaser_wrapper').html(teaser_text_electronic);

	}else if (getUrlParameter("whitelabel")){
		$('#page').css({"backgroundImage": 'none', "backgroundColor": "white"});
		$('#teaser_wrapper').text(teaser_text_whitelabel);
		$('h1, #change_language>a').css('color', 'black');
		$('.awesomplete').css('boxShadow', 'none');
		$('#results_data').css('backgroundColor', 'rgba(244, 67, 54, 0.69)');
		$('#input_wrapper').css('backgroundColor', 'rgba(167, 167, 167, 0.46)');
		$('#input_label').css('color', '#6f6f6f');
	}
}


var cookie = function(){
 if (!readCookie("price_comparison_session_id")){ 
 	createCookie("price_comparison_session_id", makeid(), 999);
 }else{
 	input_email.val(readCookie("price_comparison_email"));
 	$("#terms input").prop("checked", true)
 }
}();

var regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

var filter_function = function(text, input){
	var input_arr = input.split(/[ ,]+/);
	var ret = true;

	$.each(input_arr, function(index, value){
		if (ret === true){
			if (RegExp(regExpEscape(value.trim()), "i").test(text) === false){
				ret = false;
			}else{
				ret = true;
			}
		}
	});
	return ret;
}

var sort_function = function(){}

var inputReference = document.getElementById("myinput");
var inputReference2 = document.getElementById("myinput2");
var inputReference3 = document.getElementById("myinput3");
var inputReference4 = document.getElementById("myinput4");
var awesome = new Awesomplete(inputReference, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr, filter: filter_function, sort: sort_function});
var awesome2 = new Awesomplete(inputReference2, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr2, filter: filter_function, sort: sort_function });
var awesome3 = new Awesomplete(inputReference3, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr3, filter: filter_function, sort: sort_function });
var awesome4 = new Awesomplete(inputReference4, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr4, filter: filter_function, sort: sort_function });

changeUserInterface();

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Toggle autocompelte feature
$('#enable_device_preview').change(function(){
	// empty input fields
	input_field.val("");
	input_field_change(true, "myinput");
	input_field2.val("");
	input_field_change(true, "myinput2");
	input_field3.val("");
	input_field_change(true, "myinput3");
	input_field4.val("");
	input_field_change(true, "myinput4");
	awesome._list = [];
	awesome2._list = [];
	awesome3._list = [];
	awesome4._list = [];	

	console.log("writeCookie");
	if ($('#enable_device_preview').is(':checked')){
		enable_device_preview = true;
		createCookie("enable_device_preview", true, 999);
	}else{
		enable_device_preview = false;
		createCookie("enable_device_preview", false, 999);
	}
});

// Toggle exact match feature
$("#enable_exact_match").change(function(){
	if($("#enable_exact_match").is(":checked")){
		createCookie("enable_exact_match", true, 999);
	}else{
		createCookie("enable_exact_match", false, 999);
	}
});

// Input field change
document.addEventListener('awesomplete-selectcomplete', input_field_change);
input_field.keyup(function(ev){
	input_field_change(true, undefined, ev);	
});
input_field2.keyup(function(ev){
	input_field_change(true, undefined, ev);	
});
input_field3.keyup(function(ev){
	input_field_change(true, undefined, ev);	
});
input_field4.keyup(function(ev){
	input_field_change(true, undefined, ev);	
});

function input_field_change(none_awesomplete_event, active_element_id, ev){
	if (enable_device_preview === true){
		active_element_id = active_element_id || document.activeElement.id;
		data_source = device_arr;
		awesome_temp = awesome;
		old_input_temp = old_input;
		input_field_temp = input_field;

		if (active_element_id === "myinput2"){
			data_source = device_arr2;
			awesome_temp = awesome2;
			old_input_temp = old_input2;
			input_field_temp = input_field2;
		}else if(active_element_id === "myinput3"){
			data_source = device_arr3;
			awesome_temp = awesome3;
			old_input_temp = old_input3;
			input_field_temp = input_field3;
		}else if(active_element_id === "myinput4"){
			data_source = device_arr4;
			awesome_temp = awesome4;
			old_input_temp = old_input4;
			input_field_temp = input_field4;
		}

		awesomplete_event = none_awesomplete_event || false;
		var input_field_value = "";
		var input_field_value_temp = input_field_temp.val();

		// remove words with less than 3 chars
		var input_field_value_arr = input_field_value_temp.split(" ");
		$.each(input_field_value_arr, function(index, val){
			if(val.length > 2){
				input_field_value = input_field_value + " " + val;
			}
		});

		var old_input_length = old_input_temp.length;
		var new_input_length = input_field_value.length;

		// if textfield value changed
		if (old_input_temp !== input_field_value){
			old_input_temp = input_field_value;

			// contact server if input has changes and input length is below input_field_remote_request_max_length
			if( none_awesomplete_event === true && ((input_field_value.length > 0 && input_field_value.length < input_field_remote_request_max_length) || (old_input_length+1 < new_input_length))){
				var jqxhr = $.get( serverURI + "price_comparison_devices", 
					{
						"search_term": input_field_value,
					},
					function(data) {
					  // store response from server
					  data_source = data["devices"];
					  awesome_temp._list = data["devices"];
					  awesome_temp.evaluate();

					  if (active_element_id === "myinput2"){
							device_arr2 = data_source;
							awesome2 = awesome_temp;
						}else if (active_element_id === "myinput3"){
							device_arr3 = data_source;
							awesome3 = awesome_temp;
						}else if (active_element_id === "myinput4"){
							device_arr4 = data_source;
							awesome4 = awesome_temp;
						}else{
							device_arr = data_source;
							awesome = awesome_temp;
						}
					})
					  .done(function() {
					    //console.log( "second success" );
					  })
					  .fail(function() {
					    //console.log( "error" );
					  })
					  .always(function() {
				});
			}else{
				input_field_value = input_field_value_temp;
			}


			// check if text in textfield matches a valid dataset
			var BreakException = {};

			if (input_field_value !== ""){
				try{
					// disable button
					if(input_field.css("backgroundColor") !== green && input_field2.css("backgroundColor") !== green && 
						 input_field3.css("backgroundColor") !== green && input_field4.css("backgroundColor") !== green){
						btn.prop('disabled', true);
					}

					data_source.forEach(function(el){
						if(el.trim() == input_field_value.trim()){
							throw BreakException;
						}
					});
					input_field_temp.css("backgroundColor", red);
					//$("#help_wrapper").css("display", "block");
					awesome_temp.evaluate();
				}catch(e){
					if (e !== BreakException) throw e;
					// enable button and mark input green		
					btn.prop('disabled', false);
					btn.css("display", "block");
					$("#searchfield_errors").fadeOut();
					input_field_temp.css("backgroundColor", green);
					//$("#help_wrapper").css("display", "none");
				}
			}else{
				input_field_temp.css("backgroundColor", "white");
				awesome_temp.evaluate();

				if(input_field.css("backgroundColor") !== green && input_field2.css("backgroundColor") !== green && 
					 input_field3.css("backgroundColor") !== green && input_field4.css("backgroundColor") !== green){
					btn.prop('disabled', true);
				}
			}
		}

		if (active_element_id === "myinput2"){
			old_input2 = old_input_temp;
			input_field2 = input_field_temp;
		}else if (active_element_id === "myinput3"){
			old_input3 = old_input_temp;
			input_field3 = input_field_temp;
		}else if (active_element_id === "myinput4"){
			old_input4 = old_input_temp;
			input_field4 = input_field_temp;
		}else{
			old_input = old_input_temp;
			input_field = input_field_temp;
		}
	}
	else{
		// If "enter" key has been pressed, click on button if enabled and return
		if (ev && ev.keyCode === 13){
			if (btn.css("display") === "block" && btn.prop("disabled") === false){
				btn.click();
			}
			return;
		}

		if(input_field.val().length > 2 || input_field2.val().length > 2 || input_field3.val().length > 2 || input_field4.val().length > 2){
			//$("#help_wrapper").css("display", "none");
			btn.css('display', 'block');
			btn.prop('disabled', false);
			$("#searchfield_errors").fadeOut();
		}
		else{
			$("#error_to_less_chars").css("display", "block");
			btn.prop('disabled', true);
		}
	}
}

input_field.focusout(function(){
	if(btn.prop("disabled") === true){
		$("#searchfield_errors").fadeIn();
	}
});

// Get prices button click
btn.bind("click touchstart", function(){
	$('#result_table_body').empty();
	$('#teaser_wrapper').fadeOut();
	input_field.fadeOut();
	input_field2.fadeOut();
	input_field3.fadeOut();
	input_field4.fadeOut();
	input_label.fadeOut();
	input_label2.fadeOut();
	input_label3.fadeOut();
	input_label4.fadeOut();
	$("#help_wrapper").fadeOut();
	$('#additional_options_wrapper').fadeOut();
	$('#beta_version_desc').fadeOut();
	$('#show_more_input').fadeOut();
	$('.awesomplete').fadeOut();
	btn.fadeOut();
	input_wrapper.animate({
		marginLeft: "10%",
		width: "80%"
	}, 400);
	results.delay(500).fadeIn();
	btn_back2.delay(500).fadeIn();
	$(".spinner").delay(650).show();
	
	/*
	if(readCookie("price_comparison_accesscode") === "valid"){
		displaySeller = true;
		get_more_results.hide();
		btn_back2.delay(500).fadeIn();
	}else{
		get_more_results.delay(500).fadeIn();
		btn_back2.fadeOut();
	}*/

	if (mixpanel){
		mixpanel.register({"device_name": [input_field.val(), input_field2.val(), input_field3.val(), input_field4.val()], 
										 "sessionId":readCookie("price_comparison_session_id"),});
		mixpanel.track("Price_comparison: Get prices button clicked");
	}

	var jqxhr = $.post( serverURI + "price_comparison_events", 
		{
			"price_comparison_params": {
				"action_type":"device_chosen", 
				"device_name": [input_field.val(), input_field2.val(), input_field3.val(), input_field4.val()], 
				"sessionId":readCookie("price_comparison_session_id"),
				"exact_match": $("#enable_exact_match").is(":checked"),
			}
		},
		function(data) {
		  $(".spinner").hide();

		  var amountOfDevices = 0;

		  $.each(data.result, function(index, dev_type_data){
			  	var type_amountOfDevices = dev_type_data.length;
			  	amountOfDevices = amountOfDevices + type_amountOfDevices;

				  for(var j=0; j<type_amountOfDevices; j++){
				  	if(dev_type_data[j]){
					  	var seller_html = "<td class='seller_field'>" + text[2] + "</td>";
					  	if(displaySeller){
					  		var seller = "Link"
					  		if(dev_type_data[j].seller){
					  			seller = dev_type_data[j].seller;
					  		
						  		if(dev_type_data[j].link === "#"){
						  			seller_html = "<td>" + seller + "</td>";
						  		}else{
						  			seller_html = "<td><a class='seller_link' href='" + dev_type_data[j].link + "' target='_blank'>" + seller + "</a></td>";
						  		}
						  	}else{
						  		seller_html = "<td>Not available</td>"
						  	}
					  		
					  	}
					  	var price = "<td>" + dev_type_data[j].price + " " + dev_type_data[j].currency + "</td>";
					  	if(dev_type_data[j].renting_price_period){
					  		price = "<td>" + dev_type_data[j].price + " " + dev_type_data[j].currency + " / " + dev_type_data[j].renting_price_period + "</td>";
					  	}
					  	$('#result_table_body').append($("<tr class='device' />")
					  							 						.append("<td>" + dev_type_data[j].model + "</td>")
					  							 						.append("<td>" + dev_type_data[j].manufacturer + "</td>")
					  							 						.append(price)
					  							 						.append("<td>" + dev_type_data[j].country + "</td>")
					  							 						.append("<td>" + dev_type_data[j].condition + "</td>")
					  							 						.append(seller_html)
					  							 					 );
				  	}
				  }


				  $('.seller_link').bind("click touchstart", function(ev){
						if (mixpanel){
							mixpanel.register({"email": readCookie("price_comparison_email"), 
																 "device_name": input_field.val(), 
																 "seller": ev.currentTarget.text,
																 "seller_link": ev.currentTarget.href,
																 "sessionId":readCookie("price_comparison_session_id")});
							mixpanel.track("Price Comparison: Leed generated");
						}

						// send request to server
						var jqxhr = $.post( serverURI + "price_comparison_events", 
							{
								"price_comparison_params": {
									"action_type":"lead_generated", 
									"email": readCookie("price_comparison_email"), 
									"device_name": input_field.val(), 
									"seller": ev.currentTarget.text,
									"seller_link": ev.currentTarget.href,
									"sessionId":readCookie("price_comparison_session_id"),
								}
							},
							function(data) {
							})
						  .done(function() {
						  })
						  .fail(function() {
						    //console.log( "error" );
						  })
						  .always(function() {
							});	
					});
			});

		  if (amountOfDevices === data.total_entries){
		  	$('#count_results').text(text[0] + data.total_entries + text[1]);
		  }
		  else{
		  	$('#count_results').text(text[0] + data.total_entries + text[3] + amountOfDevices + text[4]);
		  }
			$('#count_results').animate({opacity: 1.0});
		})
	  .done(function() {
	    //console.log( "second success" );
	  })
	  .fail(function() {
	    //console.log( "error" );
	  })
	  .always(function() {
		});
});

// Send email button click
btn2.bind("click touchstart", function(){
	if(accessCode.css("opacity") === "1"){
		btn2_accesCode_handler();
	}else{
		btn2_email_handler();
	}
});


function btn2_accesCode_handler(){
	if(accessCode.val() === "134679"){
		createCookie("price_comparison_accesscode", "valid", 999);
		btn.click();
	}else{
		accessCode.css("backgroundColor", red);
	}
}

function btn2_email_handler(){
	// store email in cookie
	if(!readCookie("price_comparison_email")){
		createCookie("price_comparison_email", input_email.val(), 999);
	}

	// send request to server
	var jqxhr = $.post( serverURI + "price_comparison_events", 
		{
			"price_comparison_params": {
				"action_type":"device_request", 
				"email": input_email.val(), 
				"device_name": input_field.val(), 
				"sessionId":readCookie("price_comparison_session_id"),
			}
		},
		function(data) {
			$('#enter_access_code_window').fadeIn();
		  accessCode2.focus();
		})
		  .done(function() {
		  	//
		  })
		  .fail(function() {
		    //console.log( "error" );
		  })
		  .always(function() {
		});
}

// Submit Accesscode via popover
$("#validate_access_code").bind("click touchstart", function(){
	if(accessCode2.val() === "134679"){
		createCookie("price_comparison_accesscode", "valid", 999);
		$('#enter_access_code_window').fadeOut();

		setTimeout(function(){
		  btn.click();
		},600);
	}else{
		accessCode2.css("backgroundColor", red);
	}
});

// Return button click
btn_back.bind("click touchstart", back_func);
btn_back2.bind("click touchstart", back_func);

function back_func(){
	results.fadeOut();
	$('#count_results').delay(300).css("opacity", 0);
	get_more_results.fadeOut();
	input_wrapper.delay(350).animate({
		marginLeft: "30%",
		width: "40%"
	}, 400);
	$('#teaser_wrapper').delay(400).fadeIn();
	input_field.delay(500).fadeIn();
	input_field2.delay(500).fadeIn();
	input_field3.delay(500).fadeIn();
	input_field4.delay(500).fadeIn();
	input_label.delay(500).fadeIn();
	input_label2.delay(500).fadeIn();
	input_label3.delay(500).fadeIn();
	input_label4.delay(500).fadeIn();
	$("#help_wrapper").delay(500).fadeIn();
	$('#additional_options_wrapper').delay(500).fadeIn();
	$('#beta_version_desc').delay(500).fadeIn();
	$('#show_more_input').delay(500).fadeIn();
	btn_back2.fadeOut();
	btn.delay(500).fadeIn();
	$('.awesomplete').fadeIn();
	setTimeout(function(){
	  input_field.focus();
	},600);
}

// New request button click
new_request.bind("click touchstart", function(){
	new_request.fadeOut();
	success_message.fadeOut();
	input_field.delay(500).fadeIn();
	input_label.delay(500).fadeIn();
	btn.delay(500).fadeIn();
	input_field.val("");
	input_field.css("backgroundColor", "white");
	setTimeout(function(){
	  input_field.focus();
	},600);
});

// visally help user with email or access code
input_email.focus(function(){
	accessCode.css("opacity", 0.4);
	input_email.css("opacity", 1);
	terms.css("opacity", 1);
	emailCheckboxHandler();
});
accessCode.focus(function(){
	input_email.css("opacity", 0.4);
	terms.css("opacity", 0.4);
	accessCode.css("opacity", 1);
	btn2.prop("disabled", true);
	accessCodeCheckboxHandler();
});

// Validate email
input_email.keyup(emailCheckboxHandler);
input_email.focusout(emailCheckboxHandler);
input_email.change(emailCheckboxHandler);

// Validate code
accessCode.keyup(accessCodeCheckboxHandler);
accessCode.focusout(accessCodeCheckboxHandler);
accessCode.change(accessCodeCheckboxHandler);

// Validate terms
$("#terms input").click(emailCheckboxHandler);

function emailCheckboxHandler(){
	if(input_email.val() === ""){
		input_email.css("backgroundColor", "white");
		btn2.prop("disabled", true);
	}
	else if(isEmail(input_email.val()) && input_email.css("opacity") === "1"){
		input_email.css("backgroundColor", green);

		if($("#terms input").prop("checked") === true){
			btn2.prop("disabled", false);
		}else{
			btn2.prop("disabled", true);
		}
	}else{
		input_email.css("backgroundColor", red);
		btn2.prop("disabled", true)
	}
}

function accessCodeCheckboxHandler(){
	if(accessCode.val() === ""){
		btn2.prop("disabled", true);
	}else{
		btn2.prop("disabled", false);
	}
}

$('#exit_x').bind("click touchstart", function(){
	$('#enter_access_code_window').fadeOut();
});

$('#show_more_input').bind("click touchstart", function(){
	$('#more_input_wrapper').toggle();
	if($('#show_more_input').text() === "+"){
		$('#show_more_input').text("-");
	}else{
		$('#show_more_input').text("+");
		input_field2.val("");
		input_field3.val("");
		input_field4.val("");
		input_field_change(true, "myinput2", undefined);
		input_field_change(true, "myinput3", undefined);
		input_field_change(true, "myinput4", undefined);
		input_field_change(true, "myinput", undefined);
	}
});

// Focus text field
input_field.val("");
input_field.focus();


// Feedback
if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	if (!readCookie("feedback_already_shown")){
		$("#feedback_wrapper").delay(15000).fadeIn();
		createCookie("feedback_already_shown", true, 999);
	}
}

$('#i_like').bind("click touchstart", function(){
	$('#feedback_first_page').fadeOut(240);
	$('#feedback_second_page_a').delay(250).fadeIn();
	feedback_type = "positive";
	feedback_page = feedback_page + 1;
});
$('#i_dont_like').bind("click touchstart", function(){
	$('#feedback_first_page').fadeOut(240);
	$('#feedback_second_page_b').delay(250).fadeIn();
	feedback_type = "negative";
	feedback_page = feedback_page + 1;
});

$('.feedback_next').bind("click touchstart", function(){
	$('#feedback_second_page_a').fadeOut(240);
	$('#feedback_second_page_b').fadeOut(240);
	$('#feedback_third_page').delay(250).fadeIn();
	feedback_page = feedback_page + 1;
});

$('#feedback_submit').bind("click touchstart", function(){
	feedback_submit();	

	$('#feedback_third_page').fadeOut(240);
	$('#feedback_fourth_page').delay(250).fadeIn();	
});

$('.feedback_close').bind("click touchstart", function(){
	$('#feedback_wrapper').fadeOut();

	if (feedback_page === 3){
		feedback_submit();
	}
});

$('#show_feedback').bind("click touchstart", function(){
	$('.not_first_page').hide();
	$('#feedback_first_page').show();	
	$("#feedback_wrapper").stop().fadeIn();
});

function feedback_submit(){
	if (mixpanel){
		mixpanel.register({"feedback_type": feedback_type,
										 "feedback_why": $('#feedback_why_text_a').val() + $('#feedback_why_text_b').val(),	// Feedback text
										 "feedback_job": $('#feedback_job').val(),
										 "feedback_company": $('#feedback_company').val(),
										 "feedback_email": $('#feedback_email').val(),
										 "feedabck_sessionId":readCookie("price_comparison_session_id")});
  	mixpanel.track("Price Comparison: Feedback submitted");
  }

	var jqxhr = $.post( serverURI + "price_comparison_events", 
					{
						"price_comparison_params": {
							"action_type":"feedback", 
							"detail_1": feedback_type,									// Feedback type
							"detail_2": $('#feedback_why_text_a').val() + $('#feedback_why_text_b').val(),	// Feedback text
							"detail_3": $('#feedback_job').val(),
							"detail_4": $('#feedback_company').val(),
							"detail_5": $('#feedback_email').val(),
							"sessionId":readCookie("price_comparison_session_id"),
						}
					},
					function(data) {
						
					})
				  .done(function() {
				  	//
				  })
				  .fail(function() {
				    //console.log( "error" );
				  })
				  .always(function() {
					});
}

if(mixpanel){
	mixpanel.track_links("#main_explanation", "Price comparison: Read more link clicked");
}

$(document).keydown(function(ev){
	// If on second page
	if($('#results_data').is(":visible")){
		// Arrow up
		if(ev.keyCode === 40){
			$('#results_data').animate({scrollTop: "+=70"}, 10);
		}
		// Arrow down
		if(ev.keyCode === 38){
			$('#results_data').animate({scrollTop: "-=70"}, 10);
		}
		// Page up
		if(ev.keyCode === 34){
			$('#results_data').animate({scrollTop: "+=250"}, 10);
		}
		// Page down
		if(ev.keyCode === 33){
			$('#results_data').animate({scrollTop: "-=250"}, 10);
		}
		// Pos1
		if(ev.keyCode === 36){
			$('#results_data').animate({scrollTop: "0"}, 10);
		}
		// End
		if(ev.keyCode === 35){
			$('#results_data').animate({scrollTop: "+=100000"}, 10);
		}

		if(ev.keyCode === 8){
			btn_back2.click();
			ev.preventDefault();
		}
	}
});


$(document).ready(function(){
	// show spinner
	var target = document.getElementById('results_data')
	var spinner = new Spinner(opts).spin(target);
	var height = $(window).height() - $("footer").height() - $('#headline_wrapper').offset().top - $('#headline_wrapper').outerHeight()-250;
	$('#results_data').css("max-height", height);
	$('#results_data').css("height", height);
	
	enable_device_preview = readCookie("enable_device_preview")  === "true" ;
	$("#enable_device_preview").prop("checked", enable_device_preview);
	enable_exact_match = readCookie("enable_exact_match") === "true";
	$("#enable_exact_match").prop("checked", enable_exact_match);
});