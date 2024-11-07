import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchData } from '../app/userSlicer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

type cView = {
    _id: string,
    username: string,
    password: string,
    email: string,
    isAdmin: boolean
}

const View = () => {
    // const users = useAppSelector((state) => state.data.data)
    const [user, setUser] = useState<cView>({
        _id: "",
        username: "",
        password: "",
        email: "",
        isAdmin: false
    })
    const {id} = useParams();
    // const dispatch = useAppDispatch();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/api/users/'+id)
            .then((res)=> {
                    setUser(res.data)
            })
            .catch((error) => console.log(error))
        // dispatch(fetchData())
    },[])
  return (
    <div className='w-100 vh-100 bg-light text-dark '>
        <div className='container '>
            <div className='col-12 d-flex align-items-center justify-content-center flex-column'>
                    <div className='pt-5 pb-4'>
                        <h4>User Information System</h4>
                    </div>
                    <div>
                        <table className='table table-sm table-striped table-hover table-bordered'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                     <tr>
                                            <td>{user._id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.password}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? "Admin": "User"}</td>
                                            <td>
                                            <Link to={`/update/${user._id}`} className='btn btn-sm btn-secondary me-1'>Update</Link>
                                            <Link to='/' className='btn btn-sm btn-danger me-1'>Back</Link>
                                            </td>
                                    </tr>


                            </tbody>
                        </table>
                    </div>
            </div>

        </div>
    </div>
  )
}

export default View
