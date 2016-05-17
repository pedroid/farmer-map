//global variables

const MAP_SPRING = 0;
const MAP_SUMMER = 1;
const MAP_FALL = 2;
const MAP_WINTER = 3;
window.onload = function(){

	protagonist = new Protagonist;
	jarvis = new JARVIS; //assistant managing system information and behavior
	//parseXML(parseXML_callback);

	crops_main();
	test();
	configuration();
	repeat(continuous_update);

}

function crops_main(){
	//Octopus
	octopus = {
			init:function(){
					view.init();
			},
			search:function(){

			},
			fn_search:function(theObject, ObjectType, database, Region){
			if(arguments.length==0){
				console.log("example1 :octopus.fn_search('�s�˿�','county',crops.db)");
				console.log("example2 :octopus.fn_search('ī�G','crop',crops.db)");
				console.log("example3 :octopus.fn_search('3','month',crops.db)");
				console.log("example4: octopus.fn_search('�ӥ���','town',crops.db)")
				return;
			}
			if(arguments.length ==4){
				for( index_product=0; index_product< Object.keys(database).length; index_product++){
					if(theObject == database[index_product].crop & Region == database[index_product].county){
						console.log("["+index_product+"]["+Region+"] ["+ database[index_product].town+"] ���Ͳ�["+theObject+ "]["+database[index_product].variety+"];month:"+database[index_product].month+".");
					}
				}
				return;
			}
							var index_product=0;
							var results_search = {};
							var num_results = 0;
							switch(ObjectType){
									case "crop":
											for( index_product=0; index_product< Object.keys(database).length; index_product++){
													if(theObject == database[index_product].crop){
															results_search[num_results] = database[index_product];
															num_results ++;
													}
											}
											console.log("�`�@ ["+num_results+"] �Ӱϰ�(town)�� ["+theObject+ "].");
											break;
									case "county":
											for( index_product=0; index_product< Object.keys(database).length; index_product++){
													if(theObject == database[index_product].county){
															results_search[num_results] = database[index_product];
															num_results ++;
							console.log("["+index_product+"] ["+ database[index_product].town+"] ���Ͳ�["+database[index_product].crop+"]:"+database[index_product].variety+";month:"+database[index_product].month+".");
													}
											}
											console.log(" ["+theObject + "] �� ["+num_results+"] �ا@��.");
											break;
									case "town":
											for( index_product=0; index_product< Object.keys(database).length; index_product++){
													if(theObject == database[index_product].town){
															results_search[num_results] = database[index_product];
															num_results ++;
							console.log("["+index_product+"] ["+ database[index_product].town+"] ���Ͳ�["+database[index_product].crop+"]:"+database[index_product].variety+";month:"+database[index_product].month+".");
													}
											}
											console.log(" ["+theObject + "] �� ["+num_results+"] �ا@��.");
											break;
				case "month":
					for( index_product=0; index_product< Object.keys(database).length; index_product++){
													if(theObject == database[index_product].month){
															results_search[num_results] = database[index_product];
															num_results ++;
													}
											}
											console.log("["+theObject + "] �릳 ["+num_results+"] �ا@��.");
											break;
									default:
											break;

							}

							return results_search;




			}


	};

	//View
	var view = {
			init:function(){
					var nowday = new Date();
					var days_each_month = [31,28,31,30,31,30,31,31,30,31,30,31];
					var the_month = nowday.getMonth();
					var the_day = nowday.getDate();
					curr_season = the_month + the_day/days_each_month[the_month];//curr_season range: 0~12
			},

	}
	octopus.init();
}


function parseXML_callback(){
	configuration && configuration();
	repeat && repeat(continuous_update);
}

