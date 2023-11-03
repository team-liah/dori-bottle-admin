/**
 * 백오피스 특성상 기본적으로 인증 필요
 * 인증된 사용자 정보를 얻거나 로그인 페이지로 이동
 */
import React, { PropsWithChildren, createContext, useContext } from 'react';
import { IAdmin } from '@/client/admin';
import { useProfile } from '@/client/auth';

interface IAuthProviderProps {}

interface IAuthContext {
  initialized: boolean;
  profile?: IAdmin;
  mutateProfile?: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error('Auth context must be used within a AuthProvider!');
  }

  return result;
}

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const { data: profile, mutate } = useProfile();

  const handleMutate = async () => {
    await mutate();
  };

  return (
    <AuthContext.Provider
      value={{ initialized: true, profile, mutateProfile: handleMutate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
