import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';



const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
    try {
      const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate("/");
        toast.success(res.data.message);


      }
      
    } catch (error) {
      console.log(error);
      
    }

  };  
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={onSubmitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email"
              name="email"
              value={input.email}
              onchange={changeEventHandler}
              placeholder="ajay@gmail.com"
            ></Input>
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="text"
              name="password"
              value={input.password}
              onchange={changeEventHandler}
              placeholder="abc@123"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">

                <Input
                  type="radio"
                  name="role"
                  value={input.role == 'student'}
                  onchange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value={input.role == 'recruiter'}
                  onchange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>


            </RadioGroup>


          </div>



          <Button type="submit" className="w-full my-4">Login</Button>
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>






        </form>

      </div>

    </div>
  )
}

export default Login;

