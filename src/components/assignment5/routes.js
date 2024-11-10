
import React, { useEffect, useState } from "react";

function Routes(props) {
        // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.


    const { projection, routes, selectedAirline } = props;
    
    const [selectedAirlineID, setSelectedAirlineID] = useState(selectedAirline);

    useEffect(() => {
        setSelectedAirlineID(selectedAirline); // 更新为传入的 selectedAirline 值
    }, [selectedAirline]);

    console.log("Routes received selectedAirlineID:", selectedAirlineID);

    if (!selectedAirlineID) return <g></g>;

    // 根据 selectedAirlineID 过滤航线
    const filteredRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);
    console.log("Filtered Routes:", filteredRoutes); 
    return (
        <g>
            {filteredRoutes.map((route, index) => (
                <line
                    key={index}
                    x1={projection([route.SourceLongitude, route.SourceLatitude])[0]}
                    y1={projection([route.SourceLongitude, route.SourceLatitude])[1]}
                    x2={projection([route.DestLongitude, route.DestLatitude])[0]}
                    y2={projection([route.DestLongitude, route.DestLatitude])[1]}
                    stroke="#992a5b"
                    strokeWidth="1"
                    opacity="0.3"
                />
            ))}
        </g>
    );
}

export { Routes };
