import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Товар не найден</div>;
  }
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
            <button className='primary-button w-full'>
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
