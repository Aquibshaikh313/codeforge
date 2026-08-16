import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();


  const [input, setInput] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput((values) => ({ ...values, [name]: value })); // that array basically passes text as "key" and value is value
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isRegistered = true;
    
    if(isRegistered){
      navigate("/dashboard");
    }else{
      navigate("/register");
    }

    console.log(input);
    
    setInput({
      login:"",
      password:"",
    });
  };

  return (

   <div>
    <h1>Login</h1>
     <form style={{ marginTop: "100px" }} onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Login: </label>
        <input
          type="text"
          name="login"
          value={input.login}
          onChange={handleChange}
          autoComplete="username"
            required
            placeholder="Email or Mobile number"
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          required
          placeholder="Enter a password"
        />
      </div>

      <button type="submit" className="border-2 border-solid border-white
       p-2.5">Login</button>
    </form>
   </div>
  );
};

export default Login;
