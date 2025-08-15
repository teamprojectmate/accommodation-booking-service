import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/slices/authSlice";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      // ✅ Нова перевірка: Паролі повинні збігатися
      alert("Паролі не збігаються!");
      return;
    }

    // ✅ Оновлення: Відправляємо всі необхідні дані
    const resultAction = await dispatch(
      register({ firstName, lastName, email, password, repeatPassword }),
    );
    if (register.fulfilled.match(resultAction)) {
      navigate("/login"); // ✅ Після реєстрації перенаправляємо на сторінку входу
    }
  };

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Реєстрація</h1>
          <p className="text-xs-center">
            <a href="/login">Вже маєте акаунт?</a>
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Ім'я"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Прізвище"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="email"
                placeholder="Електронна пошта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Повторіть пароль"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={loading}
            >
              {loading ? "Завантаження..." : "Зареєструватися"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
