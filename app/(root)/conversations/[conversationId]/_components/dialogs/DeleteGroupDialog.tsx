"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { error } from "console";
import { ConvexError } from "convex/values";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteGroupDialog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: deleteGroup, pending } = useMutationState(
    api.conversation.deleteGroup
  );

  const handleDeleteGroup = async () => {
    deleteGroup({ conversationId })
      .then(() => {
        toast.success("Đã xóa nhóm");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Đã xảy ra lỗi không mong muốn"
        );
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
          <AlertDialogDescription>
            Không thể hoàn tác hành động này. Tất cả tin nhắn sẽ bị xóa và bạn
            sẽ không thể nhắn tin cho nhóm này.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Huỷ</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>
            Xoá bỏ
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
