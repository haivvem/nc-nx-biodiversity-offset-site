"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Language, translations } from "@/data/translations";

interface LeafletMapProps {
  lang: Language;
}

interface VillageProperties {
  fid_1: number;
  OBJECTID: number;
  ENG_NAME: string;
  LAO_NAME: string;
  LONDD: number;
  LATDD: number;
}

interface PointGeometry {
  type: "Point";
  coordinates: [number, number];
}

interface VillageFeature {
  type: "Feature";
  properties: VillageProperties;
  geometry: PointGeometry;
}

export default function LeafletMap({ lang }: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const boundaryLayerRef = useRef<L.GeoJSON | null>(null);
  const villageLayerRef = useRef<L.GeoJSON | null>(null);
  const tpzLayerRef = useRef<L.GeoJSON | null>(null);
  const districtLayerRef = useRef<L.GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);

  const t = translations[lang].hero;

  // Initial Map Setup
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    let isMounted = true;

    // Satellite base layer
    const satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
      }
    );

    // Terrain base layer
    const terrain = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
      }
    );

    // Create Leaflet Map Instance
    const map = L.map(mapContainerRef.current, {
      center: [18.7, 104.7],
      zoom: 10,
      layers: [satellite], // Default to Satellite view
    });

    mapRef.current = map;

    // Fetch and Load GeoJSON Data
    Promise.all([
      fetch("/boundary.geojson").then((res) => res.ok ? res.json() : null).catch(() => null),
      fetch("/village.geojson").then((res) => res.ok ? res.json() : null).catch(() => null),
      fetch("/district.geojson").then((res) => res.ok ? res.json() : null).catch(() => null),
      fetch("/tpz.geojson").then((res) => res.ok ? res.json() : null).catch(() => null),
    ])
      .then(([boundaryData, villageData, districtData, tpzData]) => {
        if (!isMounted || !mapRef.current) return;

        const overlays: Record<string, L.Layer> = {};

        // 1. Render Project Boundary Polygons (Green fill)
        if (boundaryData) {
          const boundaryLayer = L.geoJSON(boundaryData as any, {
            style: {
              color: "#10b981", // Emerald-500
              weight: 3.5,
              fillColor: "#047857", // Forest green
              fillOpacity: 0.22,
            },
            onEachFeature: (feature, layer) => {
              const props = feature.properties || {};
              const area = props.Area || props.area || "60,000 ha";
              const popupContent = `
                <div class="font-sans text-xs p-1">
                  <h4 class="font-bold text-forest-900 border-b border-forest-100 pb-1 mb-1">🌳 ${lang === "lo" ? "ເຂດຊົດເຊີຍຊີວະນາໆພັນ" : "Biodiversity Offset Site"}</h4>
                  <p class="text-forest-650"><b>${lang === "lo" ? "ເນື້ອທີ່" : "Area"}:</b> ${area}</p>
                  <p class="text-forest-500 text-[10px] mt-1">${lang === "lo" ? "ພາຍໃຕ້ການຄຸ້ມຄອງຂອງ BOMU" : "Managed under BOMU Office"}</p>
                </div>
              `;
              layer.bindPopup(popupContent);
            }
          }).addTo(mapRef.current);
          boundaryLayerRef.current = boundaryLayer;
          overlays[
            lang === "lo" 
              ? "🟢 ຂອບເຂດເຂດຊົດເຊີຍ (Offset Boundary)" 
              : "🟢 Offset Site Boundary"
          ] = boundaryLayer;

          // Fit map view to boundary bounds
          const bounds = boundaryLayer.getBounds();
          mapRef.current.fitBounds(bounds, { padding: [30, 30] });
        }

        // 2. Render Totally Protected Zones (TPZ) (Orange/Red fill to denote strict protection)
        if (tpzData) {
          const tpzLayer = L.geoJSON(tpzData as any, {
            style: {
              color: "#f97316", // Orange border
              weight: 2.5,
              fillColor: "#ea580c", // Dark orange fill
              fillOpacity: 0.35,
            },
            onEachFeature: (feature, layer) => {
              const props = feature.properties || {};
              const nameLao = props.LAO_NAME || props.lao_name || props.Name || props.NAME || props.zone || props.Zone || "";
              const nameEng = props.ENG_NAME || props.eng_name || props.Name || props.NAME || props.zone || props.Zone || "";
              
              const popupContent = `
                <div class="font-sans text-xs p-1">
                  <h4 class="font-bold text-orange-900 border-b border-orange-100 pb-1 mb-1">🛡️ ${nameLao || nameEng || (lang === "lo" ? "ເຂດຫວງຫ້າມເດັດຂາດ" : "Totally Protected Zone")}</h4>
                  <p class="text-orange-750"><b>Status:</b> ${lang === "lo" ? "ເຂດຫວງຫ້າມເດັດຂາດ (Core Zone)" : "Totally Protected Zone (Core Zone)"}</p>
                  <p class="text-orange-600 text-[10px] mt-1">${lang === "lo" ? "ຫ້າມເຮັດກິດຈະກຳຂອງມະນຸດທຸກປະເພດ" : "No human activities allowed"}</p>
                </div>
              `;
              layer.bindPopup(popupContent);
            }
          }).addTo(mapRef.current);
          tpzLayerRef.current = tpzLayer;
          overlays[
            lang === "lo" 
              ? "🟠 ເຂດຫວງຫ້າມເດັດຂາດ (TPZ Core Zone)" 
              : "🟠 Totally Protected Zone (TPZ)"
          ] = tpzLayer;
        }

        // 3. Render District Boundaries (Background administrative layer, styled thin and dashed)
        if (districtData) {
          const districtLayer = L.geoJSON(districtData as any, {
            style: {
              color: "#c084fc", // Purple-400 to stand out clearly from Green (boundary) and Orange (TPZ)
              weight: 2,
              dashArray: "6, 6",
              fill: false, // Ensure no fill so it doesn't block underlying layers
            },
            onEachFeature: (feature, layer) => {
              const props = feature.properties || {};
              const nameLao = props.Lao || props.lao || props.LAO_NAME || props.lao_name || props.Name || props.NAME || "";
              const nameEng = props.Engligh || props.Latine_Nam || props.english || props.ENG_NAME || props.eng_name || props.Name || props.NAME || "";
              
              const popupContent = `
                <div class="font-sans text-xs p-1">
                  <h4 class="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-1">📍 ${lang === "lo" ? (nameLao || nameEng) : (nameEng || nameLao)}</h4>
                  <p class="text-slate-500 text-[10px]">Lao: ${nameLao || "-"}</p>
                  <p class="text-slate-500 text-[10px]">Eng: ${nameEng || "-"}</p>
                  <p class="text-slate-650 mt-1 font-semibold">${lang === "lo" ? "ປະເພດ: ຂອບເຂດເມືອງ" : "Type: District Boundary"}</p>
                </div>
              `;
              layer.bindPopup(popupContent);
            }
          }).addTo(mapRef.current);
          districtLayerRef.current = districtLayer;
          overlays[
            lang === "lo" 
              ? "🗺️ ຂອບເຂດເມືອງ (District Boundaries)" 
              : "🗺️ District Boundaries"
          ] = districtLayer;
        }

        // 4. Render Village Circle Points (Red markers with bilingual hover popups)
        if (villageData) {
          const villageLayer = L.geoJSON(villageData as any, {
            pointToLayer: (_feature: unknown, latlng: L.LatLng) => {
              return L.circleMarker(latlng, {
                radius: 7,
                fillColor: "#ef4444", // Red
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9,
              });
            },
            onEachFeature: (feature, layer) => {
              const props = feature.properties as VillageProperties;
              const name = lang === "lo" ? props.LAO_NAME : props.ENG_NAME;
              const desc = lang === "lo"
                ? `<div class="font-sans text-xs p-1">
                    <h4 class="font-bold text-forest-900 border-b border-forest-100 pb-1 mb-1">🏡 ${name}</h4>
                    <p class="text-forest-600">ພິກັດ: Lon ${props.LONDD.toFixed(4)}, Lat ${props.LATDD.toFixed(4)}</p>
                    <p class="text-forest-600">ສະຖານະ: ບ້ານຮ່ວມມືອະນຸລັກ</p>
                   </div>`
                : `<div class="font-sans text-xs p-1">
                    <h4 class="font-bold text-forest-900 border-b border-forest-100 pb-1 mb-1">🏡 ${name}</h4>
                    <p class="text-forest-600">Coords: Lon ${props.LONDD.toFixed(4)}, Lat ${props.LATDD.toFixed(4)}</p>
                    <p class="text-forest-600">Status: Partner Village</p>
                   </div>`;
              layer.bindPopup(desc);

              // Popups trigger on hover for high interactivity
              layer.on("mouseover", () => {
                layer.openPopup();
              });
            },
          }).addTo(mapRef.current);
          villageLayerRef.current = villageLayer;
          overlays[
            lang === "lo" 
              ? "🏡 ບ້ານຮ່ວມມືອະນຸລັກ (Villages)" 
              : "🏡 Partner Villages"
          ] = villageLayer;
        }

        // Add Layer Switcher Controls (Bilingual labels by default for clear navigation)
        const baseMaps = {
          "🛰️ satellite map (ແຜນທີ່ດາວທຽມ)": satellite,
          "🗺️ terrain map (ແຜນທີ່ພູມສັນຖານ)": terrain,
        };

        L.control.layers(baseMaps, overlays, { position: "topright" }).addTo(mapRef.current);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading GeoJSON data inside Leaflet:", err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      boundaryLayerRef.current = null;
      villageLayerRef.current = null;
      tpzLayerRef.current = null;
      districtLayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Popups Reactively when language changes
  useEffect(() => {
    if (loading) return;

    // 1. Update Villages popups reactively
    if (villageLayerRef.current) {
      villageLayerRef.current.eachLayer((layer: L.Layer) => {
        const marker = layer as L.CircleMarker & { feature?: VillageFeature };
        const feature = marker.feature;
        if (feature && feature.properties) {
          const props = feature.properties;
          const name = lang === "lo" ? props.LAO_NAME : props.ENG_NAME;
          const desc = lang === "lo"
            ? `<div class="font-sans text-xs p-1">
                <h4 class="font-bold text-forest-900 border-b border-forest-100 pb-1 mb-1">🏡 ${name}</h4>
                <p class="text-forest-600">ພິກັດ: Lon ${props.LONDD.toFixed(4)}, Lat ${props.LATDD.toFixed(4)}</p>
                <p class="text-forest-600">ສະຖານະ: ບ້ານຮ່ວມມືອະນຸລັກ</p>
               </div>`
            : `<div class="font-sans text-xs p-1">
                <h4 class="font-bold text-forest-900 border-b border-forest-100 pb-1 mb-1">🏡 ${name}</h4>
                <p class="text-forest-600">Coords: Lon ${props.LONDD.toFixed(4)}, Lat ${props.LATDD.toFixed(4)}</p>
                <p class="text-forest-600">Status: Partner Village</p>
               </div>`;
          marker.setPopupContent(desc);
        }
      });
    }

    // 2. Update TPZ popups reactively
    if (tpzLayerRef.current) {
      tpzLayerRef.current.eachLayer((layer: L.Layer) => {
        const polygon = layer as L.Polygon & { feature?: any };
        const feature = polygon.feature;
        if (feature && feature.properties) {
          const props = feature.properties;
          const nameLao = props.LAO_NAME || props.lao_name || props.Name || props.NAME || props.zone || props.Zone || "";
          const nameEng = props.ENG_NAME || props.eng_name || props.Name || props.NAME || props.zone || props.Zone || "";
          
          const popupContent = `
            <div class="font-sans text-xs p-1">
              <h4 class="font-bold text-orange-900 border-b border-orange-100 pb-1 mb-1">🛡️ ${nameLao || nameEng || (lang === "lo" ? "ເຂດຫວງຫ້າມເດັດຂາດ" : "Totally Protected Zone")}</h4>
              <p class="text-orange-750"><b>Status:</b> ${lang === "lo" ? "ເຂດຫວງຫ້າມເດັດຂາດ (Core Zone)" : "Totally Protected Zone (Core Zone)"}</p>
              <p class="text-orange-600 text-[10px] mt-1">${lang === "lo" ? "ຫ້າມເຮັດກິດຈະກຳຂອງມະນຸດທຸກປະເພດ" : "No human activities allowed"}</p>
            </div>
          `;
          polygon.setPopupContent(popupContent);
        }
      });
    }

    // 3. Update District popups reactively
    if (districtLayerRef.current) {
      districtLayerRef.current.eachLayer((layer: L.Layer) => {
        const polygon = layer as L.Polygon & { feature?: any };
        const feature = polygon.feature;
        if (feature && feature.properties) {
          const props = feature.properties;
          const nameLao = props.Lao || props.lao || props.LAO_NAME || props.lao_name || "";
          const nameEng = props.Engligh || props.Latine_Nam || props.english || props.ENG_NAME || props.eng_name || "";
          
          const popupContent = `
            <div class="font-sans text-xs p-1">
              <h4 class="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-1">📍 ${lang === "lo" ? (nameLao || nameEng) : (nameEng || nameLao)}</h4>
              <p class="text-slate-500 text-[10px]">Lao: ${nameLao || "-"}</p>
              <p class="text-slate-500 text-[10px]">Eng: ${nameEng || "-"}</p>
              <p class="text-slate-650 mt-1 font-semibold">${lang === "lo" ? "ປະເພດ: ຂອບເຂດເມືອງ" : "Type: District Boundary"}</p>
            </div>
          `;
          polygon.setPopupContent(popupContent);
        }
      });
    }
  }, [lang, loading]);

  return (
    <div className="w-full bg-forest-950 p-4 sm:p-6 rounded-3xl border border-forest-900 shadow-2xl relative flex flex-col justify-between overflow-hidden">
      {/* Header Tag */}
      <div className="absolute top-4 left-4 z-[400] bg-forest-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-forest-850">
        <span className="text-xs font-semibold text-emerald-400">{t.mapTitle}</span>
      </div>

      {/* Map Loader Indicator */}
      {loading && (
        <div className="absolute inset-0 z-[500] bg-forest-950/80 backdrop-blur-sm flex items-center justify-center text-white">
          <div className="flex flex-col items-center space-y-3">
            <svg className="animate-spin h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm font-semibold">{lang === "lo" ? "ກຳລັງໂຫຼດແຜນທີ່..." : "Loading Map..."}</span>
          </div>
        </div>
      )}

      {/* Leaflet Map Div */}
      <div
        ref={mapContainerRef}
        className="w-full h-[450px] rounded-2xl bg-forest-900 border border-forest-800 shadow-inner z-10 mt-8"
      />

      <p className="text-[10px] text-forest-500 mt-4 text-center italic z-20">
        {t.mapDisclaimer}
      </p>
    </div>
  );
}
