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
	
	this.init=function(startPos,endPos)
	{
		this.startPos=startPos;
		this.endPos=endPos;
		this.startRound=this.group.append("circle").attr("fill", "#fff");
		this.endRound=this.group.append("circle").attr("fill","#fff")
		
		
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
		var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
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
		var sPos=this.map.latLngToLayerPoint(this.startPos,this.zoom);
		var ePos=this.map.latLngToLayerPoint(this.endPos,this.zoom);
		this.startRound.attr("cx", sPos.x).attr("cy", sPos.y).attr("r", 6*this.zoom/3);
		this.endRound.attr("cx", ePos.x).attr("cy", ePos.y).attr("r", 6*this.zoom/3);
		this.line.attr("x1",sPos.x).attr("y1",sPos.y).attr("x2",ePos.x).attr("y2",ePos.y);
		
		var arrow_path = "M0,0"+
						" L"+6*this.zoom+","+4*this.zoom+
						" L"+this.zoom*3+","+0+
						" L"+6*this.zoom+","+-4*this.zoom+
						" L0,0";
		this.arrow.attr("d",arrow_path);
		
		this.arrowNode.attr("transform", "translate("+(sPos.x+ePos.x)/2+","+(sPos.y+ePos.y)/2+")rotate("+90+")");//  attr("x",(sPos.x+ePos.x)/2).attr("y",(sPos.x+ePos.x)/2)/2);
		
		/* var curve_path = "M"+sPos.x+","+sPos.y
							+" T"+(sPos.x+ePos.x)/2+","+(sPos.y+ePos.y)/2
							+" T"+ePos.x+","+ePos.y;  
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
		
	}
	this.isAlive=function()
	{
		return true;
	}
	
	
}