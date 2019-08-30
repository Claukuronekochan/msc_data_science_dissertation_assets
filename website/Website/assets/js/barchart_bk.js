// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
function createBarchart()
{
  // append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

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
// format the data
present_data.forEach(function(d) {
    d.values.World = +d.values.World;
  });
// Scale the range of the data in the domains
  x.domain(present_data.map(function(d) { return d.series; }));
  y.domain([0, d3.max(present_data, function(d) { return d.values.World; })]);

// append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(present_data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.series); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.values.World); })
      .attr("height", function(d) { return height - y(d.values.World); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));


  svg.selectAll("text")
   .data(present_data)
   .enter()
   .append("text")
   .text(function(d) {
        return d.values.World;
   })
   .attr("x", function(d, i) {
        return i * (x.bandwidth() / present_data.length);
   })
   .attr("y", function(d) {
        return height - y(d.values.World) - (d * 4);
   });

/*
d3.csv("assets/data/summary_data.csv", function(error, data) {
  if (error) throw error;
  console.log(data);
  // format the data
  data.forEach(function(d) {
    d.Value = +d.Value;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Section; }));
  y.domain([0, d3.max(data, function(d) { return d.Value; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Section); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Value); })
      .attr("height", function(d) { return height - y(d.Value); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});*/

}