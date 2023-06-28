import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import background from '../../public/images/background.png';
import { login } from '@/api/auth';

//#region Styled Component

const Container = tw.div`
  relative flex flex-col items-center justify-center h-screen bg-[#1A1A1A] gap-4`;

const Background = tw(Image)`
  absolute w-full h-full`;

const Dimmed = tw.div`
  absolute w-full h-full bg-[#000000] opacity-70`;

const LogoContainer = tw.div`
  flex flex-col relative items-center justify-center mb-7 gap-2`;

const LoginContainer = tw.div`
  flex flex-col relative items-center justify-center gap-2`;

const Title = tw.div`
  text-[40px] leading-[1.2] font-extrabold text-[#F0F0F0]`;

const Subtitle = tw.div`
  text-[20px] leading-[0] font-[300] text-[#F0F0F0]`;

const InputContainer = tw.div`
  flex flex-col relative items-center justify-center gap-2`;

const Input = tw.input<{ $error?: boolean }>`
  w-[300px] h-[50px] rounded-[4px] text-[#F0F0F0] bg-[transparent] border boder-solid border-white px-4 py-3 focus:bg-white focus:text-[#1A1A1A] ${(
    props,
  ) => props.$error && 'border-red'}}`;

const ErrorText = tw.div`
  text-sm text-red w-full absolute bottom-[-30px]`;

const Button = tw.button`
  w-[300px] h-[50px] relative rounded-[4px] text-[#F0F0F0] bg-primary font-extrabold mt-8 disabled:opacity-70`;

//#endregion

const Login = () => {
  const router = useRouter();
  const [useName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(useName, password);
      router.push('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Container>
      <Background src={background} alt="background" />
      <Dimmed />
      <LogoContainer>
        <Image alt="logo" src={'/images/logo.png'} width={50} height={50} />
        <Title>Dori Bottle</Title>
        <Subtitle>ADMIN</Subtitle>
      </LogoContainer>
      <form onSubmit={handleLogin}>
        <LoginContainer>
          <Input
            $error={error}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputContainer>
            <Input
              $error={error}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <ErrorText>아이디 또는 비밀번호가 일치하지 않습니다.</ErrorText>
            )}
          </InputContainer>
          <Button disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
        </LoginContainer>
      </form>
    </Container>
  );
};

export default Login;
