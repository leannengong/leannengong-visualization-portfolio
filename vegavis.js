// Load data from datasets/videogames_wide.csv 
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

// Load data from datasets/videogames_long.csv 
async function fetchDataLong() {
  const dataLong = await d3.csv("./dataset/videogames_long.csv");
  return dataLong;
}

//fetch the data 
fetchData().then((data) => {

  // use vl API to build the vegalite
  //visualization 1 Global Sales by Genre & Platform
  const vlSpec = vl
    //from observable vega lite site 
    .markRect()
    .data(data)
    .encode(
      vl.x().fieldN("Genre"),
      vl.y().fieldN("Platform"),
      vl.color()
      .sum("Global_Sales") 
      .title("Global Sales (Millions)")
      .scale({ scheme: "purples" }),

    )
    .width({ step: 40 })
    .height({ step: 30 })
    .toSpec(); 

  //Visualization 2 - Sales Over Time by Platform & Genre
  const vlSpec2 = vl
  .markBar()
    .data(data)
    .encode(
      vl.x().fieldO("Year"),
      vl.y().sum("Global_Sales").title("Global Sales (Millions)"),
      vl.color().fieldN("Genre").scale({ scheme: "redpurple" }),
      vl.column().fieldN("Platform"), 
      vl.tooltip([
        vl.fieldN("Genre"),
        vl.fieldN("Platform"),
        vl.fieldO("Year"),
        vl.fieldQ("Global_Sales")
        ])
    )
    .width(500)
    .height(500)
    .toSpec(); 


  //render the visualizations
  render("#view", vlSpec);
  render("#view2", vlSpec2);


});

//we want to use long data for the last 2 visualizations
//so we need to fetch it 
fetchDataLong().then((dataLong) => {

 //Visualization 3 - Regional Sales vs Platform
  const vlSpec3 = vl
    .markBar()
    .data(dataLong) 
    .encode(
      vl.y().fieldN("platform"),
      vl.x().sum("sales_amount").title("Sales (Millions)").type("quantitative"),
      vl.color().fieldN("sales_region").title("Region").scale({ scheme: "lightmulti" }),
      vl.tooltip([
        vl.fieldN("platform"),
        vl.fieldN("sales_region"),
        vl.sum("sales_amount")
      ])
    )
    .width(700)
    .height(700)
    .toSpec(); 

    //Visualization 4 - Sales of Resident Evil Games from Each Region
    const vlSpec4 = vl
    .markBar() 
    .data(dataLong.filter(d => typeof d.name === "string" && d.name.includes("Resident Evil")))
    .encode(
      vl.x().fieldN("name").title("Resident Evil Game"), 
      vl.y().sum("sales_amount").title("Sales (Millions)"),
      vl.color().fieldN("sales_region").title("Region").scale({scheme:"reds"}),
      vl.tooltip([
        vl.fieldN("name"), 
        vl.fieldN("sales_region"), 
        vl.fieldQ("sales_amount")])
    
    )
    .toSpec();

  render("#view3", vlSpec3);
  render("#view4", vlSpec4);

});


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
