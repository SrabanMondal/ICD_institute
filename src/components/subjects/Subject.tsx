"use client"
import { useEffect, useState } from "react";
import SubjectHeader from "@/components/subjects/Header";
import { Provider } from "@/components/ui/provider";
import Sidebar from "./Sidebar";
import Levels from "./Levels";
import { Flex } from "@chakra-ui/react";
import { getSubject, SubjectType } from "@/lib/api";

const Subject = ({ subject }:{subject:string}) => {
  const [subjects, setsubjects] = useState<SubjectType[]|null>(null)
  const [topic, settopic] = useState("")
 const [loading, setLoading] = useState(true);
  const [validSubject, setValidSubject] = useState(false);

  useEffect(() => {
    const validate = async ()=>{
    const data = await getSubject();
    if(data){
      setsubjects(data)
      const lsub = data.map(subject=> subject.name.toLowerCase());
      if (lsub.includes(subject.toLowerCase())) {
        setValidSubject(true);
      } else {
        setValidSubject(false);
      }
    }
    setLoading(false)}
    validate();
   }, [subject]);

  
   if(loading){
       return <div className="text-center p-10">Loading...</div>;
    }else{
    if (!validSubject) {
      return <div className="text-center p-10">Invalid subject. Please try again.</div>;
    }

}
  return (
    <Provider>
      <SubjectHeader subject={subject} subjects={subjects && subjects.map(subject=>subject.name)}/>
      <Flex className="h-[90vh]">
      <Sidebar subjectid={subjects && subjects.filter(sub=> sub.name.toLowerCase()==subject.toLowerCase())[0].id} setTopic={settopic} topic={topic}/>
      <Levels topic={topic}/>
      </Flex>
    </Provider>
  );
};

export default Subject;