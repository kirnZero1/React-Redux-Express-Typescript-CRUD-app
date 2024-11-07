import React,{useState} from 'react';
import { useAppDispatch } from '../app/hooks';
import { createData } from '../app/userSlicer';
import { Link, useNavigate } from 'react-router-dom';


type CCusers = {
    username: string,
    password: string,
    email: string,
    isAdmin: string 
}

const Create = () => {
    const [values, setValues] = useState<CCusers>({
        username:"",
        password:"",
        email:"",
        isAdmin:"false"
    })

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit: React.FormEventHandler<HTMLFormElement> =  async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log();

        try{
            dispatch(createData(values))
            .then((response) => {
                    if(response.meta.requestStatus === "rejected"){
                        alert('Username or Email is already in use. Please input valid credentials. Thank you.');
                    }else{
                        alert('Successfully created a new User. You will be sent to the Home Page.');
                        navigate('/');
                    }
              })
              .catch((error) => {
                alert('Error: User not created.');
                console.error('Error creating user:', error);
              });

        }catch(error){
            alert('Error: User not created.');
            console.error('Error creating user:', error)
        }
    }
  return (
    <div className='bg-light text-dark w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className='container'>
                <div className='col-12'>
                        <div className='text-center my-3'>
                       
                            <h4>Create user information</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                             <div className='col-12 d-flex align-items-center justify-content-center'>
                                <div className='col-6 border my-3 bg-light-subtle'>
                                    <div className='row mt-3'>
                                            <div className='col-3 d-flex align-items-center justify-content-center'>
                                                <label className='fw-bold'>Username:</label>
                                            </div>
                                            <div className='col-9 d-flex align-items-center justify-content-center py-1 '>
                                                <div className='col-11'>
                                                        <input className='form-control' required placeholder='Set Username' value={values.username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, username: event.target.value})}/>
                                                </div>
                                            </div>
                                    </div>
                                    <div className='row'>
                                            <div className='col-3 d-flex align-items-center justify-content-center'>
                                                <label className='fw-bold'>Password:</label>
                                            </div>
                                            <div className='col-9 d-flex align-items-center justify-content-center py-1 '>
                                                <div className='col-11'>
                                                <input className='form-control' required placeholder='Set Password' value={values.password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, password: event.target.value})}/>
                                                </div>
                                            </div>
                                    </div>
                                    <div className='row'>
                                            <div className='col-3 d-flex align-items-center justify-content-center'>
                                                <label className='fw-bold'>Email:</label>
                                            </div>
                                            <div className='col-9 d-flex align-items-center justify-content-center py-1 '>
                                                <div className='col-11'>
                                                <input className='form-control' required placeholder='Set Email' value={values.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValues({...values, email: event.target.value})}/>
                                                </div>
                                            </div>
                                    </div>
                                    <div className='row'>
                                            <div className='col-3 d-flex align-items-center justify-content-center'>
                                                <label className='fw-bold'>Role:</label>
                                            </div>
                                            <div className='col-9 d-flex align-items-center justify-content-start py-1'>
                                                <div className='col-5 ps-3'>
                                                       <select className='form-select' required  value={values.isAdmin} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setValues({...values, isAdmin: event.target.value})}>
                                                            <option value='true'>Admin</option>
                                                            <option value='false'>User</option>
                                                       </select>
                                                </div>
                                            </div>
                                    </div>
                                    <div className='row my-3'>
                                            <div className='col-12 d-flex align-items-center justify-content-center'>
                                                        <input type='submit' className='btn btn-success btn-sm px-5 me-2' />
                                                        <Link to='/' type='submit' className='btn btn-danger btn-sm px-5'>Back</Link>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        
                </div>
        </div>
    </div>
  )
}

export default Create
