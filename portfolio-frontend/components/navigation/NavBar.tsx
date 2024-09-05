"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Code, User } from "lucide-react";
import Link from "next/link";
import React from "react";

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
    icon: <User />,
    id: "resume",
    onClick: () => scrollToDivWithOffset("resume"),
  },
  {
    label: "Side Projects",
    icon: <User />,
    id: "side-projects",
    onClick: () => scrollToDivWithOffset("side-projects"),
  },
  {
    label: "Portfolio",
    icon: <User />,
    id: "portfolio",
    onClick: () => scrollToDivWithOffset("portfolio"),
  },
  {
    label: "Contacts",
    icon: <User />,
    id: "contacts",
    onClick: () => scrollToDivWithOffset("contacts"),
  },
];

const NavBar = () => {
  return (
    <div>
      <NavigationMenu className="w-screen p-4">
        <NavigationMenuList>
          {items.map((item) => {
            return (
              <NavigationMenuItem key={item.id}>
                <Button
                  className="bg-primary"
                  variant="outline"
                  onClick={item.onClick}
                >
                  {item.icon} {item.label}
                </Button>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
