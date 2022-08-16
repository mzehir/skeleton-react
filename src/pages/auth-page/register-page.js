import React from "react";
import AuthUseContext from "../../hooks/auth-use-context";

const RegisterPage = () => {
  const { signUp } = AuthUseContext();

  const onSubmit = (e) => {
    e.preventDefault();

    let data = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    signUp(data, () => {
      alert("Click on the account verification link sent to your mailbox.");
    });
  };
  return (
    <div>
      <h5>Register Page</h5>
      <form onSubmit={onSubmit}>
        <p>
          Name: <input type="text" name="name" />
        </p>
        <p>
          Surname: <input type="text" name="surname" />
        </p>
        <p>
          Email: <input type="email" name="email" />
        </p>
        <p>
          Password <input type="text" name="password" />
        </p>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
