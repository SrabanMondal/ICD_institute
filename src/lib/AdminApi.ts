import axios, {AxiosResponse } from "axios";
import { LevelData, Materials } from "./api";
export type MyAxios<T>={
    status:boolean,
    message:T
}
const api = process.env.NEXT_PUBLIC_API_URL
export async function login(email:string,password:string):Promise<MyAxios<string>>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/admin/login',{
            email: email,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return {status:false,message:"error"}
    }
}

export async function addsubject(name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/add',{
           name:name
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function editsubject(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/edit',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/delete',{
           id_name:id
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addtopic(subjectid:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/topic/add',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/topic/edit',{
            subject_id:subjectid,
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/topic/delete',{
           topicid:id
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addlevel(id:string,name:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/level/add',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/level/edit',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/level/delete',{
           levelid:id
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function addmaterial(name:string,levelid:string,link:string):Promise<boolean>{
    try {
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/add',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/edit',{
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
        const response:AxiosResponse<MyAxios<string>> = await axios.post(api+'/api/v1/subject/delete',{
           id_name:id
        })
        return response.data.status;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getlevels(id:string):Promise<LevelData[]|null>{
    try {
       
        const response = await fetch(`${api}/api/v1/level/all/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",  // Set content type
              "Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjdhMGQ2Y2U0MTQ5YzM1NzQ3MTZjYWRjIiwiaWF0IjoxNzM4NTk0MDA2fQ.ywKRbIZzY8KrXI_TfIjhbGdaSVAyJMX-QY9dCMuESv8`,  // Add the Authorization token
            },
             // Optional: If you need to send a request body
          });
          const data = await response.json();
          console.log(response);
          return data;  // Return the response data
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getmaterials(id:string):Promise<Materials[]|null>{
    try {
        const response:AxiosResponse<MyAxios<Materials[]>> = await axios.get(api+'/api/v1/material/all/'+id)
        return response.data.message;
    } catch (error) {
        console.log(error);
        return null;
    }
}
