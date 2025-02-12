"use client";
import { Orbitron } from "next/font/google"; // Importing Epic Font
import { Provider } from "../ui/provider";
import { useEffect, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input, VStack, HStack, Text, IconButton } from "@chakra-ui/react";
import { Trash, X } from "lucide-react";
import { AnnouncementType, getannouncements } from "@/lib/api";
import { addannouncement, deleteannouncement } from "@/lib/AdminApi2";
import { toast } from "react-toastify";
const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });
const AdminHeader = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>();
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    const fetchannouncement = async ()=>{
      const res = await getannouncements();
      if(res){
        setAnnouncements(res);
      }
    }
    fetchannouncement();
  }, [refresh])
  
  const handleAdd = async () => {
    const res = await addannouncement(newAnnouncement);
    if(res){
      toast.success("Added announcement")
      setrefresh(prev=>!prev);
    }else{
      toast.error("Failed to add announcement")
    }
  };
  const handleDelete = async (id: string) => {
    const res = await deleteannouncement(id);
    if(res){
      toast.success("Deleted announcement")
      setrefresh(prev=>!prev);
    } else{
      toast.error("Failed to delete announcement")
    }
  };
  return (
    <Provider>

    <header className="relative bg-gradient-to-r from-black via-gray-900 to-gray-800 
      bg-opacity-80 backdrop-blur-lg border border-gray-700 shadow-lg 
      text-white py-4 px-6 flex justify-between items-center
      "
    >
      <h1 style={{fontFamily:orbitron.style.fontFamily}} className="text-2xl font-extrabold tracking-wide 
        text-white drop-shadow-md"
        >
        Admin Panel
      </h1>
      <DialogRoot scrollBehavior={'inside'} closeOnInteractOutside={false}>
      <DialogTrigger >
        View Announcements
      </DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle>Announcements</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <VStack align="stretch">
            { announcements && announcements.length > 0 ? (
              announcements.map((announcement) => (
                <HStack key={announcement.title} justify="space-between" px={3} py={1} bg="gray.700/30" borderRadius="md">
                  <Text className="text-white text-xl">{announcement.title} - {announcement.date}</Text>
                  <IconButton
                    aria-label="Delete announcement"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(announcement._id)}
                  ><Trash size={16} /></IconButton>
                </HStack>
              ))
            ) : (
              <Text textAlign="center" color="gray.500">No announcements available</Text>
            )}
          </VStack>
        </DialogBody>

        <DialogFooter>
          <HStack width="100%">
            <Input
            className="px-3 py-1"
              placeholder="Add an announcement..."
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
            />
            <Button colorScheme="green" onClick={handleAdd}>Add</Button>
          </HStack>
          <DialogCloseTrigger>
            <X/>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
    </header>
        </Provider>
  );
};

export default AdminHeader;
