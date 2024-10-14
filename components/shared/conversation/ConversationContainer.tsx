import { Card } from "@/components/ui/card";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const ConversationContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[calc(100svh-32px)] lg:h-full flex p-2 flex-col gap-2">
      {children}
    </Card>
  );
};

export default ConversationContainer;
