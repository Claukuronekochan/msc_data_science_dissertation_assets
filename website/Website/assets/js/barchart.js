
          
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
var present_data=[/*{series:'population',values:[//{location:'World', value:data[0][6]},
                                                //{location:'Asia', value:data[1][6]},
                                                {location:'Bangladesh', value:data[2][6]},
                                                {location:'Chars', value:data[3][6]}]
                  },*/

                  {series:'energy_access',values:[//{location:'World', value:data[0][6]*data[0][0].Access/100},
                                                  //{location:'Asia', value:data[1][6]*data[1][0].Access/100},
                                                  {location:'Bangladesh', value:data[2][0].Access},
                                                  {location:'Chars', value:data[3][0].Access}]
                  },

                  {series:'water_access',values:[//{location:'World', value:data[0][6]*data[0][3].Access/100},
                                                  //{location:'Asia', value:data[1][6]*data[1][3].Access/100},
                                                  {location:'Bangladesh', value:data[2][3].Access},
                                                  {location:'Chars', value:data[3][3].Access}]
                  },

                  {series:'clean_cooking',values:[//{location:'World', value:data[0][6]*data[0][4].Access/100},
                                                  //{location:'Asia', value:data[1][6]*data[1][4].Access/100},
                                                  {location:'Bangladesh', value:data[2][4].Access},
                                                  {location:'Chars', value:data[3][4].Access}]
                  }
];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(x0)
    .tickSize(0);

var yAxis = d3.axisLeft(y);

var svg = d3.select('#chartBangladesh').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var categoriesNames = present_data.map(function(d) { return d.series; });
  var rateNames = present_data[0].values.map(function(d) { return d.location; });

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(present_data, function(series) { return d3.max(series.values, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(present_data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.series) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x1(d.location); })
      .style("fill", function(d) { return color(d.location) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.location)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.location));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

  //Legend
  var legend = svg.selectAll(".legend")
      .data(present_data[0].values.map(function(d) { return d.location; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

//createBarchart2();

}

function createBarchart2()
{

// get the data
var data = formatAllData();
var present_data=[/*{series:'World',values:[{"location":"Population",value:data[0][6]},
                                          {"location":"energy_access",value:data[0][6]*data[0][0].Access},
                                          {"location":"water_access",value:data[0][6]*data[0][3].Access},
                                          {"location":"clean_cooking",value:data[0][6]*data[0][4].Access}]},
                  {series:'Asia',values:[{"location":"Population",value:data[1][6]},
                                          {"location":"energy_access",value:data[1][6]*data[1][0].Access},
                                          {"location":"water_access",value:data[1][6]*data[1][3].Access},
                                          {"location":"clean_cooking",value:data[1][6]*data[1][4].Access}]},*/
                  {series:'Bangladesh',values:[//{"location":"Population",value:data[2][6]},
                                                {"location":"energy_access",value:data[2][6]*data[2][0].Access/100},
                                                {"location":"water_access",value:data[2][6]*data[2][3].Access/100},
                                                {"location":"clean_cooking",value:data[2][6]*data[2][4].Access/100}]},
                  {series:'Chars',values:[//{"location":"Population",value:data[3][6]},
                                          {"location":"energy_access",value:data[3][6]*data[3][0].Access/100},
                                          {"location":"water_access",value:data[3][6]*data[3][3].Access/100},
                                          {"location":"clean_cooking",value:data[3][6]*data[3][4].Access/100}]}
                                          ];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(x0)
    .tickSize(0);

var yAxis = d3.axisLeft(y);

var svg = d3.select('#chartChars').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  var categoriesNames = present_data.map(function(d) { return d.series; });
  var rateNames = present_data[0].values.map(function(d) { return d.location; });

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(present_data, function(series) { return d3.max(series.values, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)
  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  var slice = svg.selectAll(".slice")
      .data(present_data)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.series) + ",0)"; });

  slice.selectAll("rect")
      .data(function(d) { return d.values; })
  .enter().append("rect")
      .attr("width", x1.bandwidth())
      .attr("x", function(d) { return x1(d.location); })
      .style("fill", function(d) { return color(d.location) })
      .attr("y", function(d) { return y(0); })
      .attr("height", function(d) { return height - y(0); })
      .on("mouseover", function(d) {
          d3.select(this).style("fill", d3.rgb(color(d.location)).darker(2));
      })
      .on("mouseout", function(d) {
          d3.select(this).style("fill", color(d.location));
      });

  slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

  //Legend
  var legend = svg.selectAll(".legend")
      .data(present_data[0].values.map(function(d) { return d.location; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");


}