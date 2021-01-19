import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpPost } from "../../utils";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [fetchError, setFetchError] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData: FormValues = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    httpPost(`auth/registration/`, updateData)
      .then((post) => {
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          setFetchError(false);
        } else {
          setFetchError(true);
        }
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
        <p>required</p>
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
        <p>required</p>
      )}
      {errors.password?.type === "minLength" && "Your input exceed minLength"}
      <button className="sign-in-submit" type="submit">
        Registration
      </button>
      {fetchError ? <p>name busy</p> : <></>}
    </form>
  );
};

export default RegistrationForm;
