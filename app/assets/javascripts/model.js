function Protagonist () {
	this.x_initial = 331;
	this.y_initial = 209;
	this.x_target;
	this.y_target;
	this.dx = 0;
	this.dy = 0;
	this.x;
	this.y;
	this.got_match = function(){
		//console.log(this.file+':'+this.match);
		this.match = true;
		this.is_choosen = false;
		this.show = true;
	};
	this.reset = function(){
		this.is_choosen = false;
		this.show = false;
	}
	this.iTarget = 0;
	this.current_position;
}

function JARVIS(){
	this.radius = 5;
	this.image_hold_flag = 0;
	this.month_set;
	this.size_itri_height;
	this.size_itri_weight;
	this.size_canvas_width;
	this.size_canvas_height;
	this.track_en = false;
	this.map_index = 0;
	this.sys_image_hold = false;
	this.flag_done_loading_XML;
	this.current_season = MAP_SPRING;
	this.season_reg = this.current_season;
	this.map_x_bias = 0;//for calibrate nav bar
	this.map_y_bias = 50;//px
	this.map_x_min = this.map_x_bias + 1;	
	this.map_y_min = this.map_y_bias + 1;	
}
