import "../styles/globals.css";
import App from "next/app";

function MyApp({ Component, pageProps, envTestVar, initialPropsENVURL }) {
  // 서버에서 가져온 환경변수로 클라이언트 값을 동적으로 변경하는 것은 불가능
  // NEXT_PUBLIC_접두사가 붙은 환경변수를 다르게 사용하고 싶다면, 이는 빌드 시점에 결정되도록,
  // 별도의 빌드 스크립트를 두어야한다.
  const clientENVURL =
    process.env.CUSTOM_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD;

  return (
    <div>
      <span style={{ color: "red" }}>{envTestVar}</span>
      <span style={{ color: "blue" }}>{clientENVURL}</span>
      <span style={{ color: "green" }}>{initialPropsENVURL}</span>
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const envTestVar =
    process.env.CUSTOM_ENV === "development"
      ? process.env.API_URL_DEV
      : process.env.API_URL_PROD;

  // 서버에서 가져온 환경변수로 클라이언트 값을 동적으로 결정하여 넘겨주기
  const initialPropsENVURL =
    process.env.CUSTOM_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD;

  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, envTestVar, initialPropsENVURL };
};

export default MyApp;
