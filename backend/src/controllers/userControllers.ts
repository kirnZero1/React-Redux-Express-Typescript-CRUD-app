import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { usersData } from '../model/userModel';


export const getUsers  = async (req: Request, res: Response) => {
        try{
            const users = await usersData.find({}).sort({createdAt:-1})
            if(!users){
                return res.status(404).json({Error: 'Users not found.'})
            }
            return res.status(200).json(users)
        }catch{
            (error:any) => {
                return res.status(400).json(error)
            }
        }
}


export const getUser  = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({Error: 'There is no such user id.'})
        }

        const users = await usersData.findById({_id:id})

        if(!users){
            return res.status(404).json({Error: 'User id not found.'})
        }
        return res.status(200).json(users)
    }catch{
        (error:any) => {
            return res.status(400).json(error)
        }
    }
}

export const deleteUser  = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({Error: 'There is no such user id.'})
        }
        const users = await usersData.findByIdAndDelete({_id:id})
        
        if(!users){
            return res.status(404).json({Error: 'User id not deleted.'})
        }
        return res.status(200).json(users)
    }catch{
        (error:any) => {
            return res.status(400).json(error)
        }
    }
}

export const createUser  = async (req: Request, res: Response) => {
    try{
        const {username, password, email, isAdmin} = req.body;

        const usernames = await usersData.findOne({username: username})
        if(usernames) {
            return res.status(404).json({Error: 'Username is already in use.'})
        }

        const emails = await usersData.findOne({email: email})
        if(emails) {
            return res.status(404).json({Error: 'email is already in use.'})
        }

        const users = await usersData.create({username: username, password: password, email: email, isAdmin: isAdmin})
        if(!users){
            return res.status(404).json({Error: 'User not created. Please input valid credentials.'})
        }
        return res.status(200).json(users)
    }catch{
        (error:any) => {
            return res.status(400).json(error)
        }
    }
}


export const updateUser  = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const {username, password, email, isAdmin} = req.body;

        const users = await usersData.findByIdAndUpdate({_id: id},{username: username, password: password, email: email, isAdmin: isAdmin})
        if(!users){
            return res.status(404).json({Error: 'User not updated. Please input valid credentials.'})
        }
        return res.status(200).json(users)
    }catch{
        (error:any) => {
            return res.status(400).json(error)
        }
    }
}

module.exports = {
    getUsers, getUser, deleteUser, createUser, updateUser
}