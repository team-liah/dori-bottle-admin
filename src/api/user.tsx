import { questions, reports, users } from './MockupData';
import {
  getFilteredData,
  getPagedData,
  getSortedData,
  requestMockupApi,
} from './util';
import { ISort } from '@/types/table';

export const getUsers = async (
  keyword?: string,
  page?: number,
  size?: number,
  sort?: ISort,
) => {
  // const response = await requestMockupApi('GET', `api/admin/users?page=${page}&size=${size}&sort=${sort.key},${sort.order}`);
  const response: any = await requestMockupApi(
    'GET',
    getPagedData(
      getSortedData(getFilteredData(users, keyword), sort),
      page,
      size,
    ),
  );

  return response.data;
};

export const getUser = async (id: string) => {
  const response: any = await requestMockupApi(
    'GET',
    users.find((user) => user.id === Number(id)),
  );

  return response.data;
};

export const createUser = async (data: any) => {
  const response: any = await requestMockupApi('POST', data);

  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response: any = await requestMockupApi('PUT', { id, data });

  return response.data;
};

export const deleteUsers = async (ids: string[]) => {
  const promises = ids.map(async (id) => {
    const response: any = await requestMockupApi('DELETE', id);

    return response.data;
  });
  await Promise.all(promises);
};

export const getQuestions = async (
  keyword: string,
  page: number,
  size: number,
  sort: ISort,
) => {
  const response: any = await requestMockupApi(
    'GET',
    getPagedData(
      getSortedData(getFilteredData(questions, keyword), sort),
      page,
      size,
    ),
  );

  return response.data;
};

export const getQuestion = async (id: string) => {
  const response: any = await requestMockupApi(
    'GET',
    questions.find((question) => question.id === Number(id)),
  );

  return response.data;
};

export const createQuestion = async (data: any) => {
  const response: any = await requestMockupApi('POST', data);

  return response.data;
};

export const updateQuestion = async (id: string, data: any) => {
  const response: any = await requestMockupApi('PUT', { id, data });

  return response.data;
};

export const deleteQuestions = async (ids: string[]) => {
  const promises = ids.map(async (id) => {
    const response: any = await requestMockupApi('DELETE', id);

    return response.data;
  });
  await Promise.all(promises);
};

export const getReports = async (
  keyword: string,
  page: number,
  size: number,
  sort: ISort,
) => {
  const response: any = await requestMockupApi(
    'GET',
    getPagedData(
      getSortedData(getFilteredData(reports, keyword), sort),
      page,
      size,
    ),
  );

  return response.data;
};

export const getReport = async (id: string) => {
  const response: any = await requestMockupApi(
    'GET',
    reports.find((report) => report.id === Number(id)),
  );

  return response.data;
};

export const createReport = async (data: any) => {
  const response: any = await requestMockupApi('POST', data);

  return response.data;
};

export const updateReport = async (id: string, data: any) => {
  const response: any = await requestMockupApi('PUT', { id, data });

  return response.data;
};

export const deleteReports = async (ids: string[]) => {
  const promises = ids.map(async (id) => {
    const response: any = await requestMockupApi('DELETE', id);

    return response.data;
  });
  await Promise.all(promises);
};
