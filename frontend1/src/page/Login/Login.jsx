import { useState } from 'react';
import { login } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../hooks/useMessage';
import styles from './styles.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { message, showMessage } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err) {
      showMessage(`Login failed ${err}`, true);
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <label>
          email:
          <input
            className={styles.login__inp}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label>
          password:
          <input
            className={styles.login__inp}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <button className={styles.login__btn} type="submit">
          Login
        </button>
        {message && (
          <p
            className={
              message.error ? 'error-message' : 'success-message'
            }
          >
            {message?.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
