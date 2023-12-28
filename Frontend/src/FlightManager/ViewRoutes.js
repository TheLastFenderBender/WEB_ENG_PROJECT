import React, { useState, useEffect } from 'react';

import RouteGrid from './RouteGrid';
import NavBar from './NavBar';

const ViewRoutes = () => {

    const [routeData, setRouteData] = useState([]);

    
    const getRoutes = async () => {
        try {
            const response = await fetch("http://localhost:3000/routes");
            const Data = await response.json();

            setRouteData(Data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getRoutes();
    }, []);

  return (
    <div>
      <NavBar />
      <br></br>
      <RouteGrid routes={routeData} />
    </div>
  );
};

export default ViewRoutes;
