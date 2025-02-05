"use client";
import { SubjectType } from "@/lib/api";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import {  Trash2, Plus } from "lucide-react";
import { Editable, EditableInput, EditablePreview, Button, Input, IconButton } from "@chakra-ui/react";
import { Provider } from "../ui/provider";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import {PopoverBody,PopoverContent,PopoverRoot,PopoverTitle,PopoverTrigger,} from "@/components/ui/popover"
import { addsubject, deletesubject, editsubject } from "@/lib/AdminApi2";
import { toast,  } from "react-toastify";
import { Rajdhani, Audiowide } from "next/font/google";
const myfont = Audiowide({weight:'400',subsets:['latin']})
const rajdhani = Rajdhani({weight:['400','600'],subsets:['latin']})
export type SideBarProps = {
  refresh: Dispatch<SetStateAction<boolean>>
  subjects: SubjectType[] | null;
  selected: SubjectType | null;
  onSelect: (subject: SubjectType) => void;
};

const Sidebar: React.FC<SideBarProps> = ({ refresh,subjects, selected, onSelect }) => {
  const [newSubject, setNewSubject] = useState("");
  const [editedSubjects, setEditedSubjects] = useState<{[id:string]:string}>({});
  const handleAdd = async () => {
    const response = await addsubject(newSubject);
    if(response){
        toast.success("New subject added",{ position: "top-left" });
        refresh(prev=>!prev)
    } else{
      toast.error("Failed to add new subject",{ position: "top-left" });
    }
    
  };
  const handleChange = (id:string,name:string) => {
      setEditedSubjects(prev=>({...prev,[id]:name}))
  }
  const handleEdit = async (e:MouseEvent<HTMLButtonElement>,id:string) => {
    e.stopPropagation();
    const response = await editsubject(id, editedSubjects[id]);
    if(response){
        toast.success("Subject updated",{ position: "top-left" });
        refresh(prev=>!prev)
    } else{
      toast.error("Failed to update subject",{ position: "top-left" });
    }
    setEditedSubjects(prev=>({...prev, [id]:""}));
    
  };

  const handleDelete = async (e: MouseEvent,id:string) => {
    e.stopPropagation();
    const response = await deletesubject(id);
    if(response){
      toast.success("Subject deleted",{ position: "top-left" });
        refresh(prev=>!prev)
    } else{
      toast.error("Failed to delete subject",{ position: "top-left" });
    }
  };

  return (
    <Provider>
    <div style={{fontFamily:myfont.style.fontFamily, }} className="w-[55vw] sm:w-[17rem] bg-[url(/sidebg.png)] bg-cover backdrop-blur-lg shadow-xl  rounded-2xl p-4 relative ">
      <h2 className="text-xl text-center font-bold text-white mb-4 skew-x-[-16deg] skew-y-[-2deg] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-transparent bg-clip-text">
        Subjects
      </h2>
      <ul className="mt-4 space-y-3">
        {subjects &&
          subjects.map((subject) => (
            <li
            key={subject.id}
            className={`px-3 py-2 rounded-lg flex justify-between items-center border border-gray-700
              bg-black/60 hover:bg-black/40 transform skew-x-[10deg] skew-y-[-2deg] cursor-pointer
              transition-all duration-300  ${
                selected?.id === subject.id ? "bg-black/80 translate-x-4 scale-105 shadow-[3px_8px_20px_#000000]" : "shadow-[2px_5px_5px_#000000]"
                }`}
                onClick={() => onSelect(subject)}
                >
              <Editable.Root activationMode="dblclick" selectOnFocus={false} defaultValue={subject.name} className="flex-grow" onValueChange={(e)=>handleChange(subject.id,e.value)}>
                <EditablePreview className="text-white font-semibold" />
                <EditableInput className="bg-gray-800 text-white rounded px-2" />
                <Editable.Control>
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
        <Editable.SubmitTrigger asChild onClick={(e)=>handleEdit(e,subject.id)}>
          <IconButton variant="outline" size="xs" >
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
              </Editable.Root>
              <div className="flex">
                <button
                  onClick={(e) => handleDelete(e,subject.id)}
                  className="p-2 rounded-md text-red-400 hover:text-red-600 hover:bg-gray-200/20 transition-all"
                  >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="w-full flex justify-end items-center mt-3">
                <PopoverRoot positioning={{placement:'bottom-start'}} >
                  <PopoverTrigger
                      className="w-fit px-3 py-3 text-white font-semibold flex items-center justify-center gap-2 
                      bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800
                      rounded-full shadow-lg transform active:scale-95 transition-all duration-200"
                      >
                      <Plus size={18} />
                  </PopoverTrigger>
                  <PopoverContent style={{fontFamily:rajdhani.style.fontFamily}} className="w-60 p-4 bg-black/30 backdrop-blur-md text-white rounded-lg shadow-xl border border-white/20 -translate-x-48 transition-all duration-300 transform scale-95 hover:scale-100">
  <PopoverBody className="py-2 px-3">
    <PopoverTitle className="mb-3 text-md text-gray-200 font-semibold border-b border-white/20 pb-2">
      Enter New Subject
    </PopoverTitle>
    <Input
      placeholder="Enter subject name"
      value={newSubject}
      onChange={(e) => setNewSubject(e.target.value)}
      className="mb-2 bg-black/40 backdrop-blur-lg text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none transition-all"
    />
    <Button
      onClick={handleAdd}
      w="full"
      className="w-full bg-green-500/20 hover:bg-green-500/40 text-white py-2 rounded-lg shadow-md transition-all duration-200 active:scale-95 border border-green-500/30"
    >
      Submit
    </Button>
  </PopoverBody>
</PopoverContent>

                </PopoverRoot>
                        </div>
            
    </div>
          </Provider>
  );
};

export default Sidebar;
