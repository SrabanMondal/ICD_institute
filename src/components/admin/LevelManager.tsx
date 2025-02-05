// components/LevelsPanel.tsx
"use client";
import { useEffect, useState } from "react";
import MaterialsPanel from "./MaterialPanel";
import { getLevels, LevelData, TopicsType } from "@/lib/api";

const LevelsPanel = ({ topic }:{topic:TopicsType}) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelData|null>(null);
  const [levels, setlevels] = useState<LevelData[]|null>(null)
useEffect(() => {
  const fetchlevels = async (id:string)=>{
      const data = await getLevels(id);
      if(data){
        setlevels(data)
      }
  }
  fetchlevels(topic.id);
}, [topic])

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-semibold">{topic.name} - Levels</h3>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">+ Add Level</button>

      <ul className="space-y-2 mt-2">
        {levels && levels.map((level) => (
          <li
            key={level.id}
            className="border p-3 rounded cursor-pointer hover:bg-gray-800"
            style={{backgroundColor:level.id==selectedLevel?.id?"#e5e5e560":""}}
            onClick={() => setSelectedLevel(level)}
          >
            <div className="flex justify-between">
              <span>{level.name}</span>
              <button className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedLevel && <MaterialsPanel level={selectedLevel} />}
    </div>
  );
};

export default LevelsPanel;
