"use client";

import { authClient } from "@/lib/auth-Client";
import {
  Button,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

export default function EditProfileModal() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    console.log(formData);
    toast.success("Profile updated successfully");
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        className="bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
      >
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
            <form onSubmit={handleSubmit}>
              <Modal.Dialog className="sm:max-w-2xl max-h-130 rounded-3xl border border-neutral-800 bg-[#050505] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] text-white">
                <Modal.CloseTrigger className="text-neutral-500" />

                <Modal.Header>
                  <div className="flex flex-col">
                    <Modal.Heading className="text-2xl text-white font-bold">
                      Edit Profile
                    </Modal.Heading>
                    <p className="mt-2 text-sm text-neutral-500">
                      Update your personal information and social links.
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body className="space-y-8 p-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
                  <div className="relative w-fit group">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        width={100}
                        height={100}
                        alt="image"
                        className="h-28 w-28 border-4 rounded-full border-black ring-2 ring-neutral-800 group-hover:ring-neutral-600 transition-all duration-300 object-cover"
                      />
                    ) : (
                      <div className="h-28 w-28 border-4 rounded-full border-black ring-2 ring-neutral-800 bg-neutral-800 flex items-center justify-center text-xl font-bold">
                        {user?.name?.[0]}
                      </div>
                    )}
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-neutral-700 active:scale-95"
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </label>
                  </div>

                  <Surface
                    variant="default"
                    className="rounded-2xl p-5 bg-neutral-900/30 border border-neutral-800"
                  >
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Full Name
                        </Label>
                        <input
                          name="name"
                          defaultValue={user?.name}
                          className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white"
                        />
                      </TextField>
                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Username
                        </Label>
                        <input
                          name="username"
                          defaultValue={(user as any)?.username}
                          className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white"
                        />
                      </TextField>
                      <TextField className="md:col-span-2" variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Email
                        </Label>
                        <input
                          name="email"
                          defaultValue={user?.email}
                          disabled
                          className="w-full bg-neutral-950 p-1.5 border border-neutral-800 rounded-lg text-neutral-600 cursor-not-allowed"
                        />
                      </TextField>
                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Phone
                        </Label>
                        <input
                          name="phone"
                          defaultValue={(user as any)?.phone}
                          className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white"
                        />
                      </TextField>
                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Country
                        </Label>
                        <input
                          name="country"
                          defaultValue={(user as any)?.country}
                          className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white"
                        />
                      </TextField>
                      <TextField className="md:col-span-2" variant="secondary">
                        <Label className="text-xs text-neutral-500 uppercase">
                          Bio
                        </Label>
                        <TextArea
                          name="bio"
                          rows={4}
                          defaultValue={(user as any)?.bio}
                          className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white"
                        />
                      </TextField>
                    </div>
                  </Surface>

                  <Surface
                    variant="default"
                    className="rounded-2xl p-5 bg-neutral-900/30 border border-neutral-800"
                  >
                    <h3 className="mb-5 text-lg font-semibold">Social Links</h3>
                    <div className="space-y-4">
                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500">
                          GitHub
                        </Label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 flex items-center pointer-events-none">
                            <FaGithub className="text-neutral-500" />
                          </span>
                          <input
                            name="github"
                            defaultValue={(user as any)?.github}
                            className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white pl-10"
                            placeholder="https://github.com/username"
                          />
                        </div>
                      </TextField>

                      <TextField variant="secondary">
                        <Label className="text-xs text-neutral-500">
                          LinkedIn
                        </Label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 flex items-center pointer-events-none">
                            <FaLinkedin className="text-neutral-500" />
                          </span>
                          <input
                            name="linkedin"
                            defaultValue={(user as any)?.linkedin}
                            className="w-full bg-black p-1.5 border border-neutral-800 rounded-lg text-white pl-10"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </TextField>
                    </div>
                  </Surface>
                </Modal.Body>

                <Modal.Footer className="border-t border-neutral-800 p-6 flex justify-end gap-3">
                  <Button
                    slot="close"
                    variant="secondary"
                    className="text-neutral-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    slot="close"
                    className="bg-white text-black"
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </form>
          </motion.div>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}