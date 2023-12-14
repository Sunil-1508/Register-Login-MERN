import React , {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [data,setData] = useState({
    username:'',
    email:'',
    password:''
  })

  const navigate =useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.username === '' || data.email === '' || data.password === '') {
      window.alert("Please Enter All Details.");
    } else {
      try {
        const response = await axios.post('https://register-login-mern-cqub-k1vru1lbm-sunil-noolus-projects.vercel.app/post', data);
        console.log('Request sent:', response.data);
        window.alert('Registered Successfully');
        navigate('/'); 
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.error || 'Unknown error');
        window.alert('Username Already Exists!!!');
      }
    }
  };

  
  return (
    <div className='vh-100 bg-secondary d-flex flex-column align-items-center justify-content-center'>
      <h3>Please Register !!!</h3>
      <div className='h-50 bg-dark text-white rounded p-5'>
        <form className='form form-striped px-2' onSubmit={submitHandler}>
          <div className='mb-3'>
          <label htmlFor='user'>Username</label>
          <input type='text' className='form-control' name='username' id='user' placeholder='Enter username' 
          onChange={(e)=>setData({...data, username:e.target.value})}/>
          </div>
          <div className='mb-3'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-control' name='email' id='email' placeholder='Enter email' 
          onChange={(e)=>setData({...data, email:e.target.value})}/>
          </div>
          <div className='mb-3'>
          <label htmlFor='pass'>Password</label>
          <input type='password' className='form-control' name='password' id='pass' placeholder='Enter password' 
          onChange={(e)=>setData({...data, password:e.target.value})}/>
          </div>
          <div className='ps-3'>
          <input type='submit' className='btn btn-success me-1' value='Register' />or 
          <button className='btn btn-danger ms-1' onClick={()=>navigate('/')} >Back</button>          
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default Register