function configuration(){
	//console.log('configuration start');
	sys_inf = document.getElementById('info');
	img_itrimap = document.getElementById('ITRImap_img');
	jarvis.size_itrimap_width = img_itrimap.clientWidth;
	jarvis.size_itrimap_height = img_itrimap.clientHeight;
	jarvis.size_canvas_width = jarvis.size_itrimap_width;
	jarvis.size_canvas_height = jarvis.size_itrimap_height;

	var canvas_layer_marker = document.getElementById('marker_canvas');
	var canvas = document.getElementById('canvas');
	var canvas_marker_layer = canvas_layer_marker.getContext('2d');
	canvas.width = jarvis.size_canvas_width;
	canvas.height = jarvis.size_canvas_height;
	canvas_layer_marker.width = canvas.width;
	canvas_layer_marker.height = canvas.height;
	c = canvas.getContext('2d');
	c.clear = function() {this.clearRect(0,0,img_itrimap.clientWidth,img_itrimap.clientHeight);};

	if(canvas.width == 0){canvas.width = 500};
	if(canvas.height == 0){canvas.height = 800};

	protagonist.x = protagonist.x_initial;
	protagonist.y = protagonist.y_initial;
	protagonist.x_target = protagonist.x_initial;
	protagonist.y_target = protagonist.y_initial;





	marker_div_id = document.getElementById('marker_div');

	mousex = 0, mousey=0, mouseclicks = 0;

	flag_show_ptr = 1;//default: do show
	readmore_about = false;



	print_index_on_map(flag_show_ptr);

	document.onkeydown = function(e) {
		var key = e.keyCode;
		//key code
		//http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2

		if(key==84) {//t
			/*
			track_en=!track_en;
			//console.log(track_en);
			//console.log(jogging_trajectory_map1[0][0]);
			protagonist.x_target = protagonist.x;
			protagonist.y_target = protagonist.y;
			*/
			jarvis.sys_image_hold = !jarvis.sys_image_hold;
		}
		else if (key==65) {
			readmore_about = !readmore_about; //A for readmore_about
				if(readmore_about){
					$('#readmore_note').fadeOut(800);
				}else{
					$('#readmore_note').fadeIn(800);
					//do nothing
				}
		}

		else if ( key == 83) { //show ptr of picture or not
			/*
			console.log('S');

			if(flag_show_ptr){
				document.getElementById('marker_div').style.display='none';
				flag_show_ptr = 0;
				print_index_on_map(flag_show_ptr);
			}else {
				document.getElementById('marker_div').style.display='inline';
				flag_show_ptr = 1;
				print_index_on_map(flag_show_ptr);
			}
			*/
		}
		else if ( key == 9) {		//Tab- change map
			//console.log('Tab');
			jarvis.map_index = jarvis.map_index + 1; //s
			//if(image_index == number_imgs) image_index = 0;
			switch(jarvis.map_index){
				case MAP_SPRING:
					jogging_trajectory = jogging_trajectory_map1;
					break;
				case MAP_SUMMER:
					img_itrimap.src = "/assets/taiwan_icon_summer.png";
					var file_path = "/assets/taiwan_icon_summer.png";
					//loadImage(img_itrimap, file_path);
					jarvis.current_season = 1;
					break;
				case MAP_FALL:
					img_itrimap.src = "/assets/taiwan_icon_fall.png";
					//loadImage(img_itrimap, file_path);
					jarvis.current_season = 2;
					break;
				case MAP_WINTER:
					img_itrimap.src = "/assets/taiwan_icon_winter.png";
					//loadImage(img_itrimap, file_path);
					jarvis.current_season = 3;
					break;
				default:
					jarvis.map_index = 0;


			}
			print_index_on_map(flag_show_ptr);
			//console.log(image_index);
			//console.log(x_set);
		}
		else return true;
		return false;
	};





		document.getElementById("ITRImap").addEventListener('mousedown', function(e){
		if(jarvis.track_en){
			jarvis.track_en = false;
			protagonist.x_target = protagonist.x;
			protagonist.y_target = protagonist.y;
		}else{
			protagonist.x_target = e.clientX -jarvis.map_x_bias;
			protagonist.y_target = e.clientY -jarvis.map_y_bias;
		}
	})


	document.getElementById("tab_button_id").addEventListener('mousedown', function(e){
		//console.log('Tab');
			jarvis.map_index = jarvis.map_index + 1; //s
			if(jarvis.map_index>3){jarvis.map_index = 0;}
			//console.log(jarvis.map_index);
			//if(image_index == number_imgs) image_index = 0;
			switch(jarvis.map_index){
				case MAP_SPRING:
					img_itrimap.src = "/assets/taiwan_icon_spring.png";
					break;
				case MAP_SUMMER:
					img_itrimap.src = "/assets/taiwan_icon_summer.png";
					jarvis.current_season = 1;
					break;
				case MAP_FALL:
					img_itrimap.src = "/assets/taiwan_icon_fall.png";
					jarvis.current_season = 2;
					break;
				case MAP_WINTER:
					img_itrimap.src = "/assets/taiwan_icon_winter.png";
					jarvis.current_season = 3;
					break;
				default:
					jarvis.map_index = 0;


			}
			print_index_on_map(flag_show_ptr);
			//console.log(image_index);
			//console.log(x_set);
	})


	document.getElementById("tab_left_button_id").addEventListener('mousedown', function(e){
		//console.log('Tab');
			jarvis.map_index = jarvis.map_index - 1; //s
			if(jarvis.map_index<0){jarvis.map_index = 3;}
			//console.log(jarvis.map_index);
			//if(image_index == number_imgs) image_index = 0;
			switch(jarvis.map_index){
				case MAP_SPRING:
					img_itrimap.src = "/assets/taiwan_icon_spring.png";
					break;
				case MAP_SUMMER:
					img_itrimap.src = "/assets/taiwan_icon_summer.png";
					jarvis.current_season = 1;
					break;
				case MAP_FALL:
					img_itrimap.src = "/assets/taiwan_icon_fall.png";
					jarvis.current_season = 2;
					break;
				case MAP_WINTER:
					img_itrimap.src = "/assets/taiwan_icon_winter.png";
					jarvis.current_season = 3;
					break;
				default:
					jarvis.map_index = 0;


			}
			print_index_on_map(flag_show_ptr);
			//console.log(image_index);
			//console.log(x_set);
	})



	var track="jogging";

	document.onkeyup = function(e) {
		var key = e.keyCode;
		//dx=0;
		//dy=0;


		if (key == 37 || key == 39 || key == 74 || key == 76 ) {
			dx=0; //L, R
			protagonist.dx=0;
		}
		else if (key == 38 || key == 40 || key == 73 || key == 75 ) dy=0; //U/D
		else if (key == 84) { dx = 0; dy = 0;}//t


		return false;
	};




	canvas.onmousemove = function(e) {
		var rect = canvas.getBoundingClientRect();
		mousex = e.clientX - rect.left;
		mousey = e.clientY - rect.top;
	};
	canvas.onmousedown = function(e) {mouseclicks++;};



	c.beginPath();
	c.arc(protagonist.x, protagonist.y, jarvis.radius, 0, 2 * Math.PI, false);
	c.fillstyle = 'black';
	c.fill();

}

function forfun(tmp){
	console.log(tmp);
}



function get_line_coef(pt1, pt2){
	//equation: ax + by +c = 0;
	//(y1-y0)x + (x0-x1)y + (x1-x0)y0+(y0-y1)x0 = 0;
	//a = y1-y0;
	//b = x0-x1;
	//c = (x1-x0)y0+(y0-y1)x0;
	var line_coef = [0,0,0];
	var x0 = pt1[0];
	var y0 = pt1[1];
	var x1 = pt2[0];
	var y1 = pt2[1];
	a = y1-y0;
	b = x0-x1;
	c = (x1-x0)*y0+(y0-y1)*x0;
	line_coef = [a,b,c];
	return line_coef;
}
