import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MapView, {
    Callout,
    Circle,
    Marker,
    Polygon,
    Polyline,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useMapLogic } from './Map.logic';
import { styles } from './Map.styles';

export function MapComponent() {
  const {
    mapRef,
    region,
    mapType,
    markers,
    routeCoords,
    zoneCoords,
    userLocation,
    onRegionChangeComplete,
    handleMapPress,
    handleMarkerDragEnd,
    removeMarker,
    animateToUserLocation,
    zoomIn,
    zoomOut,
    toggleMapType,
    fitToAllMarkers,
  } = useMapLogic();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Forces Google Maps on both iOS/Android (optional)
        mapType={mapType} // 'standard' | 'satellite' | 'hybrid' | 'terrain'
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete} // fires after user pans/zooms
        onPress={handleMapPress} // tap anywhere to drop a marker
        showsUserLocation // blue dot (needs location permission)
        showsMyLocationButton={false} // we build our own button instead
        showsCompass
        showsScale
        toolbarEnabled={false} // Android "open in google maps" toolbar
        loadingEnabled // shows spinner while tiles load
        rotateEnabled
        pitchEnabled // allows 3D tilt gesture
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            draggable // long-press + drag to reposition
            onDragEnd={(e) => handleMarkerDragEnd(marker.id, e.nativeEvent.coordinate)}
            pinColor={marker.color} // simple color pin
          >
            <Callout onPress={() => removeMarker(marker.id)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text style={styles.calloutText}>Tap to remove</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {routeCoords.length > 1 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#007AFF"
            strokeWidth={4}
            lineDashPattern={[0]} // solid line; try [4, 4] for dashed
          />
        )}

        {zoneCoords.length > 2 && (
          <Polygon
            coordinates={zoneCoords}
            fillColor="rgba(0,122,255,0.15)"
            strokeColor="rgba(0,122,255,0.6)"
            strokeWidth={2}
          />
        )}

        {userLocation && (
          <Circle
            center={userLocation}
            radius={500} // meters
            fillColor="rgba(255,59,48,0.1)"
            strokeColor="rgba(255,59,48,0.4)"
          />
        )}
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={zoomIn}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
          <Text style={styles.controlText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={animateToUserLocation}>
          <Text style={styles.controlText}>◎</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleMapType}>
          <Text style={styles.controlText}>🗺️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={fitToAllMarkers}>
          <Text style={styles.controlText}>⤢</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}