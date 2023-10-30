import Router from 'next/router';
import useSWR from 'swr';
import { IAdmin } from './admin';
import { fetchApi } from './base';

export const useProfile = () => {
  return useSWR<IAdmin>('/api/account/profile', {
    revalidateOnFocus: false,
    errorRetryCount: 0,
  });
};

export const login = async (loginId: string, loginPassword: string) => {
  const res = await fetchApi.post('/api/account/auth', {
    body: JSON.stringify({ loginId, loginPassword }),
  });
  Router.push('/');
};

export const logout = async () => await fetchApi.post('/api/account/logout');
