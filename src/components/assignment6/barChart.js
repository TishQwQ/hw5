import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
  const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;
  let maximunCount = max(data, d => d.Count);
  const xScale = scaleLinear().range([0, width]).domain([0, maximunCount]).nice();
  const yScale = scaleBand()
    .range([0, height])
    .domain(data.map(a => a.AirlineName))
    .padding(0.2); // The domain is the list of airline names
  let color = d => (d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599");

  // TODO:
  // 1. Change the mouse event in <rect/> to onClick;
  // 2. Remove the onMouseOut in <rect />;
  // 3. Define a callback function for the onClick event, so that,
  //    when the mouse clicks a bar, the bar will be highlighted,
  //    and the bubble chart will show the bubbles of the selected airline.
  //    When the mouse clicks this selected bar for the second time,
  //    it will unselect the bar, and the color of the bar will turn to normal.
  //    Hint: You can compare the selectedAirline to d.AirlineID; if they are the same,
  //    call setSelectedAirline(null);
  // 4. Remove the onMouseOver and onMouseOut;

  // Remove the onMouseOver and onMouseOut functions
  // let onMouseOver = d => setSelectedAirline(d.AirlineID);
  // let onMouseOut = () => setSelectedAirline('null');

  // 3. Define a callback function for the onClick event
  let onClick = d => {
    if (selectedAirline === d.AirlineID) {
      setSelectedAirline(null); // Unselect the bar
    } else {
      setSelectedAirline(d.AirlineID); // Select the clicked airline
    }
  };

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {data.map(d => {
        return (
          <rect
            key={d.AirlineID}
            x={0}
            y={yScale(d.AirlineName)}
            width={xScale(d.Count)}
            height={yScale.bandwidth()}
            onClick={() => onClick(d)} // 1. Changed from onMouseOver to onClick
            // 2. Removed onMouseOut
            stroke="black"
            fill={color(d)}
          />
        );
      })}
      <YAxis yScale={yScale} height={height} offsetX={offsetX} />
      <XAxis xScale={xScale} width={width} height={height} />
    </g>
  );
}
