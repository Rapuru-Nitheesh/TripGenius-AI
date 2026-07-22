import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Routing({ source, destination, setRouteInfo }) {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination) return;

    const routingControl = L.Routing.control({

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

    routingControl.on("routesfound", function (e) {
      const route = e.routes[0];

      const distance = (
        route.summary.totalDistance / 1000
      ).toFixed(2);

      const totalMinutes = Math.round(route.summary.totalTime / 60);

const hours = Math.floor(totalMinutes / 60);

const minutes = totalMinutes % 60;

const time =
  hours > 0
    ? `${hours} hr ${minutes} min`
    : `${minutes} min`;

      console.log("Distance:", distance);
      console.log("Time:", time);

      setRouteInfo({
        distance,
        time,
      });
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [source, destination, map, setRouteInfo]);

  return null;
}

export default Routing;