var green = "rgb(138, 216, 142)";
var red = "rgb(236, 143, 136)";
var input_field = $("#myinput");
var input_email = $("#emailAddr");
var input_label = $("#input_label");
var input_label2 = $("#input_label2");
var btn = $("#getPrices");
var btn2 = $("#submitRequest");
var btn_back = $("#back");
var success_message = $("#success_message");
var new_request = $("#new_request");
var terms = $("#terms");
var old_input = "";
var new_list = [];

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
	if(getUrlParameter("electronic")){
		$('#page').css("backgroundImage", 'url("price_comparison/bg3.jpg")');
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
var awesome = new Awesomplete(inputReference, {
	minChars: 2,
	maxItems: 200,
	autoFirst: true,
	list: device_arr
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Input field change
document.addEventListener('awesomplete-selectcomplete', input_field_change);
input_field.keyup(function(){
	input_field_change();	
});

function input_field_change(){
	// if textfield value changed
	if (old_input !== input_field.val()){
		old_input = input_field.val();

		// contact server if input is 1, 2 or 3 letters
		if(input_field.val().length > 0 && input_field.val().length < 4){
			var jqxhr = $.get( "http://lvh.me:3000/price_comparison_devices", 
				{
					"search_term": input_field.val()
				},
				function(data) {
				  console.log(data);

				  // store response from server
				  device_arr = data["devices"];
				  awesome._list = data["devices"];
				  awesome.evaluate();
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

		if (input_field.val() !== ""){
			try{
				// disable button
				btn.prop('disabled', true);

				device_arr.forEach(function(el){
					if(el.trim() == input_field.val().trim()){
						throw BreakException;
					}
				});
				input_field.css("backgroundColor", red);
				$("#help_wrapper").css("display", "block");
				awesome.evaluate();
			}catch(e){
				if (e !== BreakException) throw e;
				// enable button and mark input green		
				btn.prop('disabled', false);
				btn.css("display", "block");
				input_field.css("backgroundColor", green);
				$("#help_wrapper").css("display", "none");
			}
		}else{
			btn.prop('disabled', true);		
			input_field.css("backgroundColor", "white");
			awesome.evaluate();
		}
	}
}

// Get prices button click
btn.click(function(){
	input_field.fadeOut();
	input_label.fadeOut();
	btn.fadeOut();
	input_email.delay(500).fadeIn();
	terms.delay(500).fadeIn();
	input_label2.delay(500).fadeIn();
	btn2.delay(500).fadeIn();
	btn_back.delay(500).fadeIn();

	setTimeout(function(){
	  input_email.focus();
	},600);

	var jqxhr = $.post( "http://lvh.me:3000/price_comparison_events", 
		{
			"price_comparison_params": {
				"action_type":"device_chosen", 
				"device_name": input_field.val(), 
				"sessionId":"asdfb",
			}
		},
		function(data) {
		  console.log(data);
		})
		  .done(function() {
		    //console.log( "second success" );
		  })
		  .fail(function() {
		    //console.log( "error" );
		  })
		  .always(function() {
		    //console.log( "finished" );
		});
});

// Send email button click
btn2.click(function(){
	// store email in cookie
	if(!readCookie("price_comparison_email")){
		createCookie("price_comparison_email", input_email.val(), 999);
	}

	// send request to server
	var jqxhr = $.post( "http://lvh.me:3000/price_comparison_events", 
		{
			"price_comparison_params": {
				"action_type":"device_request", 
				"email": input_email.val(), 
				"device_name": input_field.val(), 
				"sessionId":"asdfb",
			}
		},
		function(data) {
		  console.log(data);
		})
		  .done(function() {
		    input_email.fadeOut();
				input_label2.fadeOut();
				btn2.fadeOut();
				terms.fadeOut();
				btn_back.fadeOut();
				success_message.delay(500).fadeIn();
				new_request.delay(500).fadeIn();

				setTimeout(function(){
				  new_request.focus();
				},600);
		  })
		  .fail(function() {
		    //console.log( "error" );
		  })
		  .always(function() {
		    //console.log( "finished" );
		});
});

// Return button click
btn_back.click(function(){
	input_email.fadeOut();
	input_label2.fadeOut();
	btn2.fadeOut();
	terms.fadeOut();
	btn_back.fadeOut();
	input_field.delay(500).fadeIn();
	input_label.delay(500).fadeIn();
	btn.delay(500).fadeIn();
	setTimeout(function(){
	  input_field.focus();
	},600);
});

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

// Validate email
input_email.keyup(emailCheckboxHandler);
input_email.focusout(emailCheckboxHandler);
input_email.change(emailCheckboxHandler);

// Validate terms
$("#terms input").click(emailCheckboxHandler);

function emailCheckboxHandler(){
	if(isEmail(input_email.val())){
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

// Focus text field
input_field.focus();