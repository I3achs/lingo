"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);


  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div
            className="flex items-center w-full
                 justify-center mb-5"
          >
            <Image
              src="/heart.svg"
              alt="Heart"
              height={100}
              width={100} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Bài học luyện tập
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Sử dụng bài học luyện tập để hồi phục tim và điểm. Bạn sẽ không mất tim hoặc điểm trong bài học luyện tập.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Tôi đã hiểu
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
