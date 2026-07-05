import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  connectionRow: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
  },
  actionButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  statusBadge: {
    fontSize: 13,
    fontWeight: '700',
  },
  connectedBadge: {
    color: '#2E7D32',
  },
  disconnectedBadge: {
    color: '#999',
  },
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  statusText: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },
  listContainer: {
    alignSelf: 'stretch',
    marginTop: 8,
    gap: 8,
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  rowId: {
    fontWeight: '700',
    color: '#007AFF',
  },
  rowMessage: {
    flexShrink: 1,
  },
  emptyText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
});