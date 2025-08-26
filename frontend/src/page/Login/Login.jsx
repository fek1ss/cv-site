import { useState } from 'react';
import { login } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../hooks/useMessage';

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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
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
  );
};

export default Login;
