"use client";
import useProgression from "@/app/hooks/useProgression";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import React from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

import useClient from "@/app/hooks/useClient";
import useDevice from "@/app/hooks/useDevice";

const NavBar = () => {
  const { isDesktopOrLaptop } = useDevice();
  const scrollPercentage = useProgression();
  const { isMounted } = useClient();

  const content = isDesktopOrLaptop ? <NavBarDesktop /> : <NavBarMobile />;

  return (
    <NavigationMenu id="navbar-container" className="w-screen bg-navbar fixed">
      <div className="p-4 w-full h-full flex justify-between">
        <div className="flex gap-2 items-center">
          <Avatar
            onClick={() => scrollToDivWithOffset(Section.Init)}
            className="cursor-pointer"
          >
            <AvatarImage src="/robin.png" alt="R" />
            <AvatarFallback className="bg-primary">R</AvatarFallback>
          </Avatar>
          Robin Moreno Rinding
        </div>
        {isMounted ? content : null}
      </div>
      <Progress value={scrollPercentage} style={{ height: "1px" }} />
    </NavigationMenu>
  );
};

export default NavBar;
