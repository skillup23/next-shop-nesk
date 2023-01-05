//Страница Адрес доставки. Защищена Антентификацией
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("city", shippingAddress.city);
    setValue("street", shippingAddress.street);
    setValue("house", shippingAddress.house);
    setValue("postalCode", shippingAddress.postalCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, city, street, house, postalCode }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, city, street, house, postalCode },
    });
    //Сохраненние введеных данных при переезгрузке страницы
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          city,
          street,
          house,
          postalCode,
        },
      })
    );

    //Переход после нажатия на кнопку Далее
    router.push("/payment");
  };

  return (
    <Layout title='Адрес доставки '>
      <CheckoutWizard activeStep={1} />
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className='mb-4 text-xl'>Адресс доставки</h1>
        <div className='mb-4'>
          <label htmlFor='fullName'>ФИО</label>
          <input
            className='w-full'
            id='fullName'
            autoFocus
            {...register("fullName", {
              required: "Пожалуйста, введите ФИО полностью",
            })}
          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='city'>Город</label>
          <input
            className='w-full'
            id='city'
            autoFocus
            {...register("city", {
              required: "Пожалуйста, укажите Город",
            })}
          />
          {errors.city && (
            <div className='text-red-500'>{errors.city.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='street'>Улица</label>
          <input
            className='w-full'
            id='street'
            autoFocus
            {...register("street", {
              required: "Пожалуйста, укажите улицу",
              minLength: { value: 3, message: "Укажите точный адрес доставки" },
            })}
          />
          {errors.street && (
            <div className='text-red-500'>{errors.street.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='house'>Дом, подъезд, квартира</label>
          <input
            className='w-full'
            id='house'
            autoFocus
            {...register("house", {
              required: "Пожалуйста, укажите номер дома",
            })}
          />
          {errors.house && (
            <div className='text-red-500'>{errors.house.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='postalCode'>Индекс</label>
          <input
            className='w-full'
            id='postalCode'
            autoFocus
            {...register("postalCode", {
              required: "Пожалуйста, укажите индекс",
            })}
          />
          {errors.postalCode && (
            <div className='text-red-500'>{errors.postalCode.message}</div>
          )}
        </div>
        <div className='mb-4 flex justify-between'>
          <button className='primary-button'>Далее</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
