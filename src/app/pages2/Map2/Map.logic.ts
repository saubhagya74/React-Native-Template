import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import MapView, { MapType, Region } from 'react-native-maps';

type LatLng = { latitude: number; longitude: number };

type MarkerData = {
  id: string;
  coordinate: LatLng;
  title: string;
  description?: string;
  color?: string;
};

const INITIAL_REGION: Region = {
  latitude: 27.7172,
  longitude: 85.324,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export function useMapLogic2() {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [mapType, setMapType] = useState<MapType>('standard');
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: '1',
      coordinate: { latitude: 27.7172, longitude: 85.324 },
      title: 'Kathmandu',
      description: 'Default sample marker',
      color: 'blue',
    },
  ]);
  const [routeCoords] = useState<LatLng[]>([
    { latitude: 27.7172, longitude: 85.324 },
    { latitude: 27.72, longitude: 85.33 },
    { latitude: 27.725, longitude: 85.34 },
  ]);
  const [zoneCoords] = useState<LatLng[]>([
    { latitude: 27.715, longitude: 85.32 },
    { latitude: 27.718, longitude: 85.328 },
    { latitude: 27.712, longitude: 85.33 },
  ]);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const [roadCoordinates] = useState<LatLng[]>([
    { latitude: 27.7172, longitude: 85.324 },
    { latitude: 27.7190, longitude: 85.326 },
    { latitude: 27.7210, longitude: 85.327 },
    { latitude: 27.7230, longitude: 85.329 },
    { latitude: 27.7250, longitude: 85.332 },
    { latitude: 27.7265, longitude: 85.336 },
    { latitude: 27.7250, longitude: 85.340 },
  ]);
  const [currentRouteIndex, setCurrentRouteIndex] = useState<number>(0);

  const movingVehicleLocation = roadCoordinates[currentRouteIndex];
  const traveledPath = roadCoordinates.slice(0, currentRouteIndex + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRouteIndex((prevIndex) => {
        if (prevIndex >= roadCoordinates.length - 1) {
          return 0; // Loop back to the beginning
        }
        return prevIndex + 1;
      });
    }, 1000); // Moves every 1 second

    return () => clearInterval(interval);
  }, [roadCoordinates.length]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const onRegionChangeComplete = useCallback((newRegion: Region) => {
    setRegion(newRegion);
  }, []);

  const handleMapPress = useCallback((e: any) => {
    const coordinate = e.nativeEvent.coordinate as LatLng;
    setMarkers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        coordinate,
        title: `Marker ${prev.length + 1}`,
        color: 'red',
      },
    ]);
  }, []);

  const handleMarkerDragEnd = useCallback((id: string, coordinate: LatLng) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, coordinate } : m))
    );
  }, []);

  const removeMarker = useCallback((id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const animateToUserLocation = useCallback(() => {
    if (!userLocation || !mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      600
    );
  }, [userLocation]);

  const zoomIn = useCallback(() => {
    setRegion((prev) => {
      const next = {
        ...prev,
        latitudeDelta: prev.latitudeDelta / 2,
        longitudeDelta: prev.longitudeDelta / 2,
      };
      mapRef.current?.animateToRegion(next, 300);
      return next;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setRegion((prev) => {
      const next = {
        ...prev,
        latitudeDelta: prev.latitudeDelta * 2,
        longitudeDelta: prev.longitudeDelta * 2,
      };
      mapRef.current?.animateToRegion(next, 300);
      return next;
    });
  }, []);

  const toggleMapType = useCallback(() => {
    setMapType((prev) => {
      const order: MapType[] = ['standard', 'satellite', 'hybrid', 'terrain'];
      const nextIndex = (order.indexOf(prev) + 1) % order.length;
      return order[nextIndex];
    });
  }, []);

  const fitToAllMarkers = useCallback(() => {
    if (!mapRef.current || markers.length === 0) return;
    mapRef.current.fitToCoordinates(
      markers.map((m) => m.coordinate),
      {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      }
    );
  }, [markers]);

  return {
    mapRef,
    region,
    mapType,
    markers,
    routeCoords,
    zoneCoords,
    userLocation,
    movingVehicleLocation,
    traveledPath,
    onRegionChangeComplete,
    handleMapPress,
    handleMarkerDragEnd,
    removeMarker,
    animateToUserLocation,
    zoomIn,
    zoomOut,
    toggleMapType,
    fitToAllMarkers,
  };
}