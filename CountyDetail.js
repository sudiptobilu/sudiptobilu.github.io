var CountyDetail={
    display: async function () {
      d3.select("#CountyDetail").selectAll("#stateDiv2").remove();
      d3.select("#CountyDetail").selectAll("text").remove();
      d3.select("#CountyDetail").selectAll("svg").remove();

    var margin = {top: 50, right: 100, bottom: 70, left: 260},
    width = 1300 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
    if(data1 == null)
    {var data1 = await(d3.csv("https://raw.githubusercontent.com/sudiptobilu/Dashboard/main/GunViolence.csv"));
      }
      var val = "Alabama";
      var data  = data1.filter(data1 => data1.state == val);
	  
      state = data1.map(rec => rec["state"]);
      state = [...new Set(state)];
    
	//Form the new dataset
	var statelist = [];
var temp = {};
var y = {};
for(var i = 0; i < stateData.length; i++){
temp = {};

y = statelist.find(o=>(o.state === stateData[i].state && o.CityCounty === stateData[i].CityCounty));
	
if(y !== undefined)
	{
		//Remove the ones with zero counts
		if(parseInt(stateData[i].n_killed) > 0 && parseInt(stateData[i].n_injured) > 0)
		{
			y["killed"] = y["killed"] + parseInt(stateData[i].n_killed);
			y["injured"] = y["injured"] + parseInt(stateData[i].n_injured);
			y["incidents"] = y["incidents"] + parseInt(stateData[i].n_killed + stateData[i].n_injured);
		}
	}
	else
	{
		//Remove the ones with zero counts
		if(parseInt(stateData[i].n_killed) > 0 && parseInt(stateData[i].n_injured) > 0)
		{
			temp["state"] = stateData[i].state;
			temp["killed"] = parseInt(stateData[i].n_killed);
			temp["injured"] = parseInt(stateData[i].n_injured);
			temp["incidents"] = parseInt(stateData[i].n_killed) + parseInt(stateData[i].n_injured);
			temp["CityCounty"] = stateData[i].CityCounty;
			statelist.push(temp);
		}
	}	
}
temp = statelist.find(o=>o.state === "California");
temp["state"] = "California";
		temp["killed"] = temp["killed"];
		temp["injured"] = temp["injured"];
		temp["incidents"] = temp["incidents"];
		temp["CityCounty"] = temp["CityCounty"];
statelist.push(temp);
//End of forming new dataset
	
      d3.select("#CountyDetail").append("svg").attr("height",20).append("g").append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","annotation")
      .text("*Hover over the Bars for more details").attr("font-size", "14px")
      .attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")
  d3.select("#CountyDetail").append("div").attr("id","stateDiv2").append("label").text("Select a State: ").attr("style","font-size:15px;font-weight:bold;");
  d3.select("#CountyDetail").select("#stateDiv2").append("select").attr("id","stateButton2").selectAll("myOptions").data(state).enter().append("option")
          .text(function (d) { return d; }).attr("value", function (d) { return d; })
  d3.select("#stateButton2").on("change", function(d) {
            // recover the option that has been chosen
            console.log("change");
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
          });
          
          function update(selectedState) {
            var csdata = statelist.filter(statelist => statelist.state == selectedState);
			//The following statement snippet sorts the array by incidents in ascending order:
			csdata.sort((a, b) => {
    return b.incidents - a.incidents;
});
            var max = d3.max(csdata, function(d) { return parseInt(d.incidents); });

            var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(csdata.map(function(d) { return d.CityCounty; }))
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
            .domain([0, max])
            .range([ height, 0]);
          d3.select("#y")
          .transition()
          .duration(1000)
            .call(d3.axisLeft(y));
          
            svg.selectAll("#bar").remove();
            svg.selectAll("bar")
            .data(csdata)
            .enter()
            .append("rect")
            .attr("id","bar")
              .attr("x", function(d) { return x(d.CityCounty); })
              .attr("y", function(d) { return y(parseInt(d.incidents)); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) {return height - y(parseInt(d.incidents)); })
              .attr("fill", "red")
              .on("mouseover", function(d) {
                console.log(d.CityCounty);
                if(d3.select(this).style("opacity") != 0){
                  d3.select(this).transition()        
                      .duration(200)      
                      .style("opacity", .85); 
              }
              var html  = "<span style = 'font-size:15px;color:black'><b>" + d.CityCounty + "</b></span></br>" +
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

  var svg = d3.select("#CountyDetail")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")"); 

  var val = "Alabama";
 var csdata = statelist.filter(statelist => statelist.state == val);
 csdata.sort((a, b) => {
    return b.incidents - a.incidents;
});
  var max = d3.max(csdata, function(d) { return parseInt(d.incidents); });
  //X axis
  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(csdata.map(function(d) { return d.CityCounty; }))
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
    .text("County Name");

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
    .attr("x", function(d) { return x(d.CityCounty); })
    .attr("y", function(d) { return y(parseInt(d.incidents)); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {return height - y(parseInt(d.incidents)); })
    .attr("fill", "red")
    .on("mouseover", function(d) {
      console.log(d.CityCounty);
      if(d3.select(this).style("opacity") != 0){
        d3.select(this).transition()        
            .duration(200)      
            .style("opacity", .85); 
    }
    var html  = "<span style = 'font-size:15px;color:black'><b>" + d.CityCounty + "</b></span></br>" +
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

    var rect = svg.append('rect').attr("x", 200).transition().duration(1000).attr("y", -50).attr("width", 425)
    .attr("height", 30).attr("fill","lightblue").attr("stroke","black").text("As of July 2022")

svg.append("g").append("text").attr("id","annotation").transition().duration(1000).attr("x", 210).attr("y", -30)
	.text("Cases by Counties for the selected state in descending order").attr("font-size", "14px").attr("fill", "black").attr("font-weight","bold")

}};