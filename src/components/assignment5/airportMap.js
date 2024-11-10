import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes';

function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirline } = props; // 接收 selectedAirline 而不是 selectedAirlineID
    console.log("Received selectedAirline in AirportMap:", selectedAirline); // 检查 selectedAirline 值
    // 定义投影
    let projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);
    
    const pathGenerator = geoPath().projection(projection);

    return (
        <g>
            {/* 绘制世界地图 */}
            {countries.features.map((country, index) => (
                <path
                    key={index}
                    d={pathGenerator(country)}
                    stroke="#ccc"
                    fill="#eee"
                />
            ))}
            
            {/* 绘制机场 */}
            {routes.map((route, index) => (
                <circle
                    key={index}
                    cx={projection([route.SourceLongitude, route.SourceLatitude])[0]}
                    cy={projection([route.SourceLongitude, route.SourceLatitude])[1]}
                    r={1}
                    fill="#2a5599"
                />
            ))}

            {/* 将 selectedAirline 传递给 Routes 组件 */}
            <Routes 
                projection={projection} 
                routes={routes} 
                selectedAirline={selectedAirline} // 确保传递的是 selectedAirline
            />
        </g>
    );
}

export { AirportMap };
