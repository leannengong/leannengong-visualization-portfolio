// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  // Ensure the path is correct relative to your HTML file location
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then((data) => {
  // Build the Vega-Lite specification using the vl API
  const vlSpec = vl
    .markRect()
    .data(data)
    .encode(
      vl.x().fieldN("Genre"),
      vl.y().fieldN("Platform"),
    vl.color()
      .sum("Global_Sales") // <--- You already aggregate 'Global_Sales' here for color
      .title("Global Sales (Millions)")
      .scale({ scheme: "purples" }),

    )
    .width({ step: 40 })
    .height({ step: 30 })
    .toSpec(); // Use .toSpec() to get the final JSON object

  // Render the chart using the standard vegaEmbed function
  // Pass the target div ID, the Vega-Lite spec, and options (like disabling actions)

  //Remove the separate 'render' function, as vegaEmbed handles the rendering process.
  // The 'vl.register' call in your HTML handles the necessary setup for the vl API.

  const vlSpec2 = vl
  .markBar()
    .data(data)
    .encode(
      vl.x().fieldO("Year"),
      vl.y().sum("Global_Sales").title("Global Sales (Millions)"),
      vl.color().fieldN("Genre").scale({ scheme: "redpurple" }),
      vl.column().fieldN("Platform"), // small multiples per platform
      vl.tooltip([
        vl.fieldN("Genre"),
        vl.fieldN("Platform"),
        vl.fieldO("Year"),
        vl.fieldQ("Global_Sales")
        ])
    )
    .width(500)
    .height(500)
    .toSpec(); // Convert to Vega-Lite JSON spec


  render("#view", vlSpec);
  render("#view2", vlSpec2);

});


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
