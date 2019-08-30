/*map code based from https://medium.com/@andybarefoot/making-a-map-using-d3-js-8aa3637304ee */
// DEFINE VARIABLES
      // Define size of map group
      // Full world map is 2:1 ratio
      // Using 12:5 because we will crop top and bottom of map
w = 3000;
h = 2000;
// variables for catching min and max zoom factors
var minZoom;
var maxZoom;
//zoom values to sections
var worldZoom =  [[[0,0],[3000,2000]],[1500,1000],20];
var asiaZoom = [[[1700,600],[2600,1150]],[2150,875],20];
var ukZoom = [[[1400,600],[1500,700]],[1450,650],20];
var bangladeshZoom = [[[2233.5286458333335,903.5705566406252],[2271.930338541667,951.7464192708331]],[2251.984395293298,926.1057368540298],20];
var init = 0;
var zoom_state = 0;
//containers
var svg_map;
var svg_pie_energy_c;
var svg_pie_access;
var svg_lbl_access;
var svg_lbl_energy_c;
var initial = 0;
var scrolled = 0;

//call functions
$(document).ready(function(){
  createMap();
});

// DEFINE FUNCTIONS/OBJECTS
// Define map projection
var projection = d3
  .geoEquirectangular()
  .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
  .scale([w / (2 * Math.PI)]) // scale to fit group width
  .translate([w / 2, h / 2]) // ensure centred in group
;

// Define map path
var path = d3
  .geoPath()
  .projection(projection)
;



// Create function to apply zoom to countriesGroup
function zoomed() {
  t = d3
    .event
    .transform
  ;
  countriesGroup
    .attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")")
  ;
}

// Define map zoom behaviour
var zoom = d3
  .zoom()
  .on("zoom", zoomed)
;

function getTextBox(selection) {
  selection
    .each(function(d) {
      d.bbox = this
        .getBBox();
      })
  ;
}

// Function that calculates zoom/pan limits and sets zoom to default value 
function initiateZoom() {
  // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
  minZoom = Math.max($("#map-holder").width() / w, $("#map-holder").height() / h);
  // set max zoom to a suitable factor of this value
  maxZoom = 20 * minZoom;
  // set extent of zoom to chosen values
  // set translate extent so that panning can't cause map to move out of viewport
  zoom
    .scaleExtent([minZoom, maxZoom])
    .translateExtent([[0, 0], [w, h]])
  ;
  // define X and Y offset for centre of map to be shown in centre of holder
  midX = ($("#map-holder").width() - minZoom * w) / 2;
  midY = ($("#map-holder").height() - minZoom * h) / 2;
  // change zoom transform to min zoom and centre offsets
  svg_map.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
}

// zoom to show a bounding box, with optional additional padding as percentage of box size
function boxZoom(box, centroid, paddingPerc) {
  //console.log(box+","+centroid+","+paddingPerc);
  minXY = box[0];
  maxXY = box[1];
  //console.log(minXY+", "+maxXY);
  // find size of map area defined
  zoomWidth = Math.abs(minXY[0] - maxXY[0]);
  zoomHeight = Math.abs(minXY[1] - maxXY[1]);
  // find midpoint of map area defined
  zoomMidX = centroid[0];
  zoomMidY = centroid[1];
  // increase map area to include padding
  zoomWidth = zoomWidth * (1 + paddingPerc / 100);
  zoomHeight = zoomHeight * (1 + paddingPerc / 100);
  // find scale required for area to fill svg
  maxXscale = $("#svg_map").width() / zoomWidth;
  //console.log(maxXscale);
  maxYscale = $("#svg_map").height() / zoomHeight;
  //console.log(maxYscale);
  zoomScale = Math.min(maxXscale, maxYscale);
  // handle some edge cases
  // limit to max zoom (handles tiny countries)
  zoomScale = Math.min(zoomScale, maxZoom);
  // limit to min zoom (handles large countries and countries that span the date line)
  zoomScale = Math.max(zoomScale, minZoom);
  // Find screen pixel equivalent once scaled
  offsetX = zoomScale * zoomMidX;
  offsetY = zoomScale * zoomMidY;
  // Find offset to centre, making sure no gap at left or top of holder
  dleft = Math.min(0, $("#svg_map").width() / 2 - offsetX);
  dtop = Math.min(0, $("#svg_map").height() / 2 - offsetY);
  // Make sure no gap at bottom or right of holder
  dleft = Math.max($("#svg_map").width() - w * zoomScale, dleft);
  dtop = Math.max($("#svg_map").height() - h * zoomScale, dtop);
  // set zoom
  svg_map
    .transition()
    .duration(500)
    .call(
      zoom.transform,
      d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale)
    );
}
// on window resize
$(window).resize(function() {
  resizeMap();
  
});
function resizeMap()
{
  // Resize SVG
    svg_map
      .attr("width", $("#map-holder").width())
      .attr("height", $("#map-holder").height())
    ;
    initiateZoom();
}

