function UrlManager()
{
    this.construct = function() {

    };

    this.slugifyParams = function(param, indKey, slug1, slug2) {

        var paramStr = '';

        for (var property in param) {

            if(param.hasOwnProperty(property)) {

                paramStr += (slug1 + (indKey ? (property + '=') : '') + encodeURIComponent(param[property]));
                slug1 = slug2;
            }
        }

        return paramStr;
    };

    this.getLocation = function() {
        var port = (window.location.port == '' ? '' : (':' + window.location.port));
        return (window.location.protocol + '//' + window.location.hostname + port) ;
    };

    this.construct();
    return this;
}

function AjaxRequest()
{
    this.xhr = null;
    this.urlManager = null;

    this.construct = function() {

        this.urlManager = UrlManager();

        if(window.XMLHttpRequest || window.ActiveXobject){

            if(window.ActiveXobject){

                try{

                    this.xhr = new ActiveXobject("Msxml2.XMLHTTP");

                }catch(e){

                    this.xhr = new ActiveXobject("Microsoft.XMLHTTP");
                }

            }else{

                this.xhr = new XMLHttpRequest();
            }
        }
    };

    this.sendAjax = function(method, url, async, param, callback, control, object) {

        var that = this;
        this.xhr.onreadystatechange = function() {

            if (that.xhr.readyState == 4 && (that.xhr.status == 200 || that.xhr.status == 0)) {
                try{
                    var reponseJson = JSON.parse(that.xhr.responseText);
                } catch(e){
                    var reponseJson = that.xhr.responseText;
                }

                if(object && typeof object == 'object') {
                    callback.call(object, reponseJson, control);
                } else {
                    callback(reponseJson, control);
                }
            }
        };

        if(method == 'GET') {

            url = url + this.urlManager.slugifyParams(param, true, '?', '&');
        }

        this.xhr.open(method, url, async);

        if(method == 'POST') {

            this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.xhr.send(this.urlManager.slugifyParams(param, true, '', '&'));

        } else if(method == 'GET') {

            this.xhr.send();
        }
    };

    this.construct();
    return this;
}