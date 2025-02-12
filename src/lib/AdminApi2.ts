import axios, { AxiosResponse } from "axios";
import {  Materials } from "./api";
import api from "./axiosutil";
export type MyAxios<T>={
    status:boolean,
    message:T
}
export type MyLevels={
    name:string,
    id: string,
}
//const apiurl = process.env.NEXT_PUBLIC_API_URL
export async function login(email:string,password:string):Promise<MyAxios<string>>{
    try {
        //console.log("my login-",email,password);
        const response:AxiosResponse<MyAxios<string>> = await axios.post('/api/login',{
            email: email,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return {status:false,message:"unknown error"}
    }
}

export async function addsubject(name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.post('/api/v1/subject/add',{
           name:name
        })
       // console.log(response)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function getlevels(id:string):Promise<MyLevels[]|null>{
    try {
        const response:AxiosResponse<MyAxios<MyLevels[]>> = await api.get('/api/v1/level/all/'+id)
        console.log(response)
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function getmaterials(id:string):Promise<Materials[]|null>{
    try {
        const response:AxiosResponse<MyAxios<Materials[]>> = await api.get('/api/v1/material/all/'+id)
        console.log(response)
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function editsubject(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.put('/api/v1/subject/edit',{
           id_name:id,
           newname:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function deletesubject(id:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.delete('/api/v1/subject/delete/'+id)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addtopic(subjectid:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.post('/api/v1/topic/add',{
            subjectid:subjectid,
           topicname:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function edittopic(subjectid:string,id:string,name:string):Promise<boolean>{
    try {
        console.log(subjectid,id,name)
        const response:AxiosResponse<MyAxios<string>> = await api.put('/api/v1/topic/edit',{
            subjectid:subjectid,
           topicid:id,
           newtopicname:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function deletetopic(id:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.delete('/api/v1/topic/delete/'+id)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addlevel(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.post('/api/v1/level/add',{
            topicid:id,
           label:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function editlevel(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.put('/api/v1/level/edit',{
           levelid:id,
           newlabel:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function deletelevel(id:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.delete('/api/v1/level/delete/'+id)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addmaterial(levelid:string,name:string,link:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.post('/api/v1/material/add',{
           levelid:levelid,
           link:link,
           label:name,
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function editmaterial(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.put('/api/v1/subject/edit',{
           id_name:id,
           newname:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function deletematerial(id:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.delete('/api/v1/material/delete/'+id)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addannouncement(title:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.post('/api/v1/announcement/add',{
           title:title
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function deleteannouncement(id:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await api.delete('/api/v1/announcement/delete/'+id)
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}