import axios from '@/lib/axios'; // Usa tu instancia o axios directamente

export const getAllMemberships = async () => {
  const response = await axios.get('/memberships');
  return response.data.data; // 👈 importante: solo devolvemos el array
};


export const addMembershipApi = (data) => {
  return axios.post('/memberships', data)
}