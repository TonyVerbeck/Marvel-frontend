import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        email: email,
        password: password,
      });
      handleToken(response.data.token);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Se connecter</h2>
      <form className="form-signup" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <div>
          <input className="btn-valid" type="submit" value="Se connecter" />
        </div>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <p className="lien-login">
            Tu veux combattre des méchants ? Inscris-toi !
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
