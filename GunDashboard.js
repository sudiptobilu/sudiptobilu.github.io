var overview={
    display: async function () {
        var svg = d3.select("#Overview").append("svg").attr("Width",600).attr("height",300),
        width = +svg.attr("width"),
        height = +svg.attr("height");    

    usMap = await(d3.json("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"))	
    // Load external data and boot
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
		y["incidents"] = y["incidents"] + parseInt(stateData[i].n_killed + stateData[i].n_injured);
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

//d3.select('svg')
svg.append('g').append('text').transition().duration(300).attr("x", 0).attr("y", 10).attr("id","anno")
.text("*Hover over the states for more details").attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "red").attr("font-weight","bold")

  
var rect = svg.append('rect').transition().duration(2000).attr("x", 1000).attr("y", 160).attr("width", 250)
  .attr("height", 190).attr("fill","lightblue").attr("stroke","black").text("As of July 2022")

  svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 175).attr("id","anno")
  .text("Overview").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")
  

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 190).attr("id","anno")
.text(">Gun Violence Data for last 3 Years").attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 205).attr("id","anno")
.text(">Total number of Cases: " + total).attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 220).attr("id","anno")
.text(">Total number of Deaths: " + killed).attr("font-size", "14px").attr("font-weight","italic").style("fill", "Black")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 250).attr("id","anno")
.text("Most Affected State: " + maxstate).attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black").attr("font-weight","bold")

svg.append('g').append('text').transition().duration(2000).attr("x", 1010).attr("y", 267).attr("id","anno")
.text("Cases in State of " + maxstate + " is: " + maxcase).attr("font-size", "14px")
.attr("font-weight","italic").style("fill", "Black")

var width = 1300;
var height = 600;
var margin = 50;

var projection = d3.geoAlbersUsa()
				   .translate([(width/2 -100 ), (height/2)-100])
				   .scale([1000]);
// Define path generator
var path = d3.geoPath()               
.projection(projection);

const colorRange = d3.scaleLinear()
                    //.interpolator(d3.interpolateInferno)
                    .domain([1,15000])
                    .range(["white","pink"]);

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


	for(var i = 0; i < statelist.length; i++){
        var stateName = (statelist[i].state);
        var killed = (statelist[i].killed);
        var injured = (statelist[i].injured);
        for(var n = 0; n < usMap.features.length; n++){
            var userState = usMap.features[n].properties.name;
            if(stateName == userState){
			usMap.features[n].properties.killed = killed;              
			  usMap.features[n].properties.injured = injured;
			  usMap.features[n].properties.incidents = killed + injured;
              break;
            }
	}
}

	svg.attr("width",width )
    .attr("height",height)
	.append("g")
    .attr("transform","translate(" + margin + "," + margin + ")")
    .selectAll("path")
	.data(usMap.features)
	.enter()
	.append("path")
	.attr("d", function(eachfeature) {return path(eachfeature);})
	.attr("opacity",0.8)
	.attr("stroke","black")    
    .attr("fill", function(d) 
    {   

        return colorRange(d.properties.incidents);
    })
    .on("mouseover", function(d) 
    {
        if(d3.select(this).style("opacity") != 0){
            d3.select(this).transition()        
                .duration(200)      
                .style("opacity", .65); 
        }
        var html  = "<span style = 'font-size:15px;color:black'><b>" + d.properties.name + "</b></span></br>" +
        "<span style='font-size:12px;color:black'><b> Killed: </b>" + d.properties.killed + "</span></br>" +
        "<span style='font-size:12px;color:black'><b> Injured: </b>" + d.properties.injured + "</span>";
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
}};