  // Data Collected with the Day of Week, Number of Times, and Colour
  // Resources: https://clementbenezech.hashnode.dev/creating-a-bar-chart-component-with-svg-and-javascript
  // https://www.geeksforgeeks.org/css/how-to-make-charts-with-svg/
  
  // Create an array with 7 objects (each day)
  const data = [
    { label: "Mon", value: 2, color: "#fabacaff" },
    { label: "Tue", value: 1, color: "#d1dab5" },
    { label: "Wed", value: 1, color: "#434d20" },
    { label: "Thu", value: 2, color: "#e9f08eff" },
    { label: "Fri", value: 4, color: "#f3bd8bff" },
    { label: "Sat", value: 5, color: "#d6c2faff" },
    { label: "Sun", value: 4, color: "#c08de9ff" }
  ];

  //find where gameGraph is on the visualizations.html
  const svg = document.getElementById("gameGraph");


  // Make the bar graph 
  const barWidth = 50;
  const chartHeight = 300;
  const baseY = 190; // bottom of bar
  const spacing = 60; 
  const startX = 40; // first bar 

  // Scale -> if you played 2x in a day, it will equal 2x30 pixels as the height 
  const scale = 30;

  //for loop 
  data.forEach((d, i) => {
    //position calculations in x position and y position of the bars 
    const x = startX + i * spacing;
    const height = d.value * 30; //height of bars
    const y = baseY - height;

    // Create rectangle bar element from W3 
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x); //for each loop it will have diff x pos
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth); 
    rect.setAttribute("height", height);
    rect.setAttribute("fill", d.color); //fill in the rectangle
    svg.appendChild(rect); //put the rectangle in the svg 

    // adds the bottom label simple to getting the position to make the bars
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x + barWidth / 2);
    text.setAttribute("y", baseY + 20);
    text.setAttribute("text-anchor", "middle");
    text.textContent = d.label;
    svg.appendChild(text);

    // adds the number of times similar to the previous 
    if (d.value) {
      const valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      valText.setAttribute("x", x + barWidth / 2);
      valText.setAttribute("y", y - 5);
      valText.setAttribute("text-anchor", "middle");
      valText.textContent = d.value + "x";
      svg.appendChild(valText);
    }

    
  });
