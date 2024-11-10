import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;
        // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>
    
    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input. 
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    
    if (!data) return null;

    const maxCount = max(data, d => d.Count);
    const xScale = scaleLinear()
        .domain([0, maxCount * 1.02])
        .range([0, width]);

    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName))
        .range([0, height])
        .padding(0.2);

    // 定义颜色函数
    const color = (d) => (d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599");

    // 鼠标悬停事件处理，更新父组件的 selectedAirline 状态
    const onMouseOver = (d) => {
        console.log("Hovered Airline ID:", d.AirlineID); // 打印当前悬停的 AirlineID
        if (setSelectedAirline) setSelectedAirline(d.AirlineID);
    };

    // 鼠标移出事件处理，清除 selectedAirline 状态
    const onMouseOut = () => {
        console.log("Mouse out, clearing selectedAirline"); // 打印鼠标移出事件
        if (setSelectedAirline) setSelectedAirline(null);
    };

    const bars = data.map(d => (
        <rect
            key={d.AirlineID}
            y={yScale(d.AirlineName)}
            width={xScale(d.Count)}
            height={yScale.bandwidth()}
            fill={color(d)}
            stroke="black"
            strokeWidth="1"
            onMouseOver={() => onMouseOver(d)}
            onMouseOut={onMouseOut}
        />
    ));

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
            {bars}
        </g>
    );
}