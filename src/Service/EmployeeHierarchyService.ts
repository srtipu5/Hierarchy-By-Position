import axios from 'axios';
import { EmployeeHierarchy } from '../Type/EmployeeHierarchy';

const baseURL = process.env.SERVER_BASE_URL;

export const fetchDataFromAnotherApi = async (id: number): Promise<EmployeeHierarchy[] | null> => {
  try {
    const response = await axios.get(`${baseURL}/api/employee?id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error on fetching data:', error);
    throw error; 
  }
};
