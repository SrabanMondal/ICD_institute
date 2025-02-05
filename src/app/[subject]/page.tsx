import Subject from "@/components/subjects/Subject";
const SubjectBase =({ params }:{params:{subject:string}}) => {
  const { subject } =  params;
  return (
    <Subject subject={subject}/>
  );
};

export default SubjectBase;