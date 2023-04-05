import { useDispatch } from 'react-redux';
import { register } from 'redux/users/userApi';
import '../LoginForm/styles.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
  };

  return (
    <div className="form__area">
      <div className="content">
        <div className="text">Registration Form</div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="field">
            <input type="text" name="name" required />
            <span className="fas fa-user"></span>
            <label>Name</label>
          </div>
          <div className="field">
            <input type="text" name="email" required />
            <span className="fas fa-user"></span>
            <label>Email</label>
          </div>
          <div className="field">
            <input type="password" name="password" required />
            <span className="fas fa-lock"></span>
            <label>Password</label>
          </div>
          <div className="forgot-pass">
            <a href="/register">Forgot Password?</a>
          </div>
          <button type="submit" className="login__btn">
            Sign in
          </button>
          <div className="sign-up">
            Not a member?
            <a href="/register">signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
};
