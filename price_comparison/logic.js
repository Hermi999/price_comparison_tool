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
var old_input = "";
var old_input2 = "";
var old_input3 = "";
var old_input4 = "";
var accessCode = $('#accessCode');
var accessCode2 = $('#accessCode2');
var displaySeller = true;
var serverURI = "https://tools.rentog.com/";
var active_element_id = document.activeElement.id;
var data_source;
var awesome_temp;
var old_input_temp;
var input_field_temp;
var text = [];

function getServerURI(){
	if(window.location.href.includes("home")){
		// Development
		serverURI = "http://lvh.me:3000/";
	}

	if(window.location.href.includes("/de") || window.location.href.includes("_de")){
		text[0] = "Wir haben ";
		text[1] = " Gerät(e) in unserer Datenbank gefunden.";
		text[2] = "Zugriffscode eingeben ...";
		teaser_text_electronic = "Wir haben die Preise von Marken wie Megger, Omicron und FLIR."
	}else{
		text[0] = "We found ";
		text[1] = " device(s) for your request.";
		text[2] = "Enter access code ...";
		teaser_text_electronic = "We have the prices from your favourite brands like Megger, Omicron and FLIR."
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

function changeBackgroundImage(){
	if(getUrlParameter("energy")){
		$('#page').css("backgroundImage", 'url("/price_comparison/bg3.jpg")');
		$('#teaser').text(teaser_text_electronic);
	}
}
changeBackgroundImage();


var cookie = function(){
 if (!readCookie("price_comparison_session_id")){ 
 	createCookie("price_comparison_session_id", makeid(), 999);
 }else{
 	input_email.val(readCookie("price_comparison_email"));
 	$("#terms input").prop("checked", true)
 }
}();


var inputReference = document.getElementById("myinput");
var inputReference2 = document.getElementById("myinput2");
var inputReference3 = document.getElementById("myinput3");
var inputReference4 = document.getElementById("myinput4");
var awesome = new Awesomplete(inputReference, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr });
var awesome2 = new Awesomplete(inputReference2, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr2 });
var awesome3 = new Awesomplete(inputReference3, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr3 });
var awesome4 = new Awesomplete(inputReference4, {minChars: 2, maxItems: 200, autoFirst: true, list: device_arr4 });

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Input field change
document.addEventListener('awesomplete-selectcomplete', input_field_change);
input_field.keyup(function(){
	input_field_change(true);	
});
input_field2.keyup(function(){
	input_field_change(true);	
});
input_field3.keyup(function(){
	input_field_change(true);	
});
input_field4.keyup(function(){
	input_field_change(true);	
});

function input_field_change(none_awesomplete_event, active_element_id){
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
	var old_input_length = old_input_temp.length;
	var new_input_length = input_field_temp.val().length;

	// if textfield value changed
	if (old_input_temp !== input_field_temp.val()){
		old_input_temp = input_field_temp.val();

		// contact server if input is 1, 2 or 3 letters
		if( none_awesomplete_event === true && ((input_field_temp.val().length > 0 && input_field_temp.val().length < 4) || (old_input_length+1 < new_input_length))){
			var jqxhr = $.get( serverURI + "price_comparison_devices", 
				{
					"search_term": input_field_temp.val()
				},
				function(data) {
				  console.log(data);

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
		}


		// check if text in textfield matches a valid dataset
		var BreakException = {};

		if (input_field_temp.val() !== ""){
			try{
				// disable button
				if(input_field.css("backgroundColor") !== green && input_field2.css("backgroundColor") !== green && 
					 input_field3.css("backgroundColor") !== green && input_field4.css("backgroundColor") !== green){
					btn.prop('disabled', true);
				}

				data_source.forEach(function(el){
					if(el.trim() == input_field_temp.val().trim()){
						throw BreakException;
					}
				});
				input_field_temp.css("backgroundColor", red);
				$("#help_wrapper").css("display", "block");
				awesome_temp.evaluate();
			}catch(e){
				if (e !== BreakException) throw e;
				// enable button and mark input green		
				btn.prop('disabled', false);
				btn.css("display", "block");
				input_field_temp.css("backgroundColor", green);
				$("#help_wrapper").css("display", "none");
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

// Get prices button click
btn.click(function(){
	$('#result_table_body').empty();
	input_field.fadeOut();
	input_field2.fadeOut();
	input_field3.fadeOut();
	input_field4.fadeOut();
	input_label.fadeOut();
	input_label2.fadeOut();
	input_label3.fadeOut();
	input_label4.fadeOut();
	$('#show_more_input').fadeOut();
	$('.awesomplete').fadeOut();
	btn.fadeOut();
	input_wrapper.animate({
		marginLeft: "10%",
		width: "80%"
	}, 400);
	results.delay(500).fadeIn();
	btn_back2.delay(500).fadeIn();
	
	/*
	if(readCookie("price_comparison_accesscode") === "valid"){
		displaySeller = true;
		get_more_results.hide();
		btn_back2.delay(500).fadeIn();
	}else{
		get_more_results.delay(500).fadeIn();
		btn_back2.fadeOut();
	}*/


	var jqxhr = $.post( serverURI + "price_comparison_events", 
		{
			"price_comparison_params": {
				"action_type":"device_chosen", 
				"device_name": [input_field.val(), input_field2.val(), input_field3.val(), input_field4.val()], 
				"sessionId":readCookie("price_comparison_session_id"),
			}
		},
		function(data) {
			console.log(data);
		  var amountOfDevices = 0;

		  $.each(data.result, function(index, dev_type_data){
			  	var type_amountOfDevices = dev_type_data.length;
			  	amountOfDevices = amountOfDevices + type_amountOfDevices;

				  for(var j=0; j<type_amountOfDevices; j++){
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

				  $('.seller_link').click(function(ev){
						// send request to server
						console.log(ev);
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
								console.log(data);
							})
						  .done(function() {
						  	//
						  })
						  .fail(function() {
						    //console.log( "error" );
						  })
						  .always(function() {
							});	
					});
			});

			$('#count_results').text(text[0] + amountOfDevices + text[1]);
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
btn2.click(function(){
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
$("#validate_access_code").click(function(){
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
btn_back.click(back_func);
btn_back2.click(back_func);

function back_func(){
	results.fadeOut();
	get_more_results.fadeOut();
	input_wrapper.delay(250).animate({
		marginLeft: "30%",
		width: "40%"
	}, 400);
	input_field.delay(500).fadeIn();
	input_field2.delay(500).fadeIn();
	input_field3.delay(500).fadeIn();
	input_field4.delay(500).fadeIn();
	input_label.delay(500).fadeIn();
	input_label2.delay(500).fadeIn();
	input_label3.delay(500).fadeIn();
	input_label4.delay(500).fadeIn();
	$('#show_more_input').delay(500).fadeIn();
	btn_back2.fadeOut();
	btn.delay(500).fadeIn();
	$('.awesomplete').fadeIn();
	setTimeout(function(){
	  input_field.focus();
	},600);
}

// New request button click
new_request.click(function(){
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

$('#exit_x').click(function(){
	$('#enter_access_code_window').fadeOut();
});

$('#show_more_input').click(function(){
	$('#more_input_wrapper').toggle();
	if($('#show_more_input').text() === "+"){
		$('#show_more_input').text("-");
	}else{
		$('#show_more_input').text("+");
		input_field2.val("");
		input_field3.val("");
		input_field4.val("");
		input_field_change(true, "myinput2");
		input_field_change(true, "myinput3");
		input_field_change(true, "myinput4");
		input_field_change(true, "myinput");
	}
});

// Focus text field
input_field.val("");
input_field.focus();