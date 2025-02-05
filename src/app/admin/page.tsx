//"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPage from "@/components/admin/Admin";
import React from "react";

const page = async () => {
  const cookieStore =  await cookies(); // No await needed
const authToken = cookieStore.get("authtoken")?.value;
  //console.log(authToken)
  //console.log(token)
  if (!authToken) {
    redirect("/adminlogin"); // Redirect if no token
  }

  return <AdminPage />;
};

export default page;
