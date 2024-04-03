"use client";

import { INITIAL_CENTER, INITIAL_ZOOM } from "@/lib/constants";
import { Coordinates, NaverMap } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef } from "react";

interface MapContentProps {
  mapId?: string;
  initialCenter: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
}
export default function MapContent({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: MapContentProps) {
  const mapRef = useRef<NaverMap | null>(null);
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <div id={mapId} className="w-full h-full"></div>
    </>
  );
}
