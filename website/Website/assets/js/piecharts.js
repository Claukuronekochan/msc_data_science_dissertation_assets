/*Pie charts*/
//load data
var data_all = [];
d3.csv("assets/data/summary_data.csv", function(error, data) {
  data_all = data;
  console.log("loading the data");
});
// set the dimensions and margins of the graph
var pie_width = $("#pie_1").width()*0.7;
$("#pie_1").height(pie_width);

var pie_height = pie_width;
var pie_margin = 10;
// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = Math.min(pie_width, pie_height) / 2 - pie_margin;
var color = d3.scaleOrdinal(d3.schemeCategory10);
    //.domain(["a", "b", "c", "d", "e", "f"])
    //.range(d3.schemeDark2);
// shape helper to build arcs:
var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

//create pie chart elements
function presentPieChart()
{  

  // append the svg object to the div called 'energy-access-pie'
  svg_lbl_access = d3.select("#pie_1")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_access = d3.select("#pie_1")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_1")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_c = d3.select("#pie_2")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_c = d3.select("#pie_2")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_2")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_con = d3.select("#pie_3")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_con = d3.select("#pie_3")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_3")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  /**/
  svg_lbl_access_1 = d3.select("#pie_4")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_access_1 = d3.select("#pie_4")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_4")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_c_1 = d3.select("#pie_5")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_c_1 = d3.select("#pie_5")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_5")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_con_1 = d3.select("#pie_6")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_con_1 = d3.select("#pie_6")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_6")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  //-------------------//
  svg_lbl_access_2 = d3.select("#pie_7")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_access_2 = d3.select("#pie_7")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_7")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_c_2 = d3.select("#pie_8")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_c_2 = d3.select("#pie_8")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_8")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_con_2 = d3.select("#pie_9")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_con_2 = d3.select("#pie_9")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_9")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");
  //----------------//

  svg_lbl_access_3 = d3.select("#pie_10")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_access_3 = d3.select("#pie_10")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_10")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_c_3 = d3.select("#pie_11")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_c_3 = d3.select("#pie_11")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_11")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_con_3 = d3.select("#pie_12")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_con_3 = d3.select("#pie_12")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_12")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");


  //----------------//

  svg_lbl_access_4 = d3.select("#pie_13")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_access_4 = d3.select("#pie_13")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_13")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_c_4 = d3.select("#pie_14")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_c_4 = d3.select("#pie_14")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_14")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

  svg_lbl_energy_con_4 = d3.select("#pie_15")
  .append("svg")
  .attr("class","pie_lbl");
  svg_pie_energy_con_4 = d3.select("#pie_15")
  .append("svg")
  .attr("width", pie_width)
  .attr("height", pie_height)
  .attr("id","svg_pie_15")
  .attr("class","pie")
  .append("g")
  .style("background-color", "steelblue")
  .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");
  /**/

  //data = getData(0);

  // set the color scale
  getDataN(formatAllData()[0],1);
  
}

