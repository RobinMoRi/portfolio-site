"use client";
import useProgression from "@/app/hooks/useProgression";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import React, { useEffect } from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

import useClient from "@/app/hooks/useClient";
import useDevice from "@/app/hooks/useDevice";

const NavBar = () => {
  const { isDesktopOrLaptop } = useDevice();
  const scrollPercentage = useProgression();
  const { isMounted } = useClient();

  useEffect(() => {
    console.info(
      "\r\n  ___     _    _        __  __                        ___ _         _ _           \r\n | _ \\___| |__(_)_ _   |  \\/  |___ _ _ ___ _ _  ___  | _ (_)_ _  __| (_)_ _  __ _ \r\n |   / _ \\ '_ \\ | ' \\  | |\\/| / _ \\ '_/ -_) ' \\/ _ \\ |   / | ' \\/ _` | | ' \\/ _` |\r\n |_|_\\___/_.__/_|_||_| |_|  |_\\___/_| \\___|_||_\\___/ |_|_\\_|_||_\\__,_|_|_||_\\__, |\r\n                                                                            |___/ "
    );
    console.info(
      "Welcome to my portfolio site.\n\nFeel free to contact me at:\nTel: +46737514695\nEmail: robin.moreno.rinding@gmail.com"
    );
  }, []);

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
