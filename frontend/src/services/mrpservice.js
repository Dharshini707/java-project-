import api from './api';

const mrpService = {

  // Trigger MRP explosion — core feature
  // sends productId + targetQuantity
  // returns list of components with gross req, on-hand, net req
  explodeBOM: async (productId, targetQuantity) => {
    const response = await api.post('/mrp/explode', {
      productId,
      targetQuantity,
    });
    return response.data;
  },

  // Get all auto-generated purchase orders
  getPurchaseOrders: async () => {
    const response = await api.get('/mrp/purchase-orders');
    return response.data;
  },

  // Approve a purchase order
  approvePurchaseOrder: async (poId) => {
    const response = await api.put(`/mrp/purchase-orders/${poId}/approve`);
    return response.data;
  },

};

export default mrpService;