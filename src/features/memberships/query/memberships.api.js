import axios from '@/lib/axios'; // Usa tu instancia o axios directamente

export const getAllMemberships = async () => {
  const response = await axios.get('/memberships');
  return response.data.data; // 👈 importante: solo devolvemos el array
};


export const addMembershipApi = (data) => {
  return axios.post('/memberships', data)
}

export const getAllMembershipsClients = async (search = '') => {
  const response = await axios.get('/memberships-clients',  {
    params: search ? { search } : {},
  });
  return response.data;
};


export const deleteMembershipApi = (id) => {
  return axios.delete(`/memberships-client/${id}`)
}
