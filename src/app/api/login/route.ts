import { NextResponse } from "next/server";
import {serialize} from 'cookie'
import axios from "axios";
const api = process.env.API_URL
export async function POST(req:Request){
    try {
        
        const {email, password} = await req.json();
       console.log("login",email,password);
        if(!email || !password){
            return NextResponse.json({ success: false, message: "Incomplete data" }, { status: 400 });
        }
        const response = await axios.post(api+'/api/v1/admin/login',{
            email:email,
        password: password
    })
    //console.log(response)
    if (response.data.status)
    {
        const cookie = serialize("authtoken",response.data.message,{
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        })
        const res = new NextResponse(JSON.stringify({ status: true,message:response.data.message }), { status: 200 });
       
        res.headers.set("Set-Cookie", cookie);
        //console.log(res)
        return res;
        }
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:500})
    }
}