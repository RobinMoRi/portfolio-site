"use client";
import useDevice from "@/app/hooks/useDevice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReusableexperienceDocument } from "@/prismicio-types";
import { components } from "@/slices/TextBlock";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";

const TimelineDialogMobile = ({
  experience,
  trigger,
}: {
  experience: ReusableexperienceDocument<string>;
  trigger: React.ReactNode;
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="w-fit">{trigger}</DrawerTrigger>
      <DrawerContent className="bg-navbarsheet">
        <DrawerHeader>
          <DrawerTitle>
            <div>{experience.data.title}</div>
            <div>{experience.data.institute}</div>
            <div className="flex gap-2 text-slate-400 text-sm">
              <Calendar size={18} />
              <div>
                {format(new Date(String(experience.data.start)), "MMM. yyyy")} -{" "}
                {experience.data.end
                  ? format(new Date(String(experience.data.end)), "MMM. yyyy")
                  : "Ongoing"}
              </div>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            <PrismicRichText
              field={experience.data.description}
              components={components}
            />
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

const TimelineDialogDesktop = ({
  experience,
  trigger,
}: {
  experience: ReusableexperienceDocument<string>;
  trigger: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start w-fit">
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-navbarsheet">
        <DialogHeader>
          <DialogTitle>{experience.data.title}</DialogTitle>
          <DialogDescription>
            <PrismicRichText
              field={experience.data.description}
              components={components}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const TimelineDialog = ({
  experience,
  trigger,
}: {
  experience: ReusableexperienceDocument<string>;
  trigger: React.ReactNode;
}) => {
  const { isDesktopOrLaptop } = useDevice();

  return isDesktopOrLaptop ? (
    <TimelineDialogDesktop experience={experience} trigger={trigger} />
  ) : (
    <TimelineDialogMobile experience={experience} trigger={trigger} />
  );
};

export default TimelineDialog;
