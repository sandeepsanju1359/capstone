// import React from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
//
// const IndiaMap = () => {
//     const indiaCoordinates = [20.5937, 78.9629];
//     const zoomLevel = 5;
//
//     return (
//         <div>
//             <MapContainer center={indiaCoordinates} zoom={zoomLevel} style={{ height: '600px', width: '800px' }}>
//                 <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//             </MapContainer>
//         </div>
//     );
// };
//
// export default IndiaMap;











import React, { useState } from "react";
import DatamapsIndia from 'react-datamaps-india';
import './IndiaMap.css'

const IndiaMap = () => {

    return (
        <div className="IndiaMap">
            <DatamapsIndia className="Map"
                           hoverComponent={({ value }) => {
                               return (
                                   <>
                                       <p>{value.name}</p>
                                       <p>{value.value}</p>
                                   </>
                               )
                           }}
                           mapLayout={{
                               // title: 'India',
                               startColor: '#FFDAB9',
                               endColor: '#FF6347',
                               hoverTitle: 'Count',
                               noDataColor: '#f5f5f5',
                               borderColor: '#8D8D8D',
                               hoverBorderColor: '#8D8D8D',
                               hoverColor: 'green',
                           }}
            />
        </div>
    )
}

export default IndiaMap;





























//
// import React from 'react';
// import { WorldMap } from 'react-svg-worldmap';
//
// const IndiaMap = () => {
//     const countryClickHandler = (event, countryName) => {
//         console.log('Clicked on country: ', countryName);
//     };
//
//     return (
//         <div>
//             <WorldMap
//                 color="navy"
//                 size="xl"
//                 data={[]}
//                 onClickFunction={countryClickHandler}
//                 backgroundColor="#F5F5F5"
//                 borderColor="#E0E0E0"
//                 zoom="30"
//                 center={[78.9629, 20.5937]}
//             />
//         </div>
//     );
// };
//
// export default IndiaMap;



















































//
// import React, { useRef, useEffect } from 'react';
// import { geoMercator, geoPath } from 'd3-geo';
//
// // Sample data representing a few states of India (you can add more data points to make it more detailed)
// const indiaStates = [
//     {
//         id: 'AP',
//         name: 'Andhra Pradesh',
//         path: 'M100 100 L120 90 L120 100 Z',
//     },
//     {
//         id: 'KA',
//         name: 'Karnataka',
//         path: 'M80 130 L100 120 L100 130 Z',
//     },
//     {
//         id: 'TN',
//         name: 'Tamil Nadu',
//         path: 'M100 170 L120 160 L120 170 Z',
//     },
// ];
//
// const IndiaMap = () => {
//     const svgRef = useRef(null);
//
//     useEffect(() => {
//         if (!svgRef.current) return;
//
//         const svg = svgRef.current;
//         const projection = geoMercator().scale(1000).center([78.9629, 20.5937]);
//         const pathGenerator = geoPath().projection(projection);
//
//         indiaStates.forEach((state) => {
//             const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//             path.setAttribute('d', state.path);
//             path.setAttribute('fill', '#EAEAEC');
//             path.setAttribute('stroke', '#D6D6D6');
//             path.setAttribute('stroke-width', '0.5');
//             svg.appendChild(path);
//         });
//     }, []);
//
//     return (
//         <div>
//             <svg ref={svgRef} width="800" height="600"></svg>
//         </div>
//     );
// };
//
// export default IndiaMap;


// import React, { useState, useEffect } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { feature } from 'topojson-client';
//
// const IndiaMap = () => {
//     const [geoData, setGeoData] = useState([]);
//
//     useEffect(() => {
//         const fetchTopoJSON = async () => {
//             const response = await fetch(
//                 'https://gist.githubusercontent.com/sandysk1991/2b672e32fca747b114c0a36e16b37f5d/raw/27a9d38dbb6dcd5a1a5f0b92fd1f5e03a18dc83a/india.topo.json'
//             );
//             const topoJSONData = await response.json();
//             const geoFeatures = feature(topoJSONData, topoJSONData.objects.IND_adm1).features;
//             setGeoData(geoFeatures);
//         };
//
//         fetchTopoJSON();
//     }, []);
//
//     return (
//         <div>
//             <ComposableMap
//                 width={800}
//                 height={600}
//                 projectionConfig={{
//                     scale: 1000,
//                     center: [78.9629, 20.5937],
//                 }}
//             >
//                 <Geographies geography={geoData}>
//                     {({ geographies }) =>
//                         geographies.map((geo) => (
//                             <Geography
//                                 key={geo.properties.ID_1}
//                                 geography={geo}
//                                 fill="#EAEAEC"
//                                 stroke="#D6D6D6"
//                                 strokeWidth={0.5}
//                             />
//                         ))
//                     }
//                 </Geographies>
//             </ComposableMap>
//         </div>
//     );
// };
//
// export default IndiaMap;


// import React, { useState, useEffect } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { feature } from 'topojson-client';
//
// const IndiaMap = () => {
//     const [geoData, setGeoData] = useState([]);
//
//     useEffect(() => {
//         const fetchTopoJSON = async () => {
//             const response = await fetch(
//                 'https://github.com/wmgeolab/geoBoundaries/raw/905b0ba/releaseData/gbOpen/IND/ADM3/geoBoundaries-IND-ADM3.topojson'
//             );
//             const topoJSONData = await response.json();
//             const geoFeatures = feature(topoJSONData, topoJSONData.objects.geoBoundariesINDADM3).features;
//             setGeoData(geoFeatures);
//         };
//
//         fetchTopoJSON();
//     }, []);
//
//     return (
//         <div>
//             <ComposableMap
//                 width={800}
//                 height={600}
//                 projectionConfig={{
//                     scale: 1000,
//                     center: [78.9629, 20.5937],
//                 }}
//             >
//                 <Geographies geography={geoData}>
//                     {({ geographies }) =>
//                         geographies.map((geo) => (
//                             <Geography
//                                 key={geo.properties.geoBoundaryID}
//                                 geography={geo}
//                                 fill="#EAEAEC"
//                                 stroke="#D6D6D6"
//                                 strokeWidth={0.5}
//                             />
//                         ))
//                     }
//                 </Geographies>
//             </ComposableMap>
//         </div>
//     );
// };
//
// export default IndiaMap;



















// import React, { useState, useEffect } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { feature } from 'topojson-client';
// import  './india.topo.json'
//
// const IndiaMap = () => {
//     const [geoData, setGeoData] = useState([]);
//
//     useEffect(() => {
//         const fetchTopoJSON = async () => {
//             const response = await fetch('/india.topo.json');
//             const topoJSONData = await response.json();
//             const geoFeatures = feature(topoJSONData, topoJSONData.objects.default).features;
//             setGeoData(geoFeatures);
//         };
//
//         fetchTopoJSON();
//     }, []);
//
//     return (
//         <div>
//             <ComposableMap
//                 width={800}
//                 height={600}
//                 projectionConfig={{
//                     scale: 1000,
//                     center: [78.9629, 20.5937],
//                 }}
//             >
//                 <Geographies geography={geoData}>
//                     {({ geographies }) =>
//                         geographies.map((geo) => (
//                             <Geography
//                                 key={geo.properties['hc-key']}
//                                 geography={geo}
//                                 fill="#EAEAEC"
//                                 stroke="#D6D6D6"
//                                 strokeWidth={0.5}
//                             />
//                         ))
//                     }
//                 </Geographies>
//             </ComposableMap>
//         </div>
//     );
// };
//
// export default IndiaMap;
//
//

