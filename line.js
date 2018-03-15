function Line(map,group)
{
	this.map=map;
	this.group=group;
	this.startPos=null;
	this.endPos=null;
	this.startRound=null;
	this.endRound=null;
	this.zoom=null;
	
	this.init=function(startPos,endPos)
	{
		this.startPos=startPos;
		this.endPos=endPos;
		this.startRound=this.group.append("circle").attr("fill", "#fff");
		this.endRound=this.group.append("circle").attr("fill","#fff")
		this.ZoomUp();
		
	}
	this.ZoomUp=function()
	{
		this.zoom=this.map.getZoom();
		var sPos=this.map.latLngToLayerPoint(this.startPos,this.zoom);
		var ePos=this.map.latLngToLayerPoint(this.endPos,this.zoom);
		this.startRound.attr("cx", sPos.x).attr("cy", sPos.y).attr("r", 6*this.zoom/3);
		this.endRound.attr("cx", ePos.x).attr("cy", ePos.y).attr("r", 6*this.zoom/3);
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