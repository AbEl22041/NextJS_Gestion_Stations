import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export const loginUser = async (telephone: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      telephone,
      password,
    }, {
      withCredentials: true
    });

    return response;
  } catch (error) {
    console.error('Error during API call to login user:', error);
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { telephone, password } = req.body;

    try {
      const response = await loginUser(telephone, password);
      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        res.setHeader('Set-Cookie', setCookieHeader);
      }

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        res.status(error.response.status).json({ message: error.response.data });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
