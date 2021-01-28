import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { httpPost } from "../../utils";
import { setUserInfoAC } from "../../redux/auth-reducer";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormValues>();
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData: FormValues = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    httpPost(`/auth/registration`, updateData)
      .then((post) => {
        dispatch(setUserInfoAC(post));
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          history.push("/");
          setFetchError(false);
        } else {
          setFetchError(true);
        }
        console.log(post)
      })
      .catch(() => setFetchError(true));
  };
  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({ required: true })}
      />
      {errors.username && errors.username.type === "required" && (
        <p>Required field</p>
      )}
      <input
        type="email"
        placeholder="Email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && errors.email.type === "required" && <p>required</p>}
      {errors.email && errors.email.type === "pattern" && <p>Incorect email</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          minLength: {
            value: 3,
            message: "password must been more then 3 char",
          },
          required: "error message",
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>Required field</p>
      )}
      {errors.password?.type === "minLength" && "Your input exceed minLength"}
      <button className="login-submit" type="submit">
        Registration
      </button>
      {fetchError ? <p>Name busy</p> : <></>}
    </form>
  );
};

export default RegistrationForm;
