import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title='Авторизация'>
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className='mb-4 text-xl'>Авторизация</h1>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            {...register("email", {
              required: "Пожалуйста, укажите email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Пожалуйста, укажите корректный email",
              },
            })}
            className='w-full'
            id='email'
            autoFocus
          ></input>
          {errors.email && (
            <div className='text-red-500'>{errors.email.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Пароль</label>
          <input
            type='password'
            {...register("password", {
              required: "Пожалуйста, укажите свой пароль",
              minLength: {
                value: 8,
                message: "Пароль должен содержать минимум 8 знаков",
              },
            })}
            className='w-full'
            id='password'
            autoFocus
          ></input>
          {errors.password && (
            <div className='text-red-500'>{errors.password.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <button className='primary-button'>Вход</button>
        </div>
        <div className='mb-4'>
          У вас еще нет аккаунта?&nbsp;
          <Link href='register'>Зарегистрироваться</Link>
        </div>
      </form>
    </Layout>
  );
}
