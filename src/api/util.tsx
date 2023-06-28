import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import { ISort } from '@/types/table';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const API_BASE_URL =
  publicRuntimeConfig?.restApiBaseUrl ?? serverRuntimeConfig?.restApiBaseUrl;

export const requestApi = async (
  method: string,
  url: string,
  data?: any,
  headers?: any,
) => {
  const response = await axios({
    method,
    url: `${API_BASE_URL}/${url}`,
    data,
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).catch((error) => {
    switch (error.response.status) {
      case 401:
        if (process.browser) Router.push('/login');
        break;
    }
    throw error;
  });

  return response;
};

export const requestMockupApi = async (method: string, data?: any) => {
  if (!localStorage.getItem('token')) {
    if (process.browser) Router.push('/login');
  }
  if (method !== 'GET') {
    alert(JSON.stringify(data));
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 100);
  });
};

export const getFilteredData = (data: any[], keyword?: string) => {
  if (!keyword) {
    return data;
  } else {
    return data?.filter(
      (item) =>
        item.name?.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.email?.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.contents?.toLowerCase().includes(keyword?.toLowerCase()) ||
        item.description?.toLowerCase().includes(keyword?.toLowerCase()),
    );
  }
};

export const getSortedData = (data: any[], sort?: ISort) => {
  if (!sort) {
    return data;
  } else {
    return data?.sort((a, b) => {
      if (sort.order === 'asc') {
        if (a[sort.key] < b[sort.key]) {
          return -1;
        } else if (a[sort.key] > b[sort.key]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[sort.key] < b[sort.key]) {
          return 1;
        } else if (a[sort.key] > b[sort.key]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }
};

export const getPagedData = (data: any[], page?: number, pageSize?: number) => {
  if (page === undefined || pageSize === undefined) {
    return data;
  } else {
    const startIndex = page * pageSize;

    return data?.slice(startIndex, startIndex + pageSize);
  }
};
