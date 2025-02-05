"use client";
import { MouseEvent, useEffect, useState } from "react";
import { Card } from "@chakra-ui/react";
import { AccordionRoot, AccordionItem, AccordionItemTrigger, AccordionItemContent } from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import { getLevels, getTopics, LevelData, SubjectType, TopicsType } from "@/lib/api";
import { Provider } from "../ui/provider";
import {  Trash2, Plus } from "lucide-react";
import { Editable, EditableInput, EditablePreview, Button, Input, IconButton } from "@chakra-ui/react";
import {PopoverBody,PopoverContent,PopoverRoot,PopoverTitle,PopoverTrigger,} from "@/components/ui/popover"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import { Exo_2 } from "next/font/google";
import { edittopic, deletetopic, addtopic, addlevel, editlevel,deletelevel, addmaterial, deletematerial } from "@/lib/AdminApi2";
import { toast, } from "react-toastify";
import { Rajdhani,  } from "next/font/google";
//const myfont = Audiowide({weight:'400',subsets:['latin']})
const rajdhani = Rajdhani({weight:['400','600'],subsets:['latin']})
const myfont = Exo_2({weight:'variable',subsets:['latin']})
const MainArea = ({ subject }:{subject:SubjectType}) => {
  const [refresh, setrefresh] = useState(false)
  const [refresh2, setrefresh2] = useState(false)
  const [topics, settopics] = useState<TopicsType[]|null>(null)
  const [levels, setlevels] = useState<LevelData[]|null>(null)
  const [editedtopics, setEditedTopics] = useState<{[id:string]:string}>({});
  const [editedlevels, setEditedLevels] = useState<{[id:string]:string}>({});
    const [selectedTopic, setSelectedTopic] = useState<TopicsType|null>(null);
    const [newmaterial, setnewmaterial] = useState("")
    const [newlink, setnewlink] = useState("")
const [newtopic, setnewtopic] = useState("")
const [newlevel, setnewlevel] = useState("")
    useEffect(() => {
      const fetchtopics = async(subjectid:string)=>{
          const data = await getTopics(subjectid);
          if(data){
            settopics(data)
            setSelectedTopic(null)
          }
      }
      fetchtopics(subject.id)
    }, [subject,refresh])
    useEffect(() => {
      const fetchlevels = async (id:string)=>{
          const data = await getLevels(id);
          if(data){
            setlevels(data)
          }
      }
      if(selectedTopic){
          fetchlevels(selectedTopic.id);
        }
    }, [selectedTopic,refresh2])
    const handleTopicChange = (id:string,name:string) => {
        setEditedTopics(prev=>({...prev,[id]:name}))
    }
    const handleLevelChange = (id:string,name:string) => {
        setEditedLevels(prev=>({...prev,[id]:name}))
    }
  const handleTopicEdit = async(e:MouseEvent,id:string)=>{
    e.stopPropagation();
        const response = await edittopic(subject.id,id, editedtopics[id]);
        if(response){
            toast.success("Topic updated",{ position: "top-right" });
            setrefresh(prev=>!prev)
        } else{
          toast.error("Failed to update Topic",{ position: "top-right" });
        }
        setEditedTopics(prev=>({...prev, [id]:""}));
  }
  const handleTopicDelete = async(e:MouseEvent,id:string)=>{
         e.stopPropagation();
            const response = await deletetopic(id);
            if(response){
              toast.success("Topic deleted",{ position: "top-right" });
                setrefresh(prev=>!prev)
            } else{
              toast.error("Failed to delete topic",{ position: "top-right" });
            }
  }
  const handleAddTopic = async()=>{
     const response = await addtopic(subject.id,newtopic);
        if(response){
            toast.success("New topic added",{ position: "top-right" });
            setrefresh(prev=>!prev)
        } else{
          toast.error("Failed to add new topic",{ position: "top-right" });
        }
  }
  const handleAddLevel = async()=>{
     const response = await addlevel(selectedTopic?selectedTopic.id:"",newlevel);
        if(response){
            toast.success("New level added",{ position: "top-right" });
            setrefresh2(prev=>!prev)
        } else{
          toast.error("Failed to add new level",{ position: "top-right" });
        }
  }
  const handleLevelEdit = async(e:MouseEvent,id:string)=>{
    e.stopPropagation();
    const response = await editlevel(id, editedlevels[id]);
    if(response){
        toast.success("Level updated",{ position: "top-right" });
        setrefresh2(prev=>!prev)
    } else{
      toast.error("Failed to update Level",{ position: "top-right" });
    }
    setEditedTopics(prev=>({...prev, [id]:""}));
  }
  const handleLevelDelete = async(e:MouseEvent,id:string)=>{
    e.stopPropagation();
    const response = await deletelevel(id);
    if(response){
      toast.success("Level deleted",{ position: "top-right" });
        setrefresh2(prev=>!prev)
    } else{
      toast.error("Failed to delete Level",{ position: "top-right" });
    }
  }
  const handleMaterialAdd = async(e:MouseEvent,id:string)=>{
    const response = await addmaterial(id,newmaterial,newlink);
    if(response){
        toast.success("Material added",{ position: "top-right" });
        setrefresh2(prev=>!prev)
    }
    else{
      toast.error("Failed to add Material",{ position: "top-right" });
    }
  }
  const handleMaterialDelete = async(e:MouseEvent,id:string)=>{
    e.stopPropagation();
    const response = await deletematerial(id);
    if(response){
      toast.success("Material deleted",{ position: "top-right" });
        setrefresh2(prev=>!prev)
    } else{
      toast.error("Failed to delete Material",{ position: "top-right" });
    }
  }
  return (
    <Provider>
        
    <div style={{fontFamily:myfont.style.fontFamily}} className="flex-1 p-6 h-full bg-gray-900 text-white rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Breadcrumb Header */}
      <div className="mb-4 text-xl font-bold flex items-center gap-2 text-gray-300">
        <span className="text-gray-400 text-xl hover:underline cursor-pointer hover:text-xl hover:text-white transition-all duration-300" onClick={() => setSelectedTopic(null)}>{subject.name}</span>
            <ChevronRight className="text-gray-500 text-xl" size={16} />
            <span className=" " >
              {selectedTopic?selectedTopic.name:"Topic"}
            </span>
        
      </div>

      {/* Show Topics or Levels */}
      {!selectedTopic ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {topics && topics.map((topic) => (
              <Card.Root
              key={topic.id}
              className="p-4 bg-gray-800 hover:bg-gray-700 flex flex-row justify-between transition-all transform hover:scale-105 cursor-pointer rounded-xl shadow-lg"
              onClick={() => setSelectedTopic(topic)}
            >
                <div className="w-fit" onClick={(e)=>e.stopPropagation()} >
               <Editable.Root     activationMode="dblclick" selectOnFocus={false} defaultValue={topic.name} className="flex-grow" onValueChange={(e)=>handleTopicChange(topic.id,e.value)}>
                <EditablePreview   className="text-white font-semibold text-lg" />
                <EditableInput  className="bg-gray-800 text-white rounded px-2 text-lg" />
                <Editable.Control  >
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger    asChild >
          <IconButton   onClick={(e)=>handleTopicEdit(e,topic.id)}>
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
              </Editable.Root>
                </div>
              <div className="flex">
                <button
                  onClick={(e) => handleTopicDelete(e,topic.id)}
                  className="p-2 rounded-md text-red-400 hover:text-red-600 hover:bg-gray-200/20 transition-all"
                  >
                  <Trash2 size={20} />
                </button>
              </div>
            </Card.Root>
          ))}
          <Card.Root className=" bg-transparent flex justify-center">
             <PopoverRoot positioning={{placement:'bottom-start'}} >
                              <PopoverTrigger
                                  className="w-fit px-3 py-3 text-white font-semibold flex items-center justify-center gap-2 
                                  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800
                                  rounded-full shadow-lg transform active:scale-95 transition-all duration-200"
                                  >
                                  <Plus size={18} />
                              </PopoverTrigger>
                              <PopoverContent style={{fontFamily:rajdhani.style.fontFamily}} className="w-60 p-4 bg-black/30 backdrop-blur-md text-white rounded-lg shadow-xl border border-white/20  transition-all duration-300 transform scale-95 hover:scale-100">
              <PopoverBody className="py-2 px-3">
                <PopoverTitle className="mb-3 text-md text-gray-200 font-semibold border-b border-white/20 pb-2">
                  Enter New Topic
                </PopoverTitle>
                <Input
                  placeholder="Enter subject name"
                  value={newtopic}
                  onChange={(e) => setnewtopic(e.target.value)}
                  className="mb-2 bg-black/40 backdrop-blur-lg text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none transition-all"
                />
                <Button
                  onClick={handleAddTopic}
                  w="full"
                  className="w-full bg-green-500/20 hover:bg-green-500/40 text-white py-2 rounded-lg shadow-md transition-all duration-200 active:scale-95 border border-green-500/30"
                >
                  Submit
                </Button>
              </PopoverBody>
            </PopoverContent>
            
                            </PopoverRoot>
          </Card.Root>
        </div>
      ) : (
          <div className="mt-6 ">
            <AccordionRoot collapsible  className="mb-2 space-y-4 rounded-lg">
          {levels && levels.map((level) => (
              <AccordionItem key={level.id} value={level.name} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/60 shadow-md">
                <AccordionItemTrigger as={'div'} className="px-4 py-2 w-full bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                <div className="flex w-full text-white text-left text-lg font-semibold flex-row justify-between">
                <div className="w-fit" onClick={(e)=>e.stopPropagation()} >
               <Editable.Root     activationMode="dblclick" selectOnFocus={false} defaultValue={level.name} className="flex-grow" onValueChange={(e)=>handleLevelChange(level.id,e.value)}>
                <EditablePreview   className="text-white font-semibold text-lg" />
                <EditableInput  className="bg-gray-800 text-white rounded px-2 text-lg" />
                <Editable.Control  >
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger    asChild >
          <IconButton   onClick={(e)=>handleLevelEdit(e,level.id)}>
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
              </Editable.Root>
                </div>
              <div className="flex">
                <button
                  onClick={(e) => handleLevelDelete(e,level.id)}
                  className="p-2 rounded-md text-red-400 hover:text-red-600 hover:bg-gray-200/20 transition-all"
                  >
                  <Trash2 size={18} />
                </button>
              </div>
                </div>
                    </AccordionItemTrigger>
                <AccordionItemContent className="p-4 bg-gray-800 rounded-b-lg">
                    <div className="flex gap-4">
                    <Input
                  placeholder="Enter material name"
                  value={newmaterial}
                  onChange={(e) => setnewmaterial(e.target.value)}
                  className="mb-2 bg-black/40 backdrop-blur-lg text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none transition-all"
                />
                    <Input
                  placeholder="Enter material link"
                  value={newlink}
                  onChange={(e) => setnewlink(e.target.value)}
                  className="mb-2 bg-black/40 backdrop-blur-lg text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none transition-all"
                />
                <Button
                  onClick={(e)=>handleMaterialAdd(e,level.id)}
                  className="w-fit bg-green-500/20 hover:bg-green-500/40 text-white py-2 px-3 rounded-lg shadow-md transition-all duration-200 active:scale-95 border border-green-500/30"
                >
                  Submit
                </Button>
                    </div>
                    <ul>

                  {level.materials.map((material) => (
                      <li key={material.id} className="my-2 px-2">
                      <div className="flex justify-between items-center text-lg">
            <a
              href={`${material.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 hover:underline"
              >
              {material.name}
            </a>
            <button
                  onClick={(e) => handleMaterialDelete(e,material.id)}
                  className="rounded-md text-red-400 hover:text-red-600 hover:bg-gray-200/20 transition-all"
                  >
                  <Trash2 size={18} />
                </button>
          </div>
                      </li>
                    ))}
                    </ul>
                </AccordionItemContent>
              </AccordionItem>
          ))}
          </AccordionRoot>
          <Card.Root className=" bg-transparent flex justify-center">
             <PopoverRoot positioning={{placement:'bottom-start'}} >
                              <PopoverTrigger
                                  className="w-fit px-3 py-3 text-white font-semibold flex items-center justify-center gap-2 
                                  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800
                                  rounded-full shadow-lg transform active:scale-95 transition-all duration-200"
                                  >
                                  <Plus size={18} />
                              </PopoverTrigger>
                              <PopoverContent style={{fontFamily:rajdhani.style.fontFamily}} className="w-60 p-4 bg-black/30 backdrop-blur-md text-white rounded-lg shadow-xl border border-white/20  transition-all duration-300 transform scale-95 hover:scale-100">
              <PopoverBody className="py-2 px-3">
                <PopoverTitle className="mb-3 text-md text-gray-200 font-semibold border-b border-white/20 pb-2">
                  Enter New Level
                </PopoverTitle>
                <Input
                  placeholder="Enter level name"
                  value={newlevel}
                  onChange={(e) => setnewlevel(e.target.value)}
                  className="mb-2 bg-black/40 backdrop-blur-lg text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none transition-all"
                />
                <Button
                  onClick={handleAddLevel}
                  w="full"
                  className="w-full bg-green-500/20 hover:bg-green-500/40 text-white py-2 rounded-lg shadow-md transition-all duration-200 active:scale-95 border border-green-500/30"
                >
                  Submit
                </Button>
              </PopoverBody>
            </PopoverContent>
            
                            </PopoverRoot>
          </Card.Root>
        </div>
      )}
      
    </div>
      </Provider>
  );
};

export default MainArea;