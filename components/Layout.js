import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utils/Store";

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>
          {title ? title + "- Интернет-магазин" : "Интернет-магазин"}
        </title>
        <meta name='description' content='Интернет-магазин для Нэска' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
            <Link href='/' className='text-lg font-bold'>
              Интернет-магазин
            </Link>
            <div>
              <Link href='/card' className='p-2'>
                Товары
                {cart.cartItems.length > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    {/*Добавляем значение количества товаров в красном кружке в Хедере */}
                  </span>
                )}
              </Link>
              <Link href='/login' className='p-2'>
                Вход
              </Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
          <p>Copyright © 2022 Интернет-магазин</p>
        </footer>
      </div>
    </>
  );
}
