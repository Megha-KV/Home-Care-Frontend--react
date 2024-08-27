import  { useContext, useState } from 'react'; // Added import statement for React
import axios from 'axios';


import "./Login.css"
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';
const Register = () => {


    const { user,setUser } = useContext(UserContext);
    console.log(user);
  const [username, setUsername] = useState(''); // Changed 'email' to 'username'
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('employee');
  const handleLogin = async(e) => {

e.preventDefault()   
    try {
          if (!username || !password) { 
      alert('Please enter both username and password.'); 

    } 
    const response = await axios.post(`http://127.0.0.1:8000/api/user/`, {
        username: username,
        password: password,
        email: email,
        role: role
      })
    console.log(response.data);
    setUser(response.data);
    setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching data:', error.response.data.error);
      console.error('Error fetching data:', error.response.data?.username[0]);
      if(error.response.data?.username[0]){

        alert(error.response.data?.username[0]);
      }else{

        alert(error.response?.data?.error)
      }
    }

  };

  return (
    <div className="login-container">
      <div className="heading-section">
        <h1>AL BADARI FARMS</h1>
        <hr className="underline" />
      </div>
      {isLoggedIn ? (
        <h2>Welcome, {username}!</h2> // Changed 'email' to 'username'
      ) : (
        <form>
                 <label>
          Email:
        </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Username:</label>
          <input required
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="farm_manager">Farm manager</option>
            
          </select>
        </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Register
          </button>

          <Link to={"/login"}>Already have an account</Link>
             </form>
      )}
    </div>
  );
};

export default Register;