// components/TopicsPanel.tsx
"use client";
import { useEffect, useState } from "react";
import LevelsPanel from "./LevelManager";
import {  getTopics, SubjectType, TopicsType } from "@/lib/api";
const TopicsPanel = ({ subject }:{subject:SubjectType}) => {
  const [topics, settopics] = useState<TopicsType[]|null>(null)
  const [selectedTopic, setSelectedTopic] = useState<TopicsType|null>(null);
  useEffect(() => {
    const fetchtopics = async(subjectid:string)=>{
        const data = await getTopics(subjectid);
        if(data){
          settopics(data)
        }
    }
    fetchtopics(subject.id)
  }, [subject])
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{subject.name} - Topics</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-2">+ Add Topic</button>
      
      <ul className="space-y-2">
        {topics && topics.map((topic) => (
          <li
            key={topic.id}
            className="border p-3 rounded cursor-pointer hover:bg-gray-700"
            style={{backgroundColor:topic.id==selectedTopic?.id ?"#f5f5f550":""}}
            onClick={() => setSelectedTopic(topic)}
          >
            <div className="flex justify-between">
              <span>{topic.name}</span>
              <button className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedTopic && <LevelsPanel topic={selectedTopic} />}
    </div>
  );
};

export default TopicsPanel;
