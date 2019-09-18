function GetLocation()
{
    var port = (window.location.port == '' ? '' : (':' + window.location.port));
    return (window.location.protocol + '//' + window.location.hostname + port) ;
}

var toolScript = document.createElement('script');
document.head.appendChild(toolScript);
toolScript.onload = function() {
	
	document.getElementById('btnAjax').onclick = function() {
		
		var ajaxRequest = AjaxRequest();

		var route = GetLocation() + '/greta-ajax-sample/sample.php';
		var paramRoute = {
			route: 'exemple',
			parametre: 'test'
		};


		callback = function(responseJson){
			alert(responseJson['message']);
		}
		
		ajaxRequest.sendAjax('GET', route , true, paramRoute, callback);

	};

};

toolScript.src = GetLocation() + '/greta-ajax-sample/lib.js';