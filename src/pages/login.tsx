import { Verified } from 'lucide-react';
import GradientBg from '@/components/page/login/gradient-bg';
import LoginForm from '@/components/page/login/login-form';

const LoginPage = () => {
  return (
    <div className="items-centerw-full flex min-h-screen bg-white">
      <div className={'relative hidden w-1/2 lg:block'}>
        <GradientBg className="absolute left-0 top-0 h-full w-full" />
        <img
          src="/logo.png"
          className="absolute left-5 top-5 h-10 w-10"
          alt="logo"
        />
        <div className="absolute bottom-5 left-5 inline-flex items-center gap-1 rounded-lg border-2 border-white px-3 py-2 font-semibold text-white">
          <Verified width={18} height={18} />
          PURPLE ADMIN UI
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="relative flex h-full items-center justify-center">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 sm:px-0 md:w-3/6 lg:w-4/6 xl:w-3/6">
            {/* {!process.env.NEXT_PUBLIC_API_ENDPOINT ? (
              <Alert
                message="환경변수 설정 오류"
                description={
                  <span>
                    .env.example 파일을 복사하여 .env 파일을 생성해주세요.{" "}
                    <a
                      href="https://github.com/purpleio/purple-admin-ui#%EA%B8%B0%EB%B3%B8-%EC%84%A4%EC%A0%95"
                      target="_blank"
                      rel="noreferrer"
                    >
                      참고 링크
                    </a>
                  </span>
                }
                type="error"
                showIcon
                className="my-10"
              />
            ) : null} */}
            <div className="mt-8 flex flex-col items-center justify-center px-2 sm:mt-0">
              <h2 className="inter mt-2 text-5xl font-bold leading-tight">
                DORI BOTTLE
              </h2>
              <div className="mt-1 text-lg text-gray-400">Admin System</div>
            </div>

            <div className="mt-12 w-full px-2 sm:px-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
