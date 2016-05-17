function repeat(fn) {
	//console.log('repeat');
	if (window.requestAnimationFrame) {
	  var advance = function() {fn(); requestAnimationFrame(advance);};
	  requestAnimationFrame(advance);
	} else window.setInterval(fn, 100);
}
function wait(fn) {window.setTimeout(fn, 250); }

function continuous_update(){
	//console.log(100*protagonist.x/size_itrimap_width + ','+ 100*protagonist.y/size_itrimap_height);
		c.clear();
		protagonist.x = protagonist.x + protagonist.dx;
		protagonist.y = protagonist.y + protagonist.dy;
		//console.log("3:" + man_position_y);
		//boundary condition

			if(protagonist.x<jarvis.map_x_bias_min) protagonist.x = map_x_bias_min;
			if(protagonist.y<jarvis.map_y_bias_min) protagonist.y = map_y_bias_min;
			if(protagonist.x>jarvis.map_x_bias_min + jarvis.size_canvas_width) protagonist.x = jarvis.map_x_bias_min + jarvis.size_canvas_height;
			if(protagonist.y>jarvis.map_y_bias_min + jarvis.size_canvas_height) protagonist.y = jarvis.map_y_bias_min + jarvis.size_canvas_height;
		//end of boundary condition



		//�e���N�����U�����m
		c.beginPath();
		c.arc(protagonist.x, protagonist.y, jarvis.radius, 0, 2 * Math.PI, false);
		c.fillstyle = 'black';
		c.fill();

		var thePositionIcon = document.getElementById('thePositionIcon');
		//console.log(thePositionIcon);

		thePositionIcon.style.position = "absolute";
		var bias_x = -10;
		var bias_y = -0;
		thePositionIcon.style.top = protagonist.y + bias_y + 'px';
		thePositionIcon.style.left = protagonist.x + bias_x + 'px';
		if(navigator.userAgent.match("Chrome")){
			if(protagonist.dx>0) thePositionIcon.style.WebkitTransform  = 'scaleX(1)';
			else if (protagonist.dx<0) thePositionIcon.style.WebkitTransform  = 'scaleX(-1)';
			else thePositionIcon.style.WebkitTransform  = 'scaleX(1)';
		}else {//do nothing on other navigator
		}
		//output information
		var innerHTML_text = "";
		innerHTML_text += "size of map:(" + jarvis.size_canvas_width + ", " + jarvis.size_canvas_height + ")<br><br>";
		ratio_man_position_x = (protagonist.x)/img_itrimap.clientWidth;
		ratio_man_position_y = (protagonist.y)/img_itrimap.clientHeight;
		innerHTML_text += "x:" + protagonist.x + "(" + 100*ratio_man_position_x.toPrecision(2) + "%);" + "<br>y:" + protagonist.y+ "(" + 100*ratio_man_position_y.toPrecision(2) + "%);" ;
		//console.log('(x,y)=('+((500*ratio_man_position_x-2)/5).toPrecision(4)+','+((800*ratio_man_position_y-14.94)/8).toPrecision(4)+')%');
		sys_inf.innerHTML = innerHTML_text;
		//end of output information



		itri_pic_canvas_id = document.getElementById('itri_pic');
		var vision_depth = 5;

		img_event_check(ratio_man_position_x,ratio_man_position_y, itri_pic_canvas_id, vision_depth);


		var NumberParagraph = document.getElementsByClassName('readmore_paragraph').length;
		for(var i_parag =0; i_parag<NumberParagraph; i_parag= i_parag+1){
			if(readmore_about){
				document.getElementsByClassName('readmore_paragraph')[i_parag].style.display="inline";
			}else {
				document.getElementsByClassName('readmore_paragraph')[i_parag].style.display="none";
			}
		}
		//console.log(track_en);
		if(jarvis.track_en & !flag_loading){

			//console.log('x:'+man_position_x);

			var jogging_trajectory = jogging_trajectory_map1;
			Num_points_in_track = Object.keys(jogging_trajectory).length;

			target_point = [jogging_trajectory[protagonist.iTarget][0]/100*img_itrimap.clientWidth, jogging_trajectory[protagonist.iTarget][1]/100*img_itrimap.clientHeight]

			//console.log('iTarget:' + iTarget);
			//console.log('target:'+jogging_trajectory[iTarget]);

			var output_getMovingAction = getMovingAction(target_point, [protagonist.x, protagonist.y]);
			var dist2Target = output_getMovingAction[0];
			if(dist2Target<1) protagonist.iTarget = protagonist.iTarget + 1;
			if(protagonist.iTarget==Num_points_in_track) protagonist.iTarget = 0;

			protagonist.dx = output_getMovingAction[1];
			protagonist.dy = output_getMovingAction[2];

		}else if(jarvis.track_en & flag_loading){
			protagonist.dx = 0;
			protagonist.dy = 0;
		}
		else{
		}

		if(!jarvis.track_en){
			//console.log('test');
			if(protagonist.x < protagonist.x_target & (protagonist.x_target-protagonist.x)>=1){
				protagonist.dx = 1;
			}
			else if(protagonist.x > protagonist.x_target &(protagonist.x-protagonist.x_target)>=1){
				protagonist.dx = -1;
			}else protagonist.dx = 0;
			if(protagonist.y < protagonist.y_target& (protagonist.y_target-protagonist.y)>1){
				protagonist.dy = 1;
			}
			else if(protagonist.y > protagonist.y_target&(protagonist.y-protagonist.y_target)>1){
				protagonist.dy = -1;
			}else protagonist.dy = 0;
		}
	}
	function print_specific_index_on_map(id_to_show){
		marker_div_id.innerHTML="";
		marker_div_id.innerHTML += '<img class = "ptr" id="ptr' + '0' + '" src="'+ "assets/pointer.png" + '" />';
		var id_element_to_get = 'ptr0';
		var thePtr = document.getElementById(id_element_to_get);
		thePtr.style.position = "absolute";
		//console.log(canvas.height);
		thePtr.style.top = jarvis.map_y_bias + jarvis.size_itrimap_height * y_set[id_to_show]/100 + 'px';
		//console.log(thePtr.style.top);

		thePtr.style.left = jarvis.map_x_bias + jarvis.size_itrimap_width * x_set[id_to_show]/100 + 'px';
		thePtr.style.opacity = 0.7;
	}

	function print_index_on_map(index_to_show){
		//console.log('start print index on map');
	//console.log('x_set:'+x_set);
	//console.log('y_set:'+y_set);
	//console.log(canvas.height);
		marker_div_id.innerHTML="";

		for(var i=0; i<index_to_show.length; i++){
			marker_div_id.innerHTML += '<img class = "ptr" id="ptr' + i + '" src="'+ "assets/pointer.png" + '" />';
			var id_element_to_get = 'ptr'+i;
			var thePtr = document.getElementById(id_element_to_get);
			thePtr.style.position = "absolute";
			//console.log(canvas.height);
			thePtr.style.top = jarvis.map_y_bias +jarvis.size_itrimap_height * y_set[index_to_show[i]]/100 + 'px';
			//console.log(thePtr.style.top);

			thePtr.style.left = jarvis.map_x_bias +jarvis.size_itrimap_width * x_set[index_to_show[i]]/100 + 'px';
			thePtr.style.opacity = 0.7;
			//console.log(thePtr);
		}


			//console.log('end print index on map');
	}
	var currImg_filename;
	var x_reg;
	var y_reg;
	var town_to_show_index = [];
	var minimum_distance = 100;//percentage
	var minimum_distance_i;
	var minimum_disttance_i_reg;
	var the_town_to_show_id;
	function img_event_check(x,y,pic_div_id, vision_depth){

			var distance;

			var dx;
			var dy;

			if(x_reg == x && y_reg == y && jarvis.season_reg == jarvis.current_season){
				//console.log('not move');
			}
			else{
				town_to_show_index = [];
				minimum_distance = 100;
				for(var i=0; i<number_towns; i++){
					//console.log('dx:'+dx+';dy:'+dy);
					//console.log("img_event_check:" + number_imgs);
					dx = 100*x - x_set[i];
					dy = 100*y - y_set[i];
					distance = Math.sqrt(dx*dx + dy*dy);
					//distance=0;
					//var the_town_has_crops = Object.keys(crops.filter(towns.db[i].town,'town').db).length>0;
					if(distance < vision_depth && Object.keys(crops.filter(towns.db[i].town,'town').filter_season(jarvis.current_season).db).length>0){
						town_to_show_index.push(i);
						if(distance < minimum_distance){
							minimum_distance = distance;
							minimum_distance_i = i;
						}
					}

					minimum_distance_i_reg = minimum_distance_i;
				}

				//console.log('minimum distance:'+minimum_distance);
				//console.log('disance:'+distance);
				//console.log('id:'+image_to_show_index);
				//console.log(town_to_show_index);

				var text_description;
				//console.log(flag_loading);


				//console.log('!flag_loading');
				if(minimum_distance < vision_depth) {
					//var random_index = Math.floor(Math.random() * town_to_show_index.length);
					//console.log('random'+random_index);
					the_town_to_show_id = minimum_distance_i;/*town_to_show_index[random_index]*/;

					if(protagonist.current_position != the_town_to_show_id) {
						protagonist.current_position = the_town_to_show_id; //protagonist on which county
					}
					print_index_on_map(town_to_show_index);


					var title_img = '這個季節有盛產農產品最近的鄉鎮是：'+towns.db[the_town_to_show_id].town;
					var town_closest = towns.db[the_town_to_show_id].town;
					//print_specific_index_on_map(the_town_to_show_id);

					var crops_to_show = crops.filter(town_closest,'town').filter_season(jarvis.current_season);
					text_description = crops_to_show.returnCropSpecificSeason();
					var html_town_to_suggest = ''
					switch(jarvis.current_season){
						case 0:html_town_to_suggest+='<b>春季</b>';break;
						case 1:html_town_to_suggest+='<b>夏季</b>';break;
						case 2:html_town_to_suggest+='<b>秋季</b>';break;
						case 3:html_town_to_suggest+='<b>冬季</b>';break;
					}

					html_town_to_suggest += '附近農產品盛產的鄉鎮有：';
					for(var i=0;i<town_to_show_index.length;i=i+1){
						html_town_to_suggest+= "<a onclick='GoToSpecificTown(town_to_show_index["+i+"])'>"+towns.db[town_to_show_index[i]].town + "</a> ";
					}

					$('#img_description').html("<h1>" + title_img + "</h1>"+"<p>"+text_description+"</p>"+"</br></br></br></br><p>"+html_town_to_suggest+"</p>");


					//do nothong

				}else{// the case that distance> range
					print_specific_index_on_map(minimum_distance_i);
					var title_img = towns.db[minimum_distance_i_reg].town + '盛產有';
					var crops_to_show = crops.filter(towns.db[minimum_distance_i_reg].town,'town').filter_season(jarvis.current_season);
					text_description = crops_to_show.returnCropSpecificSeason();
					html_town_to_suggest = '附近農產品盛產的鄉鎮有：'+"<a onclick='GoToSpecificTown(minimum_distance_i_reg)'>"+towns.db[minimum_distance_i_reg].town + "</a> ";
					$('#img_description').html("<h1>" + title_img + "</h1>"+"<p>"+text_description+"</p>"+"</br></br></br></br><p>"+html_town_to_suggest+"</p>");

				}
			}//end of else
			x_reg = x;
			y_reg = y;
			jarvis.season_reg = jarvis.current_season;

		}
	function GoToSpecificTown(town_to_go_id){
		console.log(towns.db[town_to_go_id].town);
		protagonist.x_target = jarvis.size_itrimap_width  * x_set[town_to_go_id]/100;
		protagonist.y_target = jarvis.size_itrimap_height * y_set[town_to_go_id]/100;
	}
