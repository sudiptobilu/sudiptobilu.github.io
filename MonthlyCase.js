var MonthlyCase={
    display: async function () {
d3.select("#MonthlyCase").selectAll("#stateDiv").remove();

  var margin = {top: 10, right: 30, bottom: 50, left: 60},
    width = 1400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
if(data1 == null)
  {var data1 = await(d3.csv("https://raw.githubusercontent.com/sudiptobilu/Dashboard/main/GunViolence.csv"));
    }
//Form the new dataset
	var statelist = [];
var temp = {};
var y = {};
for(var i = 0; i < stateData.length; i++){
temp = {};
var month = stateData[i].IncidentDate.split('/')[0];
var day = stateData[i].IncidentDate.split('/')[1];
var year = stateData[i].IncidentDate.split('/')[2];
y = statelist.find(o=>(o.state === stateData[i].state && o.date === month + "/01/" + year));
	
if(y !== undefined)
	{
		if(parseInt(stateData[i].n_killed) > 0 && parseInt(stateData[i].n_injured) > 0)
		{
			y["killed"] = y["killed"] + parseInt(stateData[i].n_killed);
			y["injured"] = y["injured"] + parseInt(stateData[i].n_injured);
			y["incidents"] = y["incidents"] + parseInt(stateData[i].n_killed + stateData[i].n_injured);
			y["date"] = month + "/01/" + year;
		}
	}
	else
	{
		if(parseInt(stateData[i].n_killed) > 0 && parseInt(stateData[i].n_injured) > 0)
		{
			temp["state"] = stateData[i].state;
			temp["killed"] = parseInt(stateData[i].n_killed);
			temp["injured"] = parseInt(stateData[i].n_injured);
			temp["incidents"] = parseInt(stateData[i].n_killed) + parseInt(stateData[i].n_injured);
			temp["date"] = month + "/01/" + year;
			statelist.push(temp);
		}
	}	
}
temp = statelist.find(o=>o.state === "California");
temp["state"] = "California";
		temp["killed"] = temp["killed"];
		temp["injured"] = temp["injured"];
		temp["incidents"] = temp["incidents"];
		temp["date"] = temp["date"];
statelist.push(temp);
//End of forming new dataset
    var val = "Alabama";
    var data  = statelist.filter(statelist => statelist.state == val);
    state = statelist.map(rec => rec["state"]);
    state = [...new Set(state)];
    //console.log(state);
    d3.select("#MonthlyCase").append("svg").attr("height",20).append("g").append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","annotation")
    .text("*Hover over the graph for more details").attr("font-size", "14px").attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")
d3.select("#MonthlyCase").append("div").attr("id","stateDiv").append("label").text("Select a State: ").attr("style","font-size:15px;font-weight:bold;");
d3.select("#MonthlyCase").select("#stateDiv").append("select").attr("id","stateButton").selectAll("myOptions").data(state).enter().append("option")
.text(function (d) { return d; }).attr("value", function (d) { return d; })
d3.select("#stateButton").on("change", function(d) {
  // recover the option that has been chosen
  var selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
  update(selectedOption)
});

function update(selectedState) {
            var csdata = statelist.filter(statelist => statelist.state == selectedState);
            var max = d3.max(csdata, function(d) { return parseInt(d.incidents); });

            var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(csdata.map(function(d) { return d.date; }))
            .padding(0.2);
          
            d3.select("#x")
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x))
            .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end")
             
            
          
          // Y axis
          console.log(max);
          var y = d3.scaleLinear()
            //.transition()
            //.duration(1000)
            .domain([0, max])
            .range([ height, 0]);
          d3.select("#y")
          .transition()
          .duration(1000)
            .call(d3.axisLeft(y));
          
            svg.selectAll("#bar").remove();
            svg.selectAll("bar")
            .data(csdata)
            //.transition()
            //.duration(1000)
            .enter()
            .append("rect")
            .attr("id","bar")
              .attr("x", function(d) { return x(d.date); })
              .attr("y", function(d) { return y(parseInt(d.incidents)); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) {return height - y(parseInt(d.incidents)); })
              .attr("fill", "magenta")
              .on("mouseover", function(d) {
                console.log(d.date);
                if(d3.select(this).style("opacity") != 0){
                  d3.select(this).transition()        
                      .duration(200)      
                      .style("opacity", .85); 
              }
              var html  = "<span style = 'font-size:15px;color:black'><b>" + d.date + "</b></span></br>" +
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

          }

  var svg = d3.select("#MonthlyCase")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")"); 
  
  var val = "Alabama";
 var csdata = statelist.filter(statelist => statelist.state == val);
  var max = d3.max(csdata, function(d) { return parseInt(d.incidents); });
  //X axis
  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(csdata.map(function(d) { return d.date; }))
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
    //.attr("text-anchor", "end")
    .attr("x", width )
    .attr("y", height - 6)
    .text("Month");

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
  .data(csdata)
  .enter()
  .append("rect")
    .attr("id","bar")
    .attr("x", function(d) { return x(d.date); })
    .attr("y", function(d) { return y(parseInt(d.incidents)); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {return height - y(parseInt(d.incidents)); })
    .attr("fill", "magenta")
    .on("mouseover", function(d) {
      console.log(d.date);
      if(d3.select(this).style("opacity") != 0){
        d3.select(this).transition()        
            .duration(200)      
            .style("opacity", .85); 
    }
    var html  = "<span style = 'font-size:15px;color:black'><b>" + d.date + "</b></span></br>" +
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

    var rect = svg.append('rect').attr("x", 420).transition().duration(1000).attr("y", 0).attr("width", 300)
    .attr("height", 30).attr("fill","lightblue").attr("stroke","black").text("As of July 2022")

d3.selectAll("svg").append("g").append("text").transition().duration(1000).attr("id","annotation").attr("x", 480).attr("y", 25)
	.text("Monthly case statistics for the selected State").attr("font-size", "14px").attr("fill", "black").attr("font-weight","bold")
}};
