import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ source, destination, setRouteInfo }) {

  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {

    if (!source || !destination) return;

    // Remove previous route
    if (routingRef.current) {
      try {
        map.removeControl(routingRef.current);
      } catch (e) {}
    }

    routingRef.current = L.Routing.control({

      waypoints: [
        L.latLng(source[0], source[1]),
        L.latLng(destination[0], destination[1]),
      ],

      createMarker: () => null,

      lineOptions: {
        styles: [
          {
            color: "#1976d2",
            weight: 6,
            opacity: 0.9,
          },
        ],
      },

      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,

    }).addTo(map);

    routingRef.current.on("routesfound", (e) => {

      const route = e.routes[0];

      const distance = (
        route.summary.totalDistance / 1000
      ).toFixed(2);

      const totalMinutes = Math.round(
        route.summary.totalTime / 60
      );

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const time =
        hours > 0
          ? `${hours} hr ${minutes} min`
          : `${minutes} min`;

      setRouteInfo({
        distance,
        time,
      });

    });

    return () => {
      try {
        if (routingRef.current) {
          map.removeControl(routingRef.current);
          routingRef.current = null;
        }
      } catch (e) {}
    };

  }, [source, destination]);

  return null;
}

export default Routing;