import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpPost } from "../../utils";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [fetchError, setFetchError] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData:FormValues = {
      email: data.email,
      password: data.password,
    };
    httpPost(`login/`, updateData)
      .then(() => {
        console.log("login")
      })
      .catch(() => setFetchError(true));
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Электронный адрес"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && errors.email.type === "required" && (
        <p>Обязательное поле</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>Введите правильный электронный адрес</p>
      )}
      <input
        type="password"
        placeholder="Пароль"
        name="password"
        ref={register({
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=\w*[0-9])\w{9,16}$/,
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>Обязательное поле</p>
      )}
      <button className="sign-in-submit" type="submit">
        Войти
      </button>
      {fetchError ? <p>Неверный логин или пароль</p> : <></>}
    </form>
  );
};

export default LoginForm;
