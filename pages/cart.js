// Страница корзины товаров
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  //Функция удаления товара из Корзины
  const removeItemHadler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  //Функция изменения количества товара
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Извините, данный товар законился.", {
        autoClose: 2000,
      });
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Товар добален в корзину.", { autoClose: 500 });
  };

  return (
    <Layout title='Корзина '>
      <h1 className='mb-4 text-xl'>Корзина</h1>
      {cartItems.length === 0 ? (
        <div>
          Корзина пуста. <Link href='/'>Вернуться к покупкам</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Товар</th>
                  <th className='p-5 text-right'>Количество</th>
                  <th className='p-5 text-right'>Цена</th>
                  <th className='p-5'>Действие</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className='border-b'>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className='p-5 text-right'>
                      {/*Изменение количества товара*/}
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {/*Создание массива со значениями из остатков товара*/}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-5 text-right'>{item.price} ₽</td>
                    <td className='p-5 text-center'>
                      <button onClick={() => removeItemHadler(item)}>
                        <XCircleIcon className='h-5 w-5'></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card p-5'>
            <ul>
              <li>
                {/*Ниже функции подсчета Итого в Корзине*/}
                <div className='pb-3 text-xl'>
                  Итого ( {cartItems.reduce((a, c) => a + c.quantity, 0)} ) :{" "}
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} ₽
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className='primary-button w-full'
                >
                  Оформить заказ
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Отключение динамического рендера на стороне сервера. Странице Корзина это не к чему,
//так же решается проблема Cookies и товаров там
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
