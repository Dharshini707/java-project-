import api from './api';

const bomService = {

  // Get all BOM links
  getAllBOMLinks: async () => {
    const response = await api.get('/bom');
    return response.data;
  },

  // Get BOM links by parent item id
  getBOMByParentId: async (parentId) => {
    const response = await api.get(`/bom/parent/${parentId}`);
    return response.data;
  },

  // Create new BOM link (parent → child with quantity)
  createBOMLink: async (bomData) => {
    const response = await api.post('/bom', bomData);
    return response.data;
  },

  // Update BOM link
  updateBOMLink: async (id, bomData) => {
    const response = await api.put(`/bom/${id}`, bomData);
    return response.data;
  },

  // Delete BOM link
  deleteBOMLink: async (id) => {
    const response = await api.delete(`/bom/${id}`);
    return response.data;
  },

};

export default bomService;