function updatePie(data, pie_type) {//, lbl_cont

  switch(pie_type)
  {
    case 1:
      pie_elemnt = svg_pie_access;
      lbl_cont = svg_lbl_access;
    break;
    case 2:
      pie_elemnt = svg_pie_energy_c;
      lbl_cont = svg_lbl_energy_c;
    break;
    case 3:
      pie_elemnt = svg_pie_energy_con;
      lbl_cont = svg_lbl_energy_con;
    break;
    //-------
    case 4:
      pie_elemnt = svg_pie_access_1;
      lbl_cont = svg_lbl_access_1;
    break;
    case 5:
      pie_elemnt = svg_pie_energy_c_1;
      lbl_cont = svg_lbl_energy_c_1;
    break;
    case 6:
      pie_elemnt = svg_pie_energy_con_1;
      lbl_cont = svg_lbl_energy_con_1;
    break;

    case 7:
      pie_elemnt = svg_pie_access_2;
      lbl_cont = svg_lbl_access_2;
    break;
    case 8:
      pie_elemnt = svg_pie_energy_c_2;
      lbl_cont = svg_lbl_energy_c_2;
    break;
    case 9:
      pie_elemnt = svg_pie_energy_con_2;
      lbl_cont = svg_lbl_energy_con_2;
    break;

    case 10:
      pie_elemnt = svg_pie_access_3;
      lbl_cont = svg_lbl_access_3;
    break;
    case 11:
      pie_elemnt = svg_pie_energy_c_3;
      lbl_cont = svg_lbl_energy_c_3;
    break;
    case 12:
      pie_elemnt = svg_pie_energy_con_3;
      lbl_cont = svg_lbl_energy_con_3;
    break;

    case 13:
      pie_elemnt = svg_pie_access_4;
      lbl_cont = svg_lbl_access_4;
    break;
    case 14:
      pie_elemnt = svg_pie_energy_c_4;
      lbl_cont = svg_lbl_energy_c_4;
    break;
    case 15:
      pie_elemnt = svg_pie_energy_con_4;
      lbl_cont = svg_lbl_energy_con_4;
    break;
  }
  // Compute the position of each group on the pie:
  var pie = d3.pie()
  .value(function(d) {return d.value; })
  .sort(function(a, b) { //console.log(a) ; 
  return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = pie_elemnt.selectAll("path")
  .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

  u
  .enter()
  .append('path')
  .merge(u)
  //.transition()
  //.duration(1000)
  .attr('d', d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 1)



  pie_elemnt.selectAll(".svg_pie_lbls").remove();
  lbl_cont.selectAll(".legend").remove();


  // Now add the annotation. Use the centroid method to get the best coordinates
  var inside_lbl = pie_elemnt.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ 
    var lbl_perc = d.data.value;
    if(lbl_perc<5)
      lbl_perc = "";
    else
      lbl_perc = lbl_perc + "%";
    return lbl_perc;
  })
  .attr("transform", function(d) { 
    var v = arcGenerator.centroid(d);
    v[0] = v[0]*1.5;
    v[1] = v[1]*1.5;
    return "translate(" + v  + ")";  
  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  .attr("class","svg_pie_lbls");
/**/

var legendRectSize = 18;                                  
var legendSpacing = 4;
var legend = lbl_cont.selectAll('.legend')     
          .data(data_ready)                                   
          .enter()                                                
          .append('g')                                            
          .attr('class', 'legend')                                
          .attr('transform', function(d,i) {                     
            var height = legendRectSize + legendSpacing;          
            var offset =  height * data_ready.length / 2;     
            var horz = legendRectSize;                       
            var vert = i * height + offset * 0.2;                      
            return 'translate(' + horz + ',' + vert + ')';        
          });                                                     

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', function(d){ return(color(d.data.key)) })                                   
          .style('stroke', function(d){ return(color(d.data.key)) });                                
          
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d.data.key});  /**/

  // remove the group that is not present anymore
  u
  .exit()
  .remove();

  legend
  .exit()
  .remove();

  inside_lbl
  .exit()
  .remove();/**/

}
function getData(zoomType)
{
  var data = [];
  energy_access = 0;
  energy_consumption = 0;
  population = 0;
  sources = {
    coal:0,
    hydro:0,
    gas:0,
    nuclear:0,
    oil:0,
    renew:0
  };
  switch(zoomType)
        {
          //show world
          case 0:
            filtered = data_all.filter(function (a) { return a.Section === 'World'; });
          break;
          //show asia
          case 1:
            filtered = data_all.filter(function (a) { return a.Section === 'Asia'; });
          break;
          //show bangladesh
          case 2:
            filtered = data_all.filter(function (a) { return a.Section === 'Bangladesh'; });
          break;
          //show chars
          case 3:
            filtered = data_all.filter(function (a) { return a.Section === 'Bangladesh'; });
            filtered2 = data_all.filter(function (a) { return a.Section === 'Chars'; });
          break;
          case 4:
            filtered = data_all.filter(function (a) { return a.Section === 'Bangladesh'; });
            filtered2 = data_all.filter(function (a) { return a.Section === 'Chars'; });
          break;
        }
  energy_access = filtered.filter(function (a) { return a.Indicator === 'Access to electricity'; });
  energy_consumption = filtered.filter(function (a) { return a.Indicator === 'Electric power consumption'; });//label
  sources.coal = filtered.filter(function (a) { return a.Indicator === 'Coal'; });
  sources.hydro = filtered.filter(function (a) { return a.Indicator === 'Hydro'; });
  sources.gas = filtered.filter(function (a) { return a.Indicator === 'Gas'; });
  sources.nuclear = filtered.filter(function (a) { return a.Indicator === 'Nuclear'; });
  sources.oil = filtered.filter(function (a) { return a.Indicator === 'Oil'; });
  sources.renew = filtered.filter(function (a) { return a.Indicator === 'Renewable'; });
  population = filtered.filter(function (a) { return a.Indicator === 'Population'; });//label
  internet = filtered.filter(function (a) { return a.Indicator === 'Internet usage'; });
  water_access = filtered.filter(function (a) { return a.Indicator === 'Water access'; });
  sanitation_access = filtered.filter(function (a) { return a.Indicator === 'Sanitation access'; });
  clean_cooking = filtered.filter(function (a) { return a.Indicator === 'Access to clean fuels and technologies for cooking'; });
  if(zoomType==3)
  {
    energy_access = filtered2.filter(function (a) { return a.Indicator === 'Access to electricity'; });
    water_access = filtered2.filter(function (a) { return a.Indicator === 'Water access'; });
    sanitation_access = filtered2.filter(function (a) { return a.Indicator === 'Sanitation access'; });
    population = filtered2.filter(function (a) { return a.Indicator === 'Population'; });//label
    energy_consumption = filtered2.filter(function (a) { return a.Indicator === 'Electric power consumption'; });//label
    clean_cooking = filtered2.filter(function (a) { return a.Indicator === 'Access to clean fuels and technologies for cooking'; });
    internet = filtered2.filter(function (a) { return a.Indicator === 'Internet usage'; });
  }

  //energy access
  data[0] = {"Access": Math.round(energy_access[0].Value* 10 ) / 10, "No Access": Math.round((100-energy_access[0].Value)* 10 ) / 10};
  
  //energy sources
  data[1] = {"Coal": Math.round(sources.coal[0].Value* 10 ) / 10, 
              "Hydro": Math.round(sources.hydro[0].Value* 10 ) / 10, 
              "Gas":Math.round(sources.gas[0].Value* 10 ) / 10, 
              "Nuclear":Math.round(sources.nuclear[0].Value* 10 ) / 10, 
              "Oil":Math.round(sources.oil[0].Value* 10 ) / 10, 
              "Renewable":Math.round(sources.renew[0].Value* 10 ) / 10};
  //internet access
  data[2] = {"Use": Math.round(internet[0].Value* 10 ) / 10, "Not Use": Math.round((100-internet[0].Value)* 10 ) / 10};

  //water access
  data[3] = {"Access": Math.round(water_access[0].Value* 10 ) / 10, "No Access": Math.round((100-water_access[0].Value)* 10 ) / 10};
  //sanitation access
  data[4] = {"Access": Math.round(sanitation_access[0].Value* 10 ) / 10, "No Access": Math.round((100-sanitation_access[0].Value)* 10 ) / 10};
  //clean cooking
  data[5] = {"Access": Math.round(clean_cooking[0].Value* 10 ) / 10, "No Access": Math.round((100-clean_cooking[0].Value)* 10 ) / 10};
  
  //population
  data[6] = Math.round(population[0].Value* 10 ) / 10;
  //energy consumption
  data[7] = Math.round(energy_consumption[0].Value* 10 ) / 10;

  return data;
}

function formatAllData()
{
  data=[];
  for(i=0;i<=4;i++)
  {
    data[i]=getData(i);
  }
  //console.log(d);
  return data;
}
