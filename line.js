function Line(map,group)
{
	this.map=map;
	this.group=group;
	this.startPos=null;
	this.endPos=null;
	this.startRound=null;
	this.endRound=null;
	this.zoom=null;
	this.line=null;
	this.arrowNode=null;
	this.arrow=null;
	this.trueSpos=null;
	this.trueEpos=null;
	this.animateTime=null;
	this.vector=null;
	this.rotate=null;
	
	this.init=function(startPos,endPos)
	{
		this.startPos=startPos;
		this.endPos=endPos;
		this.startRound=this.group.append("circle").attr("fill", "#fff");
		this.endRound=this.group.append("circle").attr("fill","#fff")
		this.animateTime=0;
		
	//添加marker标签及其属性
		/* this.arrowMarker = this.group.append("marker")
			.attr("id","arrow")
			.attr("markerUnits","strokeWidth")
			.attr("markerWidth",12)
			.attr("markerHeight",12)
			.attr("viewBox","0 0 12 12")
			.attr("refX",6)
			.attr("refY",6)
			.attr("orient","auto") */
		
		
		//绘制箭头
		var arrow_path = "M2,2 L4,3 L2,4 L3,3 L2,2";
		this.arrow = this.group.append("defs").append("path").attr("id","shape").attr("d",arrow_path).attr("fill","#000");
		
		this.arrowNode=this.group.append("use").attr("xlink:href","#shape");
		//绘制直线
		this.line = this.group.append("line").attr("stroke","red").attr("stroke-width",2);//.attr("marker-start","url(#arrow)").attr("marker-end","url(#arrow)");
		/* this.line = this.group.append("path")  
             .attr("fill","#00000000")  
             .attr("stroke","red")  
             .attr("stroke-width",2)  
             .attr("marker-start","url(#arrow)")  
             .attr("marker-mid","url(#arrow)")  
             .attr("marker-end","url(#arrow)"); */  
			 
		this.ZoomUp();
	
	
		
	}
	this.ZoomUp=function()
	{
		this.zoom=this.map.getZoom();
		this.trueSpos=this.map.latLngToLayerPoint(this.startPos,this.zoom);
		this.trueEpos=this.map.latLngToLayerPoint(this.endPos,this.zoom);
		this.startRound.attr("cx", this.trueSpos.x).attr("cy", this.trueSpos.y).attr("r", 6*this.zoom/3);
		this.endRound.attr("cx", this.trueEpos.x).attr("cy", this.trueEpos.y).attr("r", 6*this.zoom/3);
		this.line.attr("x1",this.trueSpos.x).attr("y1",this.trueSpos.y).attr("x2",this.trueEpos.x).attr("y2",this.trueEpos.y);
		
		var arrow_path = "M0,0"+
						" L"+-7*this.zoom+","+3*this.zoom+
						" L"+-this.zoom*6+","+0+
						" L"+-7*this.zoom+","+-3*this.zoom+
						" L0,0";
		this.arrow.attr("d",arrow_path);
		this.vector={x:this.trueEpos.x-this.trueSpos.x,y:this.trueEpos.y-this.trueSpos.y};
		//console.log(vector.y);
		var offset=0;
		var direct=1;
		if(this.vector.y<0)
		{
			offset=Math.PI;
			direct=-1;
		}
		this.rotate=(Math.acos(direct*this.vector.x*1.0/Math.sqrt(this.vector.x*this.vector.x+this.vector.y*this.vector.y))+offset)/(Math.PI*2);
		this.rotate*=360;
		console.log(this.rotate);
		this.arrowNode.attr("transform", "rotate("+this.rotate+")");
		
		//this.arrowNode.attr("transform", "translate("+(this.trueSpos.x+this.trueEpos.x)/2+","+(this.trueSpos.y+this.trueEpos.y)/2+")rotate("+rotate+")");  
		//  attr("x",(this.trueSpos.x+this.trueEpos.x)/2).attr("y",(this.trueSpos.x+this.trueEpos.x)/2)/2);
		
		/* var curve_path = "M"+this.trueSpos.x+","+this.trueSpos.y
							+" T"+(this.trueSpos.x+this.trueEpos.x)/2+","+(this.trueSpos.y+this.trueEpos.y)/2
							+" T"+this.trueEpos.x+","+this.trueEpos.y;  
		this.line.attr("d",curve_path)   */
		
	}
	this.setStartColor=function(color)
	{
		this.startRound.attr("fill",color);
	}
	this.setEndColor=function(color)
	{
		this.endRound.attr("fill",color);
	}
	this.delete=function()
	{
		this.startRound.transition().duration(500).style("opacity", "0.0").attr("r", 0).remove();
		this.endRound.transition().duration(500).style("opacity", "0.0").attr("r", 0).remove();
		this.group.transition().duration(500).style("opacity", "0.0").attr("r", 0).remove();
	}
	this.update=function()
	{
		var x=this.trueSpos.x+this.vector.x*1.0*this.animateTime/60;
		var y=this.trueSpos.y+this.vector.y*1.0*this.animateTime/60;
		//console.log(y);
		//this.arrowNode.attr("cx",x).attr("cy",y);
		this.arrowNode.attr("transform", "translate("+x+","+y+")rotate("+this.rotate+")")
		this.animateTime++;
		if(this.animateTime>60)
		{
			this.animateTime=0;
		}
	}
	this.isAlive=function()
	{
		return true;
	}
	
	
}