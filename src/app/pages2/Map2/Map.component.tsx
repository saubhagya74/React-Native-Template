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
import { useMapLogic2 } from './Map.logic';
import { styles } from './Map.styles';

export function MapComponent2() {
  const {
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
  } = useMapLogic2();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={handleMapPress}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        showsScale
        toolbarEnabled={false}
        loadingEnabled
        rotateEnabled
        pitchEnabled
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            draggable
            onDragEnd={(e) => handleMarkerDragEnd(marker.id, e.nativeEvent.coordinate)}
            pinColor={marker.color}
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
          />
        )}

        {traveledPath.length > 1 && (
          <Polyline
            coordinates={traveledPath}
            strokeColor="#FF3B30"
            strokeWidth={5}
          />
        )}

        {movingVehicleLocation && (
          <Marker
            coordinate={movingVehicleLocation}
            anchor={{ x: 0.5, y: 0.5 }} // Centers target frame right on coordinates
          >
            <View style={styles.movingDot} />
          </Marker>
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
            radius={500}
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