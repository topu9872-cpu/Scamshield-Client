"use client";

import {
  Avatar,
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { motion } from "framer-motion";
import { Camera, Globe, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

export default function EditProfileModal() {
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
              <Modal.CloseTrigger className="text-neutral-500 hover:text-white" />

              <Modal.Header>
                <div className="flex flex-col">
                  <Modal.Heading className="text-2xl text-white font-bold">Edit Profile</Modal.Heading>
                  <p className="mt-2 text-sm text-neutral-500">Update your personal information and social links.</p>
                </div>
              </Modal.Header>

              {/* ADDED: overflow-y-auto and max-h-[70vh] to make the body scrollable */}
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
                      <Input defaultValue="Mehedi Hasan Topu" className="bg-black border-neutral-800 text-white" />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Username</Label>
                      <Input defaultValue="@topu9872" className="bg-black border-neutral-800 text-white" />
                    </TextField>
                    <TextField className="md:col-span-2" variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Email</Label>
                      <Input defaultValue="topu9872@gmail.com" disabled className="bg-neutral-950 border-neutral-800 text-neutral-600" />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Phone</Label>
                      <Input defaultValue="+8801770977764" className="bg-black border-neutral-800 text-white" />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Country</Label>
                      <Input defaultValue="Bangladesh" className="bg-black border-neutral-800 text-white" />
                    </TextField>
                    <TextField className="md:col-span-2" variant="secondary">
                      <Label className="text-xs text-neutral-500 uppercase">Bio</Label>
                      <TextArea rows={4} defaultValue="Full Stack Developer passionate about building modern web applications." className="bg-black border-neutral-800 text-white" />
                    </TextField>
                  </form>
                </Surface>

                <Surface variant="default" className="rounded-2xl p-5 bg-neutral-900/30 border border-neutral-800">
                  <h3 className="mb-5 text-lg font-semibold">Social Links</h3>
                  <div className="space-y-4">
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500">GitHub</Label>
                      <Input startContent={<FaGithub className="text-neutral-500" />} className="bg-black border-neutral-800 text-white" placeholder="https://github.com/username" />
                    </TextField>
                    <TextField variant="secondary">
                      <Label className="text-xs text-neutral-500">LinkedIn</Label>
                      <Input startContent={<FaLinkedin className="text-neutral-500" />} className="bg-black border-neutral-800 text-white" placeholder="https://linkedin.com/in/username" />
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