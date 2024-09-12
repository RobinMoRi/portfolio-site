"use client";

import useNavbarItems from "@/app/hooks/useContacts";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

const NavBarDesktop = () => {
  const { contacts, items } = useNavbarItems();
  return (
    <>
      <NavigationMenuList>
        {items.map((item) => {
          return (
            <NavigationMenuItem key={item.id}>
              <Button
                className="bg-primary hover:text-timeline-active"
                onClick={item.onClick}
              >
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
                <Button
                  className="bg-primary hover:text-timeline-active"
                  onClick={contact.onClick}
                >
                  {contact.icon}
                </Button>
              ) : (
                <Link href={contact.url} target="__blank">
                  <Button className="bg-primary hover:text-timeline-active">
                    {contact.icon}
                  </Button>
                </Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </>
  );
};

export default NavBarDesktop;
