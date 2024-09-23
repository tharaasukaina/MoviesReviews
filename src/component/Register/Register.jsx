import React, { useState } from 'react'
import Joi, { allow } from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
  })
  let navigate=useNavigate();
  function gotologin(){
    let path='login'
    navigate(path);
  }
  let [errorList, setErrorListt] = useState([])// رح تكون اريه لانو ممكن يكون في اكثر من ايرور 
  let [errorMsg, seterrormsg] = useState('') // هاد المتغير خاص بالايرور اللي جاي من الباك اند 
  let [loading, setLoding] = useState(false)


 async function SubmitForm(e) {
    e.preventDefault();
    setLoding(true) //مجرد ما عملنا سبمت بفعل الللودينغ 
     let {data}= await axios.post("http://localhost:3000/api/v1/users/signUp")
    if(data.message=='success'){
      alert('ok')
      setLoding(false)
      gotologin()
    } else{
      seterrormsg(data.message)
      setLoding(false)
    }
    let validateResult = validateForm();
    //  console.log(validateResult)
    // لو عملنا سمبت دغري بدون فنكشن بريفنت ديفولت رح يصير في تحميل للصفحة 
    // سببو انو الفورم معاه اشي اسمو اكشن ف باي ديفولت هو بعمل ريفريش 
    if (validateResult.error) {
      setErrorListt(validateResult.error.details)
   setLoding(false)//اذا كان في خطأ بالفاليديشين برضو لازم ما يكون في لودينغ
    }  // هيك بصير عنا اريه وفيها ليست من الايرور واحنا بدنا نطبعهم ف بنحتاج لماب 



  }


  function getFormValue(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    //  الخطوة هاي اختصرت علينا انو نعمل كل مرة هيك مثلا : 
    // e,target.user_name=e.target.value
    setUser(myUser);
    // console.log(myUser);

  }

  function validateForm() {
    const schema = Joi.object({
      first_name: Joi.string().min(1).max(30).required(),
      last_name: Joi.string().min(1).max(30).required(),
      age: Joi.number().min(20).max(60).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().pattern(new RegExp('^[a-z][A-Z][0-9]{4}$')).messages({
        'string.pattern.base': 'Password must start with a lowercase letter, followed by an uppercase letter, and end with exactly ten digits.'
      })

    });
    return schema.validate(user, { abortEarly: false });//الابورت ليرلي عشان سطبع كل الايرورز مش بس اول واحد 

  }



  return (
    <>
      <h1>Regestration Form </h1>
      <form onSubmit={SubmitForm}>
        {errorList.map((error, index) =>
          <div key={index} className='alert alert-danger'>{error.message}</div>


        )}

        <div class="mb-3">
          <label htmlFor="FirstName" class="form-label">First Name</label>
          <input onChange={getFormValue} type="text" name='first_name' class="form-control" id="exampleFormControlInput1" />
        </div>

        <div class="mb-3">
          <label htmlFor="LastName" class="form-label">Last Name</label>
          <input onChange={getFormValue} type="text" name='last_name' class="form-control" id="exampleFormControlInput1" />
        </div>

        <div class="mb-3">
          <label htmlFor="Age" class="form-label">Age</label>
          <input onChange={getFormValue} type="number" name='age' class="form-control" id="exampleFormControlInput1" />
        </div>


        <div class="mb-3">
          <label htmlFor="Email" class="form-label">Email</label>
          <input onChange={getFormValue} type="email" name='email' class="form-control" id="exampleFormControlInput1" />
        </div>

        <div class="mb-3">
          <label htmlFor="Password" class="form-label">Password</label>
          <input onChange={getFormValue} type="password" name='password' class="form-control" id="exampleFormControlInput1" />
        </div>

        <button className='btn btn-success mt-3 my-4 float-end'>
        
        {loading?<i className='fa fa-spinner fa-spin'></i>:'register now'}
        
        </button>
      </form>
    </>
  )
}
