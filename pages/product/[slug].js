// Страница отдельного товара
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  if (!product) {
    return <Layout title='Товар не найден '>Товар не найден</Layout>;
  }

  //Функция добавления товара в корзину
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug); //соотносим продукт с добавленным в корзину
    const quantity = existItem ? existItem.quantity + 1 : 1; //увеличиваем значение в красном кружке при повторном нажатии
    //получаем товары из mongobd
    const { data } = await axios.get(`/api/products/${product._id}`);

    //если количество товара закончилось, то предупредить пользователя об этом
    if (data.countInStock < quantity) {
      return toast.error("Извините, данный товар законился.", {
        autoClose: 2000,
      });
    }

    //Удаление лишних свойтв для помещения товаров в куки
    let productCart = {};
    Object.assign(productCart, product);
    Reflect.deleteProperty(productCart, "description");
    Reflect.deleteProperty(productCart, "category");
    Reflect.deleteProperty(productCart, "brand");
    Reflect.deleteProperty(productCart, "power");
    Reflect.deleteProperty(productCart, "connector");
    Reflect.deleteProperty(productCart, "cableLength");

    dispatch({ type: "CART_ADD_ITEM", payload: { ...productCart, quantity } });

    //после нажатия на кнопку добавить в корзину, автоматический переход на страницу Корзина
    router.push("/cart");
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
            priority
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
            <li>Описание: {product.description}</li>
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
