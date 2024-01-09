import { useState } from 'react';
import './custom.scss';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const { register, error } = useRegister();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the input values from the register hook
    await register(username, password, userType);
  };

  return (
    <>
        <div className="bg-dark vh-100 vw-100 justify-content-center">
          <div className="container d-flex flex-column align-items-center justify-content-center align-self-center">
            <label className="w-50 mt-5" />
            <form
              className="p-5 bg-light rounded-5 shadow-lg needs-validation w-75 h-50 bg-white rounded mt-2 mb-3 Registration"
              onSubmit={handleSubmit}
            >
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="custom-h1-style">Register</h1>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label mt-3 custom-label-headers-for-inputs"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Please enter a username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label custom-label-headers-for-inputs"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Please enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div id="passwordHelpBlock" className="form-text opacity-50">
                  Your password must be 8-20 characters long, contain letters
                  and numbers and special characters, and must not contain
                  spaces, or emojis.
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="userType"
                  className="form-label custom-label-headers-for-inputs"
                >
                  User Type
                </label>
                <select
                  id="userType"
                  className="form-select custom-form-select-register"
                  required
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                >
                  <option defaultValue={'What are you aiming to?'}>
                    What are you aiming to?
                  </option>
                  <option value="memeCreator">
                    A Meme Creator (Can create memes)
                  </option>
                  <option value="viewer">
                    A user (Can Explore memes)
                  </option>
                </select>
              </div>
              {error && (
                <div
                  className={
                    error.includes('error')
                      ? 'form-group text-success'
                      : 'form-group text-danger'
                  }
                >
                  <span>{error}</span>
                </div>
              )}
              <div className="d-flex justify-content-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary w-50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default RegisterPage;
