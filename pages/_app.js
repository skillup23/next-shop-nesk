import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

//проврка пользователя на аунтентификацию. Если нет, то запретить
//доступ к определенным страницам НазваниеОсновнойФункцииСтраницы.auth = true;
//указываем в конце страницы, пример shipping.js
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "загрузка") {
    return <div>Загрузка...</div>;
  }

  return children;
}

export default MyApp;
