"use client";

import { Contacts, NavBarItems } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BriefcaseBusiness,
  Code,
  File,
  Folder,
  Mail,
  Smartphone,
  User,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useClipboard from "./useClipboard";

const useNavbarItems = () => {
  const { copyToClipboard } = useClipboard();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const writeStepToUrl = (step: string) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("step", step);
    // router.replace(`${pathname}?${params.toString()}`);
    scrollToDivWithOffset(step);
  };

  const contacts: Contacts = [
    {
      label: "Linkedin",
      icon: <FontAwesomeIcon size="xl" icon={faLinkedinIn} className="fa-fw" />,
      url: "https://www.linkedin.com/in/romori/",
    },
    {
      label: "Github",
      icon: <FontAwesomeIcon size="xl" icon={faGithub} />,
      url: "https://github.com/RobinMoRi",
    },
    {
      label: "Email",
      icon: <Mail />,
      url: "mailto:robin.moreno.rinding@gmail.com",
    },
    {
      label: "Phone",
      icon: <Smartphone />,
      url: "+46737514695",
      onClick: () => copyToClipboard("+46737514695"),
    },
  ];
  const items: NavBarItems = [
    {
      label: "About Me",
      icon: <User />,
      id: "about-me",
      onClick: () => writeStepToUrl("about-me"),
    },
    {
      label: "Skills",
      icon: <Code />,
      id: "skills",
      onClick: () => writeStepToUrl("skills"),
    },
    {
      label: "Resume",
      icon: <File />,
      id: "resume",
      onClick: () => writeStepToUrl("resume"),
    },
    {
      label: "Side Projects",
      icon: <BriefcaseBusiness />,
      id: "side-projects",
      onClick: () => writeStepToUrl("side-projects"),
    },
    {
      label: "Portfolio",
      icon: <Folder />,
      id: "portfolio",
      onClick: () => writeStepToUrl("portfolio"),
    },
  ];

  return {
    contacts,
    items,
  };
};

export default useNavbarItems;
