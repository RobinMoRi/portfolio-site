"use client";
import useDevice from "@/app/hooks/useDevice";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLocationFromLongLat, GeoLocation } from "@/lib/api";
import { ReusableexperienceDocument } from "@/prismicio-types";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mb-3 text-3xl font-bold text-gray-900">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mb-4 text-2xl font-bold text-gray-900">{children}</h3>
  ),
  paragraph: ({ children }) => (
    <p className="mt-4 text-slate-300">{children}</p>
  ),
};

const TimelineSkills = ({
  experience,
}: {
  experience: ReusableexperienceDocument<string>;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {experience.data.skills.map((skill) => {
        return <Badge>{skill.skill}</Badge>;
      })}
    </div>
  );
};

const TimelineTitle = ({
  experience,
}: {
  experience: ReusableexperienceDocument<string>;
}) => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  useEffect(() => {
    const long = experience.data.location.longitude;
    const lat = experience.data.location.latitude;
    fetchLocationFromLongLat({
      long: String(long),
      lat: String(lat),
      client: true,
    }).then(setLocation);
  }, []);
  if (experience.data.skills.length <= 0) return;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-md">{experience.data.title}</div>
      <div className="text-slate-400 text-md">{experience.data.institute}</div>
      <div className="flex gap-2 text-slate-400 text-sm">
        <Calendar size={18} />
        <div>
          {format(new Date(String(experience.data.start)), "MMM. yyyy")} -{" "}
          {experience.data.end
            ? format(new Date(String(experience.data.end)), "MMM. yyyy")
            : "Ongoing"}
        </div>
      </div>{" "}
      {location ? (
        <div className="flex gap-2 text-slate-400 text-sm">
          <MapPin size={18} />
          <div>
            {location.address.county}, {location.address.country}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Skeleton className="w-[20px] h-[20px] rounded-full" />
          <Skeleton className="w-[100px] h-[10px] rounded-md" />
        </div>
      )}
    </div>
  );
};

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
      <DrawerContent className="bg-navbarsheet border-slate-800">
        <DrawerHeader>
          <DrawerTitle>
            <TimelineTitle experience={experience} />
          </DrawerTitle>
          <DrawerDescription>
            <PrismicRichText
              field={experience.data.description}
              components={components}
            />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-0">
          <Separator className="mb-4 bg-slate-500" />
          <TimelineSkills experience={experience} />
        </DrawerFooter>
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
      <DialogContent className="bg-navbarsheet border-slate-800">
        <DialogHeader>
          <DialogTitle>
            <TimelineTitle experience={experience} />
          </DialogTitle>
          <DialogDescription>
            <PrismicRichText
              field={experience.data.description}
              components={components}
            />
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-slate-500" />
        <DialogFooter>
          <TimelineSkills experience={experience} />
        </DialogFooter>
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
