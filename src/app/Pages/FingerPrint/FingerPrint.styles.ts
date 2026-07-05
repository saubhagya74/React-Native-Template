import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: '#555',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
  },
  successText: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: '700',
  },
  warningText: {
    fontSize: 12,
    color: '#888',
  },
});