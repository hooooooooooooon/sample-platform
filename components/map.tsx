"use client";

import { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { defaults, MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate";
import { Tile } from "ol/layer";
import { fromLonLat, get } from "ol/proj";
import { OSM } from "ol/source";

export default function OlMap({ }) {
  const [mapObj, setMapObj] = useState<any>();
  const constantLonLat = [126.3057, 33.3557]

  useEffect(() => {
    let mousePositionCtrl = new MousePosition({
      className: "mouse-position",
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      target: "mouse-position",
    });
    const map = new Map({
      controls: defaults({
        attribution: false,
        zoom: false,
        rotate: false,
      }).extend([mousePositionCtrl]),
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      target: "ol-map",
      view: new View({
        projection: get("EPSG:3857")!,
        center: fromLonLat(constantLonLat, get("EPSG:3857")!),
        zoom: 14,
        minZoom: 14,
        maxZoom: 14,
      }),
    });
    const extent = map.getView().calculateExtent()
    setMapObj({ map });
    return () => {
      map.setTarget(undefined);
    };
  }, []);
  return (
    <>
      <div id="ol-map" className="absolute inset-0"></div>
    </>
  );
}
