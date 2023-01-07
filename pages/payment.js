import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  //Достаем сохранненную информацию по действующему заказу
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    //если не выбран способ оплаты вывести попап
    if (!selectedPaymentMethod) {
      return toast.error("Выберите способ оплаты", { autoClose: 2000 });
    }
    //отправка информации в заказ
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    //сохранение выбранного спопоба оплаты в куки
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    //переход на страницу Подтверждения заказа
    router.push("/placeorder");
  };

  useEffect(() => {
    //если адрес на предыдущей странице не заполнен, то вернуться на страницу назад
    if (!shippingAddress) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress]);

  return (
    <Layout title='Способ оплаты '>
      <CheckoutWizard activeStep={2} />
      <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
        <h1 className='mb-4 text-xl'>Способ оплаты</h1>
        {["SberPay", "Оплата при получении", "Самовывоз"].map((payment) => (
          <div key={payment} className='mb-4'>
            <input
              name='paymentMethod'
              className='p-2 outline-none focus:ring-0'
              id={payment}
              type='radio'
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className='p-2' htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className='mb-4 flex justify-between'>
          <button
            onClick={() => router.push("/shipping")}
            type='button'
            className='default-button'
          >
            Назад
          </button>
          <button className='primary-button'>Далее</button>
        </div>
      </form>
    </Layout>
  );
}