//Create Map
function createMap()
{
  console.log("width"+$("#map-holder").width());
  // create an SVG
  svg_map = d3
    .select("#map-holder")
    .append("svg")
    // set to the same size as the "map-holder" div
    .attr("width", $("#map-holder").width())
    .attr("height", $("#map-holder").height())
    .attr("id","svg_map")
    // add zoom functionality
    //.call(zoom)
  ;

  // get map data
  d3.json(
    "assets/data/worldmap.json",
    function(json) {
      //Bind data and create one path per GeoJSON feature
      countriesGroup = svg_map.append("g").attr("id", "map");
      // add a background rectangle
      countriesGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h);

      initial=1;
      // draw a path for each feature/country
      countries = countriesGroup
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function(d, i) {
          var ids="";
          ids = "country" + d.properties.iso_a3;
          return ids;
        })
        //.attr("class", "country")
        .attr("class", function(d, i) {
          var classes="";
          classes = "country continent" + d.properties.continent;
          return classes;
        })
  //      .attr("stroke-width", 10)
  //      .attr("stroke", "#ff0000")
        // add a mouseover action to show name label for feature/country
        .on("mouseover", function(d, i) {
            d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
        })
        .on("mouseout", function(d, i) {
            d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
        })
      // Add a label group to each feature/country. This will contain the country name and a background rectangle
      // Use CSS to have class "countryLabel" initially hidden
      countryLabels = countriesGroup
        .selectAll("g")
        .data(json.features)
        .enter()
        .append("g")
        .attr("class", "countryLabel")
        .attr("id", function(d) {
          return "countryLabel" + d.properties.iso_a3;
        })
        .attr("transform", function(d) {
          return (
            "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
          );
        })
        // add mouseover functionality to the label
        .on("mouseover", function(d, i) {
            d3.select(this).style("display", "block");
        })
        .on("mouseout", function(d, i) {
             d3.select(this).style("display", "none");
       })
      // add the text to the label group showing country name
      countryLabels
        .append("text")
        .attr("class", "countryName")
        .style("text-anchor", "middle")
        .attr("dx", 0)
        .attr("dy", 0)
        .text(function(d) {
          return d.properties.name;
        })
        .call(getTextBox);
      // add a background rectangle the same size as the text
      countryLabels
        .insert("rect", "text")
        .attr("class", "countryLabelBg")
        .attr("transform", function(d) {
          return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
        })
        .attr("width", function(d) {
          return d.bbox.width + 4;
        })
        .attr("height", function(d) {
          return d.bbox.height;
        });
      initiateZoom();
    }
  );
  presentPieChart();
}

      

