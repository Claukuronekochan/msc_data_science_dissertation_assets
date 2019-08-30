
          
function createBarchart()
{

// get the data
var data = formatAllData();
/*var present_data=[{series:'World',values:{population:data[0][6],
                                          energy_access:data[0][6]*data[0][0].Access,
                                          water_access:data[0][6]*data[0][3].Access,
                                          clean_cooking:data[0][6]*data[0][4].Access}},
                  {series:'Asia',values:{population:data[1][6],
                                          energy_access:data[1][6]*data[1][0].Access,
                                          water_access:data[1][6]*data[1][3].Access,
                                          clean_cooking:data[1][6]*data[1][4].Access}},
                  {series:'Bangladesh',values:{population:data[2][6],
                                          energy_access:data[2][6]*data[2][0].Access,
                                          water_access:data[2][6]*data[2][3].Access,
                                          clean_cooking:data[2][6]*data[2][4].Access}},
                  {series:'Chars',values:{population:data[3][6],
                                          energy_access:data[3][6]*data[3][0].Access,
                                          water_access:data[3][6]*data[3][3].Access,
                                          clean_cooking:data[3][6]*data[3][4].Access}},
                                          ];*/
var present_data=[{series:'population',values:{'World':data[0][6],
                                                'Asia':data[1][6],
                                                'Bangladesh':data[2][6],
                                                'Chars':data[3][6]}},

                  {series:'energy_access',values:{'World':data[0][6]*data[0][0].Access/100,
                                                'Asia':data[1][6]*data[1][0].Access/100,
                                                'Bangladesh':data[2][6]*data[2][0].Access/100,
                                                'Chars':data[3][6]*data[3][0].Access/100}},

                  {series:'water_access',values:{'World':data[0][6]*data[0][3].Access/100,
                                                'Asia':data[1][6]*data[1][3].Access/100,
                                                'Bangladesh':data[2][6]*data[2][3].Access/100,
                                                'Chars':data[3][6]*data[3][3].Access/100}},

                  {series:'clean_cooking',values:{'World':data[0][6]*data[0][4].Access/100,
                                                'Asia':data[1][6]*data[1][4].Access/100,
                                                'Bangladesh':data[2][6]*data[2][4].Access/100,
                                                'Chars':data[3][6]*data[3][4].Access/100}}
];

var margin = {top:10, right:10, bottom:90, left:10};

var width = 960 - margin.left - margin.right;

var height = 500 - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.03)

var yScale = d3.scaleLinear()
      .range([height, 0]);


var xAxis = d3.axisBottom(xScale);
      
      
var yAxis = d3.axisLeft(yScale);

var svgContainer = d3.select("#chartBangladesh").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

xScale.domain(present_data.map(function(d) { return d.series; }));
yScale.domain([0, d3.max(present_data, function(d) { return d.values.Bangladesh; })]);


//xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
var xAxis_g = svgContainer.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis)
    .selectAll("text");
      
// Uncomment this block if you want the y axis
/*var yAxis_g = svgContainer.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6).attr("dy", ".71em")
    //.style("text-anchor", "end").text("Number of Applicatons"); 
*/


  svgContainer.selectAll(".bar")
      .data(present_data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.series); })
      .attr("width", xScale.bandwidth())
      .attr("y", function(d) { return yScale(d.values.Bangladesh); })
      .attr("height", function(d) { return height - yScale(d.values.Bangladesh); });


  // Controls the text labels at the top of each bar. Partially repeated in the resize() function below for responsiveness.
  svgContainer.selectAll(".text")     
    .data(present_data)
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return xScale(d.series) + xScale.bandwidth() / 2 ; }  ))
    .attr("y", function(d) { return yScale(d.values.Bangladesh) + 1; })
    .attr("dy", ".75em")
    .text(function(d) { return d.values.Bangladesh; });    


//chars
var svgContainer2 = d3.select("#chartChars").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

xScale.domain(present_data.map(function(d) { return d.series; }));
yScale.domain([0, d3.max(present_data, function(d) { return d.values.Chars; })]);


//xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
xAxis_g = svgContainer2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(xAxis)
    .selectAll("text");
      
// Uncomment this block if you want the y axis
/*yAxis_g = svgContainer2.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6).attr("dy", ".71em")
    //.style("text-anchor", "end").text("Number of Applicatons"); 
*/


  svgContainer2.selectAll(".bar")
      .data(present_data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.series); })
      .attr("width", xScale.bandwidth())
      .attr("y", function(d) { return yScale(d.values.Chars); })
      .attr("height", function(d) { return height - yScale(d.values.Chars); });


  // Controls the text labels at the top of each bar. Partially repeated in the resize() function below for responsiveness.
  svgContainer2.selectAll(".text")     
    .data(present_data)
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return xScale(d.series) + xScale.bandwidth() / 2 ; }  ))
    .attr("y", function(d) { return yScale(d.values.Chars) + 1; })
    .attr("dy", ".75em")
    .text(function(d) { return d.values.Chars; });    



}