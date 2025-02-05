// components/MaterialsPanel.tsx
"use client";

import { LevelData } from "@/lib/api";

const MaterialsPanel = ({ level }:{level:LevelData}) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold">{level.name} - Materials</h3>
      <button className="bg-green-400 text-white px-4 py-2 rounded mt-2">+ Add Material</button>

      <ul className="space-y-2 mt-2">
        {level.materials.map((material) => (
          <li key={material.id} className="border p-3 rounded flex justify-between">
            <a href={material.link} target="_blank" className="text-blue-600">{material.name}</a>
            <button className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsPanel;