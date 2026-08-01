"use client";

import { authClient } from "@/lib/auth-Client";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setCurrentPassword("");
    setNewPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await authClient.changePassword({
      currentPassword,
      newPassword,
    });

    if (data) {
      toast.success("Password changed successfully");
      closeModal();
    } else {
      toast.error(error?.message || "Failed to change password");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left text-white cursor-pointer"
      >
        <span>Change Password</span>
        <Lock size={14} className="text-neutral-500" />
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle backdrop:bg-black/80">
        <div className="modal-box bg-neutral-900 border border-neutral-800 text-white shadow-2xl">
          <h3 className="font-bold text-lg">Change Password</h3>
          <p className="py-2 text-sm text-neutral-400">
            Enter your current password and a new secure password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="text-xs text-neutral-500 uppercase">
                Current Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-black p-2 pr-10 border border-neutral-800 rounded-lg text-white outline-none focus:border-neutral-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-neutral-500 uppercase">
                New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black p-2 pr-10 border border-neutral-800 rounded-lg text-white outline-none focus:border-neutral-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="modal-action flex justify-end gap-2 pt-4 border-t border-neutral-800 mt-6">
              <button
                type="button"
                className="btn bg-neutral-800 text-white hover:bg-neutral-700 border-none"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-white text-black hover:bg-neutral-200 border-none"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal} type="button">close</button>
        </form>
      </dialog>
    </>
  );
}