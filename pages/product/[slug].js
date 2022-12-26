import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Товар не найден</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug); //соотносим продукт с добавленным в корзину
    const quantity = existItem ? existItem.quantity + 1 : 1; //увеличиваем значение в красном кружке при повторном нажатии

    //если количество товара закончилось, то предупредить пользователя об этом
    if (product.countInStock < quantity) {
      alert("Извините, данный товар законился.");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/'>Вернуться на Главную</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            responsive
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Категория: {product.category}</li>
            <li>Производитель: {product.brand}</li>
            <li>Мощность зарядки: {product.power}</li>
            <li>Длина зарядного кабеля, м: {product.cableLength}</li>
            <li>Разъём: {product.connector}</li>
            <li>Описание: {product.descriotion}</li>
          </ul>
        </div>
        <div>
          <div className='card p-5'>
            <div className='mb-2 flex justify-between'>
              <div>Стоимость</div>
              <div>{product.price}₽</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>В наличии</div>
              <div>{product.countInStock > 0 ? "имеется" : "отсутствует"}</div>
            </div>
            <button
              className='primary-button w-full'
              onClick={addToCartHandler} //добавляем товар в корзину
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}