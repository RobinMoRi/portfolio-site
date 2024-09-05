"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { toast, useToast } from "@/hooks/use-toast";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BriefcaseBusiness,
  Code,
  File,
  Folder,
  Mail,
  Menu,
  Smartphone,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

function scrollToDivWithOffset(id: string) {
  const element = document.getElementById(id);
  const offset = 72; //Fix offset
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } else {
    console.error("Element with ID " + id + " not found.");
  }
}

const items = [
  {
    label: "About Me",
    icon: <User />,
    id: "about-me",
    onClick: () => scrollToDivWithOffset("about-me"),
  },
  {
    label: "Skills",
    icon: <Code />,
    id: "skills",
    onClick: () => scrollToDivWithOffset("skills"),
  },
  {
    label: "Resume",
    icon: <File />,
    id: "resume",
    onClick: () => scrollToDivWithOffset("resume"),
  },
  {
    label: "Side Projects",
    icon: <BriefcaseBusiness />,
    id: "side-projects",
    onClick: () => scrollToDivWithOffset("side-projects"),
  },
  {
    label: "Portfolio",
    icon: <Folder />,
    id: "portfolio",
    onClick: () => scrollToDivWithOffset("portfolio"),
  },
];

const NavBar = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)", //From tailwind: https://tailwindcss.com/docs/screens
  });
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Clipboard",
        description: "Number copied to clipboard",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Clipboard",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const contacts = [
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

  return (
    <NavigationMenu className="w-screen p-4 bg-navbar flex justify-between ">
      <Avatar>
        <AvatarImage src="/robin.png" alt="@shadcn" />
        <AvatarFallback className="bg-primary">R</AvatarFallback>
      </Avatar>
      {isDesktopOrLaptop ? (
        <>
          <NavigationMenuList>
            {items.map((item) => {
              return (
                <NavigationMenuItem key={item.id}>
                  <Button className="bg-primary" onClick={item.onClick}>
                    {item.label}
                  </Button>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
          <NavigationMenuList>
            {contacts.map((contact) => {
              return (
                <NavigationMenuItem key={contact.url}>
                  {contact.onClick ? (
                    <Button className="bg-primary" onClick={contact.onClick}>
                      {contact.icon}
                    </Button>
                  ) : (
                    <Link href={contact.url} target="__blank">
                      <Button className="bg-primary">{contact.icon}</Button>
                    </Link>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </>
      ) : (
        <DropdownMenu onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger>
            {!isMenuOpen ? <Menu /> : <X />}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Robin Moreno Rinding</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {items.map((item) => {
                return (
                  <DropdownMenuItem key={item.id}>
                    <Button
                      className="bg-primary w-full flex justify-between"
                      onClick={item.onClick}
                    >
                      {item.label}
                      {item.icon}
                    </Button>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {contacts.map((contact) => {
                return (
                  <DropdownMenuItem key={contact.url}>
                    {contact.onClick ? (
                      <Button
                        className="bg-primary w-full flex justify-between"
                        onClick={contact.onClick}
                      >
                        {contact.label}
                        {contact.icon}
                      </Button>
                    ) : (
                      <Link
                        href={contact.url}
                        target="__blank"
                        className="w-full"
                      >
                        <Button className="bg-primary w-full flex justify-between">
                          {contact.label}
                          {contact.icon}
                        </Button>
                      </Link>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </NavigationMenu>
  );
};

export default NavBar;
