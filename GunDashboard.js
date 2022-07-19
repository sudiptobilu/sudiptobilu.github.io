var overview={
    display: async function () {      
      d3.select("#Overview").selectAll("text").remove();
      d3.select("#Overview").selectAll("svg").remove();

    var margin = {top: 50, right: 100, bottom: 70, left: 260},
    width = 1300 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
       stateData = await(d3.csv("https://raw.githubusercontent.com/sudiptobilu/Dashboard/main/GunViolence.csv"))

var statelist = [];
var temp = {};
var y = {};
var total = 0;
var killed = 0;
for(var i = 0; i < stateData.length; i++){
temp = {};

y = statelist.find(o=>o.state === stateData[i].state);
if(y !== undefined)
	{
		y["killed"] = y["killed"] + parseInt(stateData[i].n_killed);
		y["injured"] = y["injured"] + parseInt(stateData[i].n_injured);
		y["incidents"] = y["incidents"] + parseInt(stateData[i].n_killed) + parseInt(stateData[i].n_injured);
		total = total + y["incidents"];
		killed = killed + y["killed"];
	}
	else
	{
		temp["state"] = stateData[i].state;
		temp["killed"] = parseInt(stateData[i].n_killed);
		temp["injured"] = parseInt(stateData[i].n_injured);
		temp["incidents"] = parseInt(stateData[i].n_killed) + parseInt(stateData[i].n_injured);
		total = total + temp["incidents"];
		killed = killed + temp["killed"];
		statelist.push(temp);
	}	
}
temp = statelist.find(o=>o.state === "California");
temp["state"] = "California";
		temp["killed"] = temp["killed"];
		temp["injured"] = temp["injured"];
		temp["incidents"] = temp["incidents"];
statelist.push(temp);

var maxcase = 0, maxstate = '';
for(i = 0; i < statelist.length; i++)
{
	var x = parseInt(statelist[i]["incidents"]);
	if (maxcase < x)
	{
		maxcase = x;
		maxstate = statelist[i]["state"]
	}
}

//The following statement snippet sorts the array by incidents in ascending order:
			statelist.sort((a, b) => {
    return b.incidents - a.incidents;
});
            var max = d3.max(statelist, function(d) { return parseInt(d.incidents); });
			

 statelist.sort((a, b) => {
    return b.incidents - a.incidents;
});

      d3.select("#Overview").append("svg").attr("height",20).append("g").append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","annotation")
      .text("*Hover over the Bars for more details").attr("font-size", "14px")
      .attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")
  
          
	  var svg = d3.select("#Overview")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")"); 
				  
 
  //X axis
  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(statelist.map(function(d) { return d.state; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("id","x")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    svg.append("text")
    .attr("class", "x label")
    .attr("x", width )
    .attr("y", height - 6)
    .text("State Name");

// Y axis
console.log(max);
var y = d3.scaleLinear()
  .domain([0, max])
  .range([ height, 0]);
svg.append("g")
  .attr("id","y")
  .call(d3.axisLeft(y));
svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("x",18)
  .attr("y",-60)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Number of Cases");


  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

   svg.selectAll("bar")
  .data(statelist)
  .enter()
  .append("rect")
    .attr("id","bar")
    .attr("x", function(d) { return x(d.state); })
    .attr("y", function(d) { return y(parseInt(d.incidents)); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {return height - y(parseInt(d.incidents)); })
    .attr("fill", "red")
    .on("mouseover", function(d) {
      console.log(d.state);
      if(d3.select(this).style("opacity") != 0){
        d3.select(this).transition()        
            .duration(200)      
            .style("opacity", .85); 
    }
    var html  = "<span style = 'font-size:15px;color:black'><b>" + d.state + "</b></span></br>" +
    "<span style='font-size:12px;color:black'><b> Cases: </b>" + d.incidents + "</span></br>" +
    "<span style='font-size:12px;color:black'><b> Deaths: </b>" + d.killed + "</span>";
    div.transition()
    .duration(200)
    .style("opacity", 1);
    div.html(html)
    .style("left", (d3.event.pageX + 10) + "px")
    .style("top", (d3.event.pageY +10 ) + "px")
    .style("width",130)
    .style("height",80)
    .style("background",function(){ return("lightblue");})

    })
    
    .on("mouseout", function(d) {
        div.transition()
        .duration(300)
        .style("opacity", 0);
        d3.select(this).transition()        
                .duration(200)      
                .style("opacity", 1); 
    })


    var rect = svg.append('rect').attr("x", 200).transition().duration(1000).attr("y", -50).attr("width", 400)
    .attr("height", 30).attr("fill","lightblue").attr("stroke","black").text("As of July 2022")

svg.append("g").append("text").attr("id","annotation").transition().duration(1000).attr("x", 210).attr("y", -30)
	.text("Cases by States in USA in descending order of incidents").attr("font-size", "14px").attr("fill", "black").attr("font-weight","bold")

}};
