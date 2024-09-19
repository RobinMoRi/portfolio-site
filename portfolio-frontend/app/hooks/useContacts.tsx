"use client";

import { Contacts, NavBarItems, Section } from "@/types/navbar";
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
import React from "react";
import useClipboard from "./useClipboard";

const useNavbarItems = () => {
  const { copyToClipboard } = useClipboard();

  const writeStepToUrl = (step: string) => {
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
      onClick: () =>
        copyToClipboard("+46737514695", "Number copied to clipboard"),
    },
  ];
  const items: NavBarItems = [
    {
      label: "About Me",
      icon: <User />,
      id: Section.AboutMe,
      onClick: () => writeStepToUrl(Section.AboutMe),
    },
    {
      label: "Skills",
      icon: <Code />,
      id: Section.Skills,
      onClick: () => writeStepToUrl(Section.Skills),
    },
    {
      label: "Resume",
      icon: <File />,
      id: Section.Resume,
      onClick: () => writeStepToUrl(Section.Resume),
    },
    {
      label: "Side Projects",
      icon: <BriefcaseBusiness />,
      id: Section.SideProjects,
      onClick: () => writeStepToUrl(Section.SideProjects),
    },
    {
      label: "Portfolio",
      icon: <Folder />,
      id: Section.Portfolio,
      onClick: () => writeStepToUrl(Section.Portfolio),
    },
  ];

  return {
    contacts,
    items,
  };
};

export default useNavbarItems;
