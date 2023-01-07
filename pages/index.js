import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  //Функция добавления товара в корзину
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug); //соотносим продукт с добавленным в корзину
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

    toast.success("Товар добален в корзину.", { autoClose: 500 });
  };

  return (
    <Layout title='Главная страница '>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

//получаем товары из mongobd
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
