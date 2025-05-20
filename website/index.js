const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

const g = svg.append("g");
// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3
  .geoNaturalEarth1()
  .scale(width / 1.5 / Math.PI)
  .translate([width / 2, height / 2]);

const pathGenerator = d3.geoPath().projection(projection);

// Load external data and boot
d3.json("/geo.json").then(function(data) {
  // Draw the map
  g.selectAll("path")
    .data(data.features)
    .join("path")
    .attr("fill", "#fff")
    .attr("d", pathGenerator)
    .attr("id", d => d.properties.adm0_a3)
    .style("stroke", "#999999")
    .on("mouseover", (e, d) => {
      d3.select(e.currentTarget)
        .transition()
        .duration(40)
        .attr("fill", "#a2c077");
    })
    .on("mouseout", (e, d) => {
      d3.select(e.currentTarget).transition().duration(40).attr("fill", "#fff");
    });

  d3.select("#regions")
    .selectAll("option")
    .data(data.features)
    .join("option")
    .attr("value", (d) => d.properties.adm0_a3)
    .text((d) => d.properties.geounit)
});

const zoom = d3
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", (event) => {
    // Anwenden der Transformation auf die gesamte Karte
    g.attr("transform", event.transform);
  });

svg.call(zoom);

// const selectElem = document.getElementById("regions")
// fetch("http://localhost:3000/areas")
//   .then(async (r) => {
//     let json = await r.json()
//     for (const region of json) {
//       let option = document.createElement("option")
//       option.value = region.area
//       option.innerText = region.area
//       selectElem.appendChild(option)
//     }
//   })
