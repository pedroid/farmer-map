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

function distance_pt2line(line_coef, point){
	//line_coef = (a, b, c) for ax+by+c = 0;
	//point = (x0,y0)
	//equation: |ax0+by0+c| / sqrt(a^2 + b^2)
	var a = line_coef[0];	
	var b = line_coef[1];	
	var c = line_coef[2];
	var x0 = point[0]; 
	var y0 = point[1];
	var distance = Math.abs(a*x0 + b*y0 + c)/Math.sqrt(a*a + b*b);
	return distance
}

function getMovingAction(TargetPoint, CurrentPosition){ 
	var dx;
	var dy;
	var X_t = TargetPoint[0];
	var Y_t = TargetPoint[1];
	var X_c = CurrentPosition[0];
	var Y_c = CurrentPosition[1];	
	var d_T2C = Math.sqrt((X_t - X_c)*(X_t - X_c) + (Y_t - Y_c)*(Y_t - Y_c) );	
	if(d_T2C<1){
		dx = (X_t - X_c );
		dy = (Y_t - Y_c );
	}else{
		dx = (X_t - X_c )/d_T2C;
		dy = (Y_t - Y_c )/d_T2C;
	}
	
	return [d_T2C, dx, dy];
}