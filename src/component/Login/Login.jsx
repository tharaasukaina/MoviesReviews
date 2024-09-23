import React, { useState } from 'react'
import Joi, { allow } from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({setUserData}) {
  console.log(setUserData)
  let [user, setUser] = useState({

    email: '',
    password: '',
  })
  let navigate = useNavigate();
  function gotohome() {
    let path = '/home'
    navigate(path);
  }
  let [errorList, setErrorListt] = useState([])// رح تكون اريه لانو ممكن يكون في اكثر من ايرور 
  let [errorMsg, seterrormsg] = useState('') // هاد المتغير خاص بالايرور اللي جاي من الباك اند 
  let [loading, setLoding] = useState(false)

  async function SubmitForm(e) {
    e.preventDefault();
    setLoding(true)
    let { data } = await axios.post("http://localhost:3000/api/v1/users/Signin", user)
    if (data.message == 'Done') {
      setLoding(false)
      localStorage.setItem('token',data.token);
      gotohome();
      
      } else {
        seterrormsg(data.message)
        setLoding(false)
      }
      let validateResult = validateForm();
      if (validateResult.error) {
        setErrorListt(validateResult.error.details)
        setLoding(false)
      }
    }
    function getFormValue(e) {
      let myUser = { ...user }
      myUser[e.target.name] = e.target.value;
      setUser(myUser);

    }
    function validateForm() {
      const schema = Joi.object({

        email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required().pattern(new RegExp('^[a-z][A-Z][0-9]{4}$')).messages({
          'string.pattern.base': 'Password must start with a lowercase letter, followed by an uppercase letter, and end with exactly ten digits.'
        })

      });
      return schema.validate(user, { abortEarly: false });//الابورت ليرلي عشان سطبع كل الايرورز مش بس اول واحد 

    }

    return (
      <>
        <h1>Login Form </h1>
        <form onSubmit={SubmitForm}>
          {errorList.map((error, index) =>
            <div key={index} className='alert alert-danger'>{error.message}</div>


          )}



          <div class="mb-3">
            <label htmlFor="Email" class="form-label">Email</label>
            <input onChange={getFormValue} type="email" name='email' class="form-control" id="exampleFormControlInput1" />
          </div>

          <div class="mb-3">
            <label htmlFor="Password" class="form-label">Password</label>
            <input onChange={getFormValue} type="password" name='password' class="form-control" id="exampleFormControlInput1" />
          </div>

          <button className='btn btn-success mt-3 my-4 float-end'>

            Log In
          </button>
        </form>
      </>
    )
  }
