"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { motion } from "framer-motion";
import { Plus} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

export default function EditProfileModal() {
  const [formData, setFormData] = useState({
    fullName: "Mehedi Hasan Topu",
    username: "@topu9872",
    email: "topu9872@gmail.com",
    phone: "+8801770977764",
    country: "Bangladesh",
    bio: "Full Stack Developer passionate about building modern web applications.",
    github: "",
    linkedin: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal>
      <Button variant="secondary" className="bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800">
        Edit Profile
      </Button>

      <Modal.Backdrop className="bg-black/80 backdrop-blur-sm">
        <Modal.Container placement="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Modal.Dialog className="sm:max-w-2xl rounded-3xl border border-neutral-800 bg-[#050505] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] text-white">
              <Modal.CloseTrigger className="text-neutral-500" />

              <Modal.Header>
                <div className="flex flex-col">
                  <Modal.Heading className="text-2xl text-white font-bold">Edit Profile</Modal.Heading>
                  <p className="mt-2 text-sm text-neutral-500">Update your personal information and social links.</p>
                </div>
              </Modal.Header>

              <Modal.Body className="space-y-8 p-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
                <div className="relative w-fit group">
                  <Image
                    src="https://i.ibb.co.com/R4BGkprT/elg21-bird-8788491.jpg"
                    width={100}
                    height={100}
                    alt='image'
                    className="h-28 w-28 border-4 rounded-full border-black ring-2 ring-neutral-800 group-hover:ring-neutral-600 transition-all duration-300"
                  />
                  <input type="file" id="profile-image" accept="image/*" className="hidden" />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-neutral-700 active:scale-95"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </label>
                </div>

                <Surface variant="default" className="rounded-2xl p-5 bg-neutral-900/30 border border-neutral-800">
                  <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Full Name</Label>
                      <Input 
                        value={formData.fullName} 
                        onChange={(e) => handleChange("fullName", e.target.value)} 
                        className="bg-black border-neutral-800 text-white" 
                      />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Username</Label>
                      <Input 
                        value={formData.username} 
                        onChange={(e) => handleChange("username", e.target.value)} 
                        className="bg-black border-neutral-800 text-white" 
                      />
                    </TextField>
                    <TextField className="md:col-span-2" variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Email</Label>
                      <Input 
                        value={formData.email} 
                        disabled 
                        className="bg-neutral-950 border-neutral-800 text-neutral-600" 
                      />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Phone</Label>
                      <Input 
                        value={formData.phone} 
                        onChange={(e) => handleChange("phone", e.target.value)} 
                        className="bg-black border-neutral-800 text-white" 
                      />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Country</Label>
                      <Input 
                        value={formData.country} 
                        onChange={(e) => handleChange("country", e.target.value)} 
                        className="bg-black border-neutral-800 text-white" 
                      />
                    </TextField>
                    <TextField className="md:col-span-2" variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Bio</Label>
                      <TextArea 
                        rows={4} 
                        value={formData.bio} 
                        onChange={(e: any) => handleChange("bio", e.target.value)} 
                        className="bg-black border-neutral-800 text-white" 
                      />
                    </TextField>
                  </form>
                </Surface>

                <Surface variant="default" className="rounded-2xl p-5 bg-neutral-900/30 border border-neutral-800">
                  <h3 className="mb-5 text-lg font-semibold">Social Links</h3>
                  <div className="space-y-4">
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500">GitHub</Label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 flex items-center pointer-events-none">
                          <FaGithub className="text-neutral-500" />
                        </span>
                        <Input 
                          value={formData.github}
                          onChange={(e) => handleChange("github", e.target.value)}
                          className="bg-black border-neutral-800 text-white pl-10" 
                          placeholder="https://github.com/username" 
                        />
                      </div>
                    </TextField>
                    
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500">LinkedIn</Label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 flex items-center pointer-events-none">
                          <FaLinkedin className="text-neutral-500" />
                        </span>
                        <Input 
                          value={formData.linkedin}
                          onChange={(e) => handleChange("linkedin", e.target.value)}
                          className="bg-black border-neutral-800 text-white pl-10" 
                          placeholder="https://linkedin.com/in/username" 
                        />
                      </div>
                    </TextField>
                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer className="border-t border-neutral-800 p-6">
                <Button slot="close" variant="secondary" className="text-neutral-400 hover:text-white">Cancel</Button>
                <Button slot="close" className="bg-white text-black hover:bg-neutral-200" onPress={() => toast.success("Profile updated successfully")}>Save Changes</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </motion.div>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}