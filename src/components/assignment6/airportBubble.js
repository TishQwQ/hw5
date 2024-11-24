
import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";

function AirportBubble(props) {
  const { width, height, countries, routes, selectedAirline } = props;

  // 处理 selectedAirline 为字符串 'null' 的情况
  if (selectedAirline && selectedAirline !== 'null') {
    let selectedRoutes = routes.filter(a => a.AirlineID === selectedAirline);
    let cities;
    let radius;
    //TODO: when the selectedAirline is not null,
        //1.Obtain an array of cities from the selectedRoutes by groupByCity
        //2.Sort the cities ascendingly by the d.Count (i.e., the number of routes from/to the city)
        // This avoids the text on the largest bubbles being covered by small bubbles.
        //3.Define a scale for the radius of bubbles. You should use scaleLinear; 
        //  the range is [2, width*0.15], and the domain is the minimum and maximum of the values of Count.  
        //4.Run the force simulation: You should use the "forceSimulation" of d3 to obtain
        //  the x and y coordinates of the circles. The velocityDecay is set to 0.2; 
        //  you need to add `forceX` (with position `width/2`, and `strength(0.02)`) 
        //  and `forceY` (with position `height/2`, and `strength(0.02)`). 
        //  Also, you need to add `forceCollide` and specify the radius of each circle. 
        //  Please set `.tick(200)`. 
        //5.Return the circles: All circles (except the top 5 hubs) 
        //  are filled by `#2a5599`; please set `stroke={"black"}` and `strokeWidth={"2"}`;
        //6.Since we have sorted the array of cities, the last 5 cities are the top 5 hubs. 
        //  You need to highlight them by filling them with `#ADD8E6` and attach the names 
        //  of the cities to the bubbles. You can use `<text>` tag to add the names. 
        //  Hint: when using .map() the callback function can have two arguments: (d, idx) => {};
        //  the idx is the index of the object d. You can use it to 
        //  Please using the following style setting in the text:
        //  style={{textAnchor:"middle", stroke:"pink", strokeWidth:"0.5em", 
        //     fill:"#992a2a", fontSize:16, fontFamily:"cursive", 
        //     paintOrder:"stroke", strokeLinejoin:"round"}}
        //Note: for each <circle />, please set the key={idx} to avoid the warnings.
    // 1. 
    cities = groupByCity(selectedRoutes);

    // 2. 按 d.Count 升序排序城市
    cities.sort((a, b) => a.Count - b.Count);

    // 3. 
    const minCount = min(cities, d => d.Count);
    const maxCount = max(cities, d => d.Count);
    radius = scaleLinear()
      .domain([minCount, maxCount])
      .range([2, width * 0.15]);

    // 4. 
    const simulation = forceSimulation(cities)
      .velocityDecay(0.2)
      .force("y", forceX(width / 2).strength(0.02))
      .force("x", forceY(height / 2).strength(0.02))
      .force("collide", forceCollide(d => radius(d.Count) ).strength(1));

    simulation.stop();
    for (let i = 0; i < 200; ++i) {
      simulation.tick();
    }

    // 5 & 6. 
    return (
      <g>
        {cities.map((d, idx) => {
          const r = radius(d.Count);
          let fillColor = "#2a5599";
          const isTopHub = idx >= Math.max(0, cities.length - 5);

          if (isTopHub) {
            fillColor = "#ADD8E6";
          }

          return (
            <g key={idx}>
              <circle
                cx={d.x}
                cy={d.y}
                r={r}
                fill={fillColor}
                stroke="black"
                strokeWidth="2"
              />
              {isTopHub && (
                <text
                  x={d.x}
                  y={d.y}
                  style={{
                    textAnchor: "middle",
                    stroke: "pink",
                    strokeWidth: "0.5em",
                    fill: "#992a2a",
                    fontSize: 16,
                    fontFamily: "cursive",
                    paintOrder: "stroke",
                    strokeLinejoin: "round",
                  }}
                >
                  {d.City}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  } else {
            //TODO: when the selectedAirline is null,
        //1.Obtain an array of cities from the routes by groupByCity;
        //2.Plot the bubble chart; highlight the top 5 hub cities worldwide,
        //  using the same settings as the case when the selectedAirline is not null;
    let cities;
    let radius;

    // 1.
    cities = groupByCity(routes);

    // 2. 
    cities.sort((a, b) => a.Count - b.Count);

    // 3. 
    const minCount = min(cities, d => d.Count);
    const maxCount = max(cities, d => d.Count);
    radius = scaleLinear()
      .domain([minCount, maxCount])
      .range([2, width * 0.15]);

    // 4. 
    const simulation = forceSimulation(cities)
      .velocityDecay(0.2)
      .force("x", forceX(width / 2).strength(0.02))
      .force("y", forceY(height / 2).strength(0.02))
      .force("collide", forceCollide(d => radius(d.Count) ).strength(1));

    simulation.stop();
    for (let i = 0; i < 200; ++i) {
      simulation.tick();
    }

    // 5 & 6.
    return (
      <g>
        {cities.map((d, idx) => {
          const r = radius(d.Count);
          let fillColor = "#2a5599";
          const isTopHub = idx >= Math.max(0, cities.length - 5);

          if (isTopHub) {
            fillColor = "#ADD8E6";
          }

          return (
            <g key={idx}>
              <circle
                cx={d.x}
                cy={d.y}
                r={r}
                fill={fillColor}
                stroke="black"
                strokeWidth="2"
              />
              {isTopHub && (
                <text
                  x={d.x}
                  y={d.y}
                  style={{
                    textAnchor: "middle",
                    stroke: "pink",
                    strokeWidth: "0.5em",
                    fill: "#992a2a",
                    fontSize: 16,
                    fontFamily: "cursive",
                    paintOrder: "stroke",
                    strokeLinejoin: "round",
                  }}
                >
                  {d.City}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  }
}

export { AirportBubble };

