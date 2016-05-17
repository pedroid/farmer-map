function parseXML(callback) {
	console.log('parseXML');
	//var xmlFile="img_position.xml";
	//var xmlDoc=loadXMLFile(xmlFile);
	var xmlFile="https://dl.dropboxusercontent.com/u/32119999/07taiwan-fruit/img_position.xml";
	var xmlData=loadXMLFile(xmlFile, callback);
	//test();
	//console.log(xmlData);
	//img_grp = xmlData.getElementsByTagName("imgs")[0];

	//console.log(img_grp);

	//number_imgs = img_grp.getElementsByTagName("img").length;

	//x_set = get_img_x("map1");
	//y_set = get_img_y("map1");



}

function loadXMLDoc(filename)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
}

function get_img_month(){
	var month_set = [];
	for(var i =0; i<number_towns; i++){
		var numMapType = img_grp.getElementsByTagName("img")[i].getElementsByTagName("map_name").length;
		var the_img_month_sel = img_grp.getElementsByTagName("img")[i].getElementsByTagName("month")[0].childNodes
		if(the_img_month_sel[0] == null){
			var the_img_month = 0;
		}else {
			var the_img_month = parseInt(the_img_month_sel[0].nodeValue);
		}
		month_set[i] = the_img_month;
	}
	return month_set;
}

function get_img_x(map_name){
	var x_set = [];
	for(var i =0; i<number_towns; i++){
		var numMapType = img_grp.getElementsByTagName("img")[i].getElementsByTagName("map_name").length;
		var theMap_x = img_grp.getElementsByTagName("x")[i].childNodes[0].nodeValue;
		//alert(map_name);
		x_set[i] = parseInt(theMap_x);

	}
	return x_set;
}

function get_img_y(map_name){
	var y_set = [];
	for(var i =0; i<number_towns; i++){
		var numMapType = img_grp.getElementsByTagName("img")[i].getElementsByTagName("map_name").length;
		var theMap_y = img_grp.getElementsByTagName("y")[i].childNodes[0].nodeValue;
		y_set[i] = parseInt(theMap_y);


	}
	return y_set;
}

// 首先會先寫ㄧ個函式來判斷瀏覽器是否支援 javascript 讀取 XML的功能
function loadXMLFile(file, callback){

	//var xmlDoc;
	if (window.ActiveXObject){
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(file);
		return xmlDoc;

	}
	else if (document.implementation && document.implementation.createDocument){
		var xmlInfo = new XMLHttpRequest();
		xmlInfo.onreadystatechange = function callbackFunction(){
			if(xmlInfo.readyState==4){
				console.log(xmlInfo.statusText);
				xmlDoc = xmlInfo.responseXML;
				img_grp = xmlDoc.getElementsByTagName('imgs')[0];
				//console.log(img_grp);
				number_imgs = img_grp.getElementsByTagName("img").length;
				//console.log(number_imgs);
				x_set = get_img_x("taiwan_icon_spring");
				y_set = get_img_y("taiwan_icon_spring");
				//month_set = get_img_month();
				console.log('done loading XML');
				callback && callback();
				flag_done_loading_XML = true;
				return xmlDoc;
			}else{
				console.log('loading XML...');
			}
		}
		xmlInfo.open("GET", file, true);
		xmlInfo.send(null);


	}
//如果瀏覽器不支援就輸出Error

	else{

		alert("您的瀏覽器不支援Javascript!! ");

	}

}
function test(){
	number_towns = Object.keys(towns.db).length;
	x_set = [];
	y_set = [];
	for(var i =0;i<number_towns;i++){
		x_set.push(towns.db[i].x);
		y_set.push(towns.db[i].y);
	}


}
