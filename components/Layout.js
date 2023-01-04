import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdowmLink from "./DropdowmLink";
import Cookies from "js-cookie";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Все товары из корзины добавленны в Cookies и при рендере страниц с Layout выходит ошибка,
  // так как Cookies прогружаются после js на странице. Для избежания этого добавляем useEffect,
  // который добавляет товары из Cookies в стейт, а он далее, после рендера js отображаются в красном кружке у Корзины
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  //Выход пользователя и удаление товара из корзины
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>
          {title ? title + "- Интернет-магазин" : "Интернет-магазин"}
        </title>
        <meta name='description' content='Интернет-магазин для Нэска' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer position='bottom-center' limit={1} />

      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 items-center px-4 justify-between shadow-md'>
            <Link href='/' className='text-lg font-bold'>
              Интернет-магазин
            </Link>
            <div>
              <Link href='/cart' className='p-2'>
                Корзина
                {cartItemsCount > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Загрузка"
              ) : session?.user ? (
                <Menu as='div' className='relative inline-block'>
                  <Menu.Button className='text-blue-600'>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className='absolute right-0 w-56 bg-white origin-top-right shadow-lg'>
                    <Menu.Item>
                      <DropdowmLink className='dropdown-link' href='/profile'>
                        Профиль
                      </DropdowmLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdowmLink
                        className='dropdown-link'
                        href='/order-history'
                      >
                        История заказов
                      </DropdowmLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className='dropdown-link'
                        href='#'
                        onClick={logoutClickHandler}
                      >
                        Выход
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href='/login' className='p-2'>
                  Вход
                </Link>
              )}
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
