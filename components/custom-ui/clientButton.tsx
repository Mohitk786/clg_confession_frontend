import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const ClientButton = ({text, clickHandler}: {text: string, clickHandler: () => void}) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="text-gray-500 hover:text-gray-700 transition-colors"
      onClick={clickHandler}
    >
      <button>
        <ArrowLeft className="w-4 h-4 mr-2" />
        {text}
      </button>
    </Button>
  );
};

export default ClientButton;
