//Страница Недостаточно прав для неавторизоанных пользователей
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title='Страница без авторизации '>
      <h1 className='text-xl'>Недостаточно прав для этой страницы</h1>
      {message && <div className='mb-4 text-red-500'>{message}</div>}
    </Layout>
  );
}
