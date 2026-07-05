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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  listContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
    gap: 8,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
  },
  fileName: {
    fontSize: 14,
    flexShrink: 1,
    marginRight: 8,
  },
  fileSize: {
    fontSize: 12,
    color: '#888',
  },
  deleteText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
});