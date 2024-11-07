import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchData, deleteData } from '../app/userSlicer'
import { Link } from 'react-router-dom'

const Home = () => {
    const users = useAppSelector((state) => state.data.data)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchData())
    },[dispatch])

    const handleDelete = (id: string) => {
        const confirms = window.confirm(`Are you sure you want to delete this user ${id}?`)
        if(confirms){
            dispatch(deleteData(id))
            .then(() => {
                alert('Succesfully deleted the User.')
                window.location.reload();
            })
            .catch((error) => {
                 console.log(error)
                 alert('User not deleted.')
             })
        }else{
            window.location.reload();
        }
    }
  return (
    <div className='w-100 h-auto bg-light text-dark'>
        <div className='container'>
            <div className='col-12 d-flex align-items-center justify-content-center flex-column'>
                    <div className='pt-5'>
                        <h3>User Information System</h3>
                    </div>
                    <div>
                        <div className='text-end p-2'>
                        <Link to='/create' className='btn btn-sm btn-success me-1 px-5 shadow'>Add User</Link>
                        </div>
                        <table className='table table-responsive table-sm table-striped table-hover table-bordered'>
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
                                {
                                    users?.map((user, index) => {
                                        return     <tr key={index}>
                                                         <td>{user._id}</td>
                                                         <td>{user.username}</td>
                                                         <td>{user.password && "hashed"}</td>
                                                         <td>{user.email}</td>
                                                         <td>{user.isAdmin ? "Admin": "User"}</td>
                                                         <td>
                                                            <Link to={`/view/${user._id}`} className='btn btn-sm btn-primary me-1'>View</Link>
                                                            <Link to={`/update/${user._id}`} className='btn btn-sm btn-secondary me-1'>Update</Link>
                                                            <button onClick={() => handleDelete(user._id)} className='btn  btn-sm btn-danger'>Delete</button>
                                                         </td>
                                                    </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
            </div>

        </div>
    </div>
  )
}

export default Home
