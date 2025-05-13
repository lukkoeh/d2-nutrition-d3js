const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3
  .geoNaturalEarth1()
  .scale(width / 1.5 / Math.PI)
  .translate([width / 2, height / 2]);

const pathGenerator = d3.geoPath().projection(projection);

const zoom = d3
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", (event) => {
    projection
      .scale(event.transform.k)
      .translate(event.transform.x, event.transform.y);
    svg.selectAll("path").attr("d", pathGenerator);
  });

// Load external data and boot
d3.json("/geo.json").then(function(data) {
  // Draw the map
  svg
    .append("g")
    .selectAll("path")
    .data(data.features)
    .join("path")
    .attr("fill", "#fff")
    .attr("d", pathGenerator)
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
});