//create buttons
var zoomMap = function(zoomId)
{
  switch(zoomId)
  {
    case 0:
      //from asia to world
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#map-holder").classed("hidden", false);//show world map
      d3.selectAll(".country").classed("country-on", false);
      boxZoom(worldZoom[0],worldZoom[1],worldZoom[2]);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#asia-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      document.getElementById('visualisations_title').innerHTML = 'World Data';
      break;
    case 1:
      //from world to asia
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#map-holder").classed("hidden", false);//show world map
      d3.selectAll(".country").classed("country-on", false);
      d3.selectAll(".continentAsia").classed("country-on", true);
      boxZoom(asiaZoom[0],asiaZoom[1],asiaZoom[2]);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#world-btn").classed("hidden", false);
      d3.select("#bng-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      document.getElementById('visualisations_title').innerHTML = 'Asia Data';
      break;
    case 2:
      //from asia to bangladesh
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#map-holder").classed("hidden", false);//show world map
      d3.selectAll(".country").classed("country-on", false);
      d3.select("#countryBGD ").classed("country-on", true);
      boxZoom(bangladeshZoom[0],bangladeshZoom[1],bangladeshZoom[2]);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#asia-btn").classed("hidden", false);
      d3.select("#chars-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      document.getElementById('visualisations_title').innerHTML = 'Bangladesh Data';
      break;
    case 3:
      //from bangladesh to chars
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#chars_map").classed("hidden", false);//show chars map
      d3.selectAll(".country").classed("country-on", false);
      d3.select("#countryBGD ").classed("country-on", true);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#bng-btn").classed("hidden", false);
      d3.select("#more-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      //console.log('coming soon');
      //window.open('chars.html', '_self');
      //d3.selectAll(".content").classed("hidden", true);
      //d3.select("#chars_info").classed("hidden", false);
      break;
      //chars to more
    case 4:
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#chars_map").classed("hidden", false);//show chars map
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#bng-btn").classed("hidden", false);
      d3.select("#more-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      d3.selectAll(".content").classed("hidden", true);
      d3.select("#chars_info").classed("hidden", false);
      break;

    case 5:
      //from asia to world
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#map-holder").classed("hidden", false);//show world map
      d3.selectAll(".country").classed("country-on", false);

      d3.select("#countryGBR ").classed("country-on", true);//changed to show uk values

      boxZoom(ukZoom[0],ukZoom[1],ukZoom[2]);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#asia-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      document.getElementById('visualisations_title').innerHTML = 'World Data';
      break;
   
    default:
      d3.selectAll(".map_vis").classed("hidden", true);
      d3.select("#map-holder").classed("hidden", false);//show world map
      d3.selectAll(".country").classed("country-on", false);
      boxZoom(worldZoom[0],worldZoom[1],worldZoom[2]);
      d3.selectAll(".button").classed("hidden", true);
      d3.select("#asia-btn").classed("hidden", false);
      d3.select("#init_btn").classed("hidden", false);
      document.getElementById('visualisations_title').innerHTML = 'World Data';
  }
  zoom_state = zoomId;
  presentData(zoomId);
}
      function presentData(selection)
      {
        //console.log(selection);
        //data = getData(selection);
        if(actual_view==0)
        {
          getDataN(formatAllData()[selection],1);
        }
        else
        {
          getDataN(formatAllData(),2);
        }
      }

      function changeInit(value)
      {
        init = value;
        d3.selectAll(".button_g").classed("selected", true);
        if(value == 0)
        {
          d3.select("#water-btn").classed("selected", false);
        }
        else
        {
          d3.select("#energy-btn").classed("selected", false);
        }
        presentData(zoom_state);
      }

      function getDataN(data,mode)
      {
        if(mode==1)
        {
          poplbl = "population-lbl";
          consumplbl = "consump-lbl";
          pie1lbl = "pie_1_title";
          pie2lbl = "pie_2_title";
          pie3lbl = "pie_3_title";
          document.getElementById(poplbl).innerHTML = '<b>Population:</b> ' + data[6];
          document.getElementById(consumplbl).innerHTML = '<b>Energy Consumption:</b> ' + data[7] + " kWh per capita";
          if(init == 0)
          {
            document.getElementById(pie1lbl).innerHTML = 'Energy Access';
            updatePie(data[0], 1);
            document.getElementById(pie2lbl).innerHTML = 'Energy Sources';
            updatePie(data[1], 2);
            document.getElementById(pie3lbl).innerHTML = 'Internet Access';
            updatePie(data[2], 3);
          }
          else
          {
            document.getElementById(pie1lbl).innerHTML = 'Water Access';
            updatePie(data[3], 1);
            document.getElementById(pie2lbl).innerHTML = 'Sanitation Access';
            updatePie(data[4], 2);
            document.getElementById(pie3lbl).innerHTML = 'Clean Cooking Access';
            updatePie(data[5], 3);
          }
        }
        else
        {
          for(i=0,lbl=1,p1=4,p2=5,p3=6;i<4;i++,lbl++)
          {
            poplbl = "population-lbl_"+lbl;
            consumplbl = "consump-lbl_"+lbl;
            pie1lbl = "pie_"+p1+"_title";
            pie2lbl = "pie_"+p2+"_title";
            pie3lbl = "pie_"+p3+"_title";
            

            document.getElementById(poplbl).innerHTML = '<b>Population:</b> ' + data[i][6];
            document.getElementById(consumplbl).innerHTML = '<b>Energy Consumption:</b> ' + data[i][7] + " kWh per capita";
            if(init == 0)
            {
              document.getElementById(pie1lbl).innerHTML = 'Energy Access';
              updatePie(data[i][0], p1);
              document.getElementById(pie2lbl).innerHTML = 'Energy Sources';
              updatePie(data[i][1], p2);
              document.getElementById(pie3lbl).innerHTML = 'Internet Access';
              updatePie(data[i][2], p3);
            }
            else
            {
              document.getElementById(pie1lbl).innerHTML = 'Water Access';
              updatePie(data[i][3], p1);
              document.getElementById(pie2lbl).innerHTML = 'Sanitation Access';
              updatePie(data[i][4], p2);
              document.getElementById(pie3lbl).innerHTML = 'Clean Cooking Access';
              updatePie(data[i][5], p3);
            }

            p1=p3+1;
            p2=p1+1;
            p3=p2+1;
          }
        }
      }
      function moveSection(section)
      {
        d3.selectAll(".content").classed("hidden", true);
        if(section==1)
        {
            d3.select("#general_info").classed("hidden", false);
        }
        else
        {
          if(section==2)
          {
            d3.select("#chars_info").classed("hidden", false);
          }
          else 
          {
            if(section==3)
            {
              d3.select("#dashboard_info").classed("hidden", false);
            }
            else
            {
              window.open('https://www.chargeproject.org', '_self');
            }
          }
        }
      }
      var actual_view =0;
      function showComparison(selection)
      {
        d3.selectAll(".comparing").classed("hidden", true);
        d3.selectAll(".button_s").classed("selected", true);
        if(selection==0)
        {
          d3.select("#map_wrapper").classed("hidden", false);
          d3.select("#real_charts").classed("hidden", false);
          d3.selectAll("#show_map-btn").classed("selected", false);
          $("#zoomContainer").css("visibility", "visible");
          $("#visualisations_title").css("visibility", "visible");
          actual_view = selection;
          presentData(zoom_state);
        }
        else
        {
          d3.select("#world_charts").classed("hidden", false);
          d3.select("#asia_charts").classed("hidden", false);
          d3.select("#bangla_charts").classed("hidden", false);
          d3.select("#chars_charts").classed("hidden", false);
          d3.select("#compare-btn").classed("selected", false);
          $("#zoomContainer").css("visibility", "hidden");
          $("#visualisations_title").css("visibility", "hidden");
          getDataN(formatAllData(),2);
          actual_view = selection;
        }
        //d3.select("#chars_map").classed("hidden", false);
        //console.log(selection);
      }

      function viewDashboards(selection)
      {
        d3.selectAll(".dashboard_container").classed("hidden", true);
        d3.selectAll(".button_d").classed("selected", true);
        switch(selection)
        {
          case 1:
            d3.select("#dashboard_1").classed("hidden", false);
            d3.select("#powerbi_btn").classed("selected", false);
            d3.select("#story_text_1").classed("hidden", false);
            d3.select("#show_dash_text_1").classed("hidden", true);
          break;
          case 2:
            d3.select("#dashboard_2").classed("hidden", false);
            d3.select("#tableau_btn").classed("selected", false);
            d3.select("#story_text_1").classed("hidden", false);
            d3.select("#show_dash_text_1").classed("hidden", true);
          break;
          case 3:
            d3.select("#dashboard_3").classed("hidden", false);
            d3.select("#powerbi_btn_2").classed("selected", false);
            d3.select("#story_text_2").classed("hidden", false);
            //d3.select("#show_dash_text_1").classed("hidden", true);
          break;
          case 4:
            d3.select("#dashboard_4").classed("hidden", false);
            d3.select("#tableau_btn_2").classed("selected", false);
            d3.select("#story_text_2").classed("hidden", false);
            //d3.select("#show_dash_text_1").classed("hidden", true);
          break;
        }
        
      }
      function startExploring()
      {
        //d3.select("#general_info").classed("hidden", false);
        if (scrolled==0)
          resizeMap();
        scrolled = 1;
      }