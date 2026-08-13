"use client";

import { ScanHistoryDelete } from "@/app/api/serverAction";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteProjectDialog({ item }) {
const router=useRouter()
const handleDelete = async () => {
    try {
      const res = await ScanHistoryDelete(item._id);

      if (res?.success || res?.acknowledged) {
        toast.success(`${item.value} is deleted`);
        router.refresh();
      } else {
        toast.error(`${item.value} is not deleted`);
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
      console.error(error);
    }
  };
  
  return (
    <AlertDialog>
      <Button
        isIconOnly
        variant="ghost"
        className="h-8 w-8 rounded-lg text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
      >
        <Trash2 size={16} />
      </Button>

      <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-md">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md rounded-3xl border border-white/10 bg-[#0b0b10] shadow-2xl">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header className="pt-8">
              <AlertDialog.Icon status="danger" className="mb-2 h-16 w-16" />

              <AlertDialog.Heading className="text-2xl font-bold text-white">
                Delete Project?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="text-center text-neutral-400 leading-7">
              This action will permanently delete <br />
              <span className="font-semibold  text-white">({item.value})</span>
              <br />
              All associated data will be removed and cannot be recovered.
            </AlertDialog.Body>

            <AlertDialog.Footer className="mt-4 gap-3">
              <Button
                slot="close"
                variant="secondary"
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>

              <Button
              onClick={handleDelete}
                slot="close"
                variant="danger"
                className="flex-1 rounded-xl font-semibold"
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
