import api from './api';

const inventoryService = {

  // Get all inventory records
  getAllInventory: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },

  // Get inventory by item id
  getInventoryByItemId: async (itemId) => {
    const response = await api.get(`/inventory/${itemId}`);
    return response.data;
  },

  // Create inventory record
  createInventory: async (inventoryData) => {
    const response = await api.post('/inventory', inventoryData);
    return response.data;
  },

  // Update stock quantity
  updateInventory: async (itemId, inventoryData) => {
    const response = await api.put(`/inventory/${itemId}`, inventoryData);
    return response.data;
  },

  // Delete inventory record
  deleteInventory: async (itemId) => {
    const response = await api.delete(`/inventory/${itemId}`);
    return response.data;
  },

};

export default inventoryService;