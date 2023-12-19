import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export const loginUser = async (tel: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: tel,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error during API call to login user:', error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { tel, password } = req.body;

    try {
      const data = await loginUser(tel, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
