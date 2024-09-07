"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import useNavbarItems from "@/app/hooks/useContacts";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import useProgression from "@/app/hooks/useProgression";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const NavBarMobile = () => {
  const { contacts, items } = useNavbarItems();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickItem = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary p-2">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-navbarsheet border-none grid grid-cols-1 gap-2">
        <div
          className="flex items-center justify-center"
          onClick={() =>
            handleClickItem(() => scrollToDivWithOffset(Section.Init))
          }
        >
          <Image
            src="/robin.png"
            width={120}
            height={120}
            alt="Robin Moreno Rinding"
            className="rounded-full shadow-md"
          />
        </div>
        <SheetHeader>
          <SheetTitle className="text-white">Robin Moreno Rinding</SheetTitle>
          <SheetDescription>
            Fullstack Developer • Tech Enthusiast • Lifelong Learner
          </SheetDescription>
          <div className="grid grid-cols-1 gap-1 mt-2">
            {items.map((item) => {
              return (
                <Button
                  key={item.id}
                  className="bg-navbarsheet flex justify-start gap-3"
                  onClick={() => handleClickItem(item.onClick)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              );
            })}
          </div>
        </SheetHeader>
        <SheetFooter className="flex-col justify-end gap-3">
          <SheetDescription>
            Feel free to contact me on any of the options below
          </SheetDescription>
          <div className="grid grid-cols-4 gap-1">
            {contacts.map((contact) => {
              return (
                <div key={contact.url}>
                  {contact.onClick ? (
                    <Button
                      className="bg-primary w-full"
                      onClick={contact.onClick}
                    >
                      {contact.icon}
                    </Button>
                  ) : (
                    <Link
                      href={contact.url}
                      target="__blank"
                      className="w-full"
                    >
                      <Button className="bg-primary w-full">
                        {contact.icon}
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const NavBarDesktop = () => {
  const { contacts, items } = useNavbarItems();
  return (
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
  );
};

const NavBar = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)", //From tailwind: https://tailwindcss.com/docs/screens
  });
  const scrollPercentage = useProgression();

  return (
    <NavigationMenu id="navbar-container" className="w-screen bg-navbar fixed">
      <div className="p-4 w-full h-full flex justify-between">
        <Avatar onClick={() => scrollToDivWithOffset(Section.Init)}>
          <AvatarImage src="/robin.png" alt="R" />
          <AvatarFallback className="bg-primary">R</AvatarFallback>
        </Avatar>
        {isDesktopOrLaptop ? <NavBarDesktop /> : <NavBarMobile />}
      </div>
      <Progress
        value={scrollPercentage}
        // className="bg-indigo-500 [&>*]:bg-indigo-500'"
        style={{ height: "1px" }}
      />
    </NavigationMenu>
  );
};

export default NavBar;
