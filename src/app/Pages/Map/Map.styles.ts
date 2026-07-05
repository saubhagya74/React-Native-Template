import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // map fills the entire parent
  },
  controls: {
    position: 'absolute',
    right: 16,
    bottom: 40,
    gap: 10,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
  },
  callout: {
    minWidth: 140,
    padding: 8,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  calloutText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  customPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
});