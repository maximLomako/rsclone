import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpPost } from "../../utils";
import { BrowserRouter as Route, NavLink, useHistory } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
    let history = useHistory();
  const [fetchError, setFetchError] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData: FormValues = {
      email: data.email,
      password: data.password,
    };
    httpPost(`/auth/login`, updateData)
      .then((post) => {
        console.log(post)
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          history.push("/dashboard")
          setFetchError(false);
        } else {
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>Обязательное поле</p>
      )}
      <button className="login-submit" type="submit">
        Login
      </button>
      {fetchError ? <p>Неверный логин или пароль</p> : <></>}
    </form>
  );
};

export default LoginForm;
