import queryString from 'query-string';
import api from './ApiService';

export interface IGetPatientNameAutoCompleteRequest {
  query: {
    searchText: string;
  };
}

export interface IGetPatientNameAutoCompleteResponse {
  patients: Array<{ id: string; fullName: string }>;
}

export const getPatientNameAutoComplete = async ({
  query,
}: IGetPatientNameAutoCompleteRequest): Promise<IGetPatientNameAutoCompleteResponse> => {
  const queryParams = {
    searchText: query.searchText,
  };
  const queries = queryString.stringify(queryParams);
  const response = await api.get(`/patients?${queries}`);
  return response.data;
};
