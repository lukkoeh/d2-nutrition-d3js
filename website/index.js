const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
const projection = d3.geoNaturalEarth1()
  .scale(width / 1.5 / Math.PI)
  .translate([width / 2, height / 2])

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(data.features)
    .join("path")
    .attr("fill", "#69b3a2")
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    .style("stroke", "#fff")
    .on('mouseover',
      (e, d) => {
        d3.select(e.currentTarget).transition().duration(40).attr('fill', 'red')
      })
    .on('mouseout',
      (e, d) => {
        d3.select(e.currentTarget).transition().duration(40).attr('fill', '#69b3a2')
      })
})
