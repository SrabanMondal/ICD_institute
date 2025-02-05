import axios, { AxiosResponse } from "axios";
export type MyAxios<T>={
    status:boolean,
    message:T
}
export type SubjectType = {
    name: string,
    id: string
}
export type TopicsType={
    name: string,
    id: string
}
export type Materials={
    name: string,
    id: string,
    link:  string
}
export type LevelData={
    name:string,
    id: string,
    materials:Materials[]
}
const api = process.env.NEXT_PUBLIC_API_URL
export async function getSubject(): Promise<null|SubjectType[]> {
    try{
        const response:AxiosResponse<MyAxios<SubjectType[]>> = await axios.get(api+'/api/v1/subject/all');
        return response.data.message

    } catch(error){
        console.error('Error fetching subjects:', error);
        return null;
    }
}

export async function getTopics(subjectid:string): Promise<|null|TopicsType[]> {
    try{
        const response:AxiosResponse<MyAxios<TopicsType[]>> = await axios.get(api+'/api/v1/topic/all/'+subjectid);
        return response.data.message
    } catch(error){
        console.error('Error fetching subjects:', error);
        return null;
    }
}
export async function getLevels(topicid:string): Promise<null|LevelData[]> {
    try{
        const response:AxiosResponse<MyAxios<LevelData[]>> = await axios.get(api+'/api/v1/level/material/'+topicid);
       return response.data.message
    } catch(error){
        console.error('Error fetching subjects:', error);
        return null;
    }
}