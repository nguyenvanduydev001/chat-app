"use client";

import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);

  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);

  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);

  return conversation === undefined ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      Không tìm thấy cuộc trò chuyện
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
        conversationId={conversationId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <LeaveGroupDialog
        conversationId={conversationId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <DeleteGroupDialog
        conversationId={conversationId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherNumber?.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherNumber?.imageUrl
        }
        option={
          conversation.isGroup
            ? [
                {
                  label: "Rời khỏi nhóm",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Xóa nhóm",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
              ]
            : [
                {
                  label: "Xóa bạn bè",
                  destructive: true,
                  onClick: () => setRemoveFriendDialogOpen(true),
                },
              ]
        }
      />
      {/* <Body
        members={
          conversation.isGroup
            ? conversation.otherNumbers
              ? conversation.otherNumbers
              : []
            : conversation.otherNumbers
              ? [conversation.otherNumber]
              : []
        }
      /> */}
      <Body
        members={
          conversation.isGroup
            ? Array.isArray(conversation.otherNumbers)
              ? conversation.otherNumbers.filter(
                  (member) => member && member.username
                )
              : []
            : conversation.otherNumber
              ? [conversation.otherNumber]
              : []
        }
      />
      <ChatInput />
    </ConversationContainer>
  );
};
export default ConversationPage;
