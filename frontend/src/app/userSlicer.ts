import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchData = createAsyncThunk('data/fetch', async () => {
    try{
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:3001/api/users')
        return response.data

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response.data || "Error response.data")
    }
})

export const deleteData = createAsyncThunk('data/delete', async (id: string) => {
    try{
        axios.defaults.withCredentials = true;
        const response = await axios.delete('http://localhost:3001/api/users/delete/'+id)
        return response.data

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response.data || "Error response.data")
    }
})

type Cusers ={
    username: string,
    password: string,
    email: string,
    isAdmin: boolean | string
}

export const createData = createAsyncThunk('data/create', async (values: Cusers) => {
    try{
        axios.defaults.withCredentials = true;
        const response = await axios.post('http://localhost:3001/api/users/create',values)
        return response.data

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response.data || "Error response.data")
    }
})


type Uusers ={
    id:string | undefined,
    values:{
    username: string,
    password: string,
    email: string,
    isAdmin: boolean | string
    }
}

export const updateData = createAsyncThunk<any,Uusers>('data/update', async ({id, values}) => {
    try{
        axios.defaults.withCredentials = true;
        const response = await axios.patch('http://localhost:3001/api/users/update/'+id,values)
        return response.data

    }catch(error:any){
        console.error(error);
        return Promise.reject(error.response.data || "Error response.data")
    }
})


type usersData ={
    _id: string,
    username: string,
    password: string,
    email: string,
    isAdmin: boolean
} 

type userState = {
    loading: string | boolean | null,
    data: usersData[],
    error: boolean |string | number | null
}


const initialState: userState = {
    loading: false,
    data:[],
    error: null
}


export const userSlice = createSlice({
    name: 'data',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchData.pending, (state) => {
                state.loading = true
        })
        .addCase(fetchData.fulfilled, (state,action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchData.rejected, (state) => {
            state.error = true
        })
        .addCase(deleteData.fulfilled, (state,action) => {
            if(!action.payload || !action.payload.id){
                // console.error('This is a error log on id')
                return state;
            }
            state.data = state.data.filter((user) => user._id !== action.payload.id)
        })
        .addCase(createData.fulfilled, (state,action) => {
            state.data.push(action.payload)
        })
        .addCase(updateData.fulfilled, (state,action) => {
            if(!action.payload || !action.payload.id){
                // console.error('This is a error log on id')
                return state;
            }
            const updateUsers = state.data.map((user) => user._id === action.payload.id ? action.payload: user)
            return {...state, data: updateUsers}
        })
    }
})

export default userSlice.reducer;