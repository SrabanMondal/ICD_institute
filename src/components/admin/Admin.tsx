// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getSubject, SubjectType } from "@/lib/api";
import Sidebar from "./SideBar";
import AdminHeader from "./Header";
import MainArea from "./MainArea";
import { ToastContainer } from "react-toastify";

const AdminPage = () => {
  const [subjects, setSubjects] = useState<SubjectType[]|null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType|null>(null);
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
    const getSubjects = async () => {
      const data = await getSubject();
      if(data){
        setSubjects(data);
        if (data.length > 0) setSelectedSubject(data[0]); // Select first subject by default
      }
    };
    getSubjects();
  }, [refresh]);

  return (
    <div>
      <AdminHeader/>
    <div className="flex h-screen bg-[#191919] text-white overflow-hidden">
      {/* Sidebar for subjects */}
      <Sidebar refresh={setrefresh} subjects={subjects} selected={selectedSubject} onSelect={setSelectedSubject} />

      {/* Main panel for topics & deeper levels */}
      <div className="flex-1">
        {selectedSubject ? (
          <MainArea subject={selectedSubject} />
        ) : (
          <p className="text-center text-gray-500">No subjects found.</p>
        )}
      </div>
    </div>
    <ToastContainer/>
        </div>
  );
};

export default AdminPage;
