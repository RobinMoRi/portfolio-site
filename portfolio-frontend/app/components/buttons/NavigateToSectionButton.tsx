"use client";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import { ChevronsDown } from "lucide-react";
import React from "react";

const NavigateToSectionButton = () => {
  return (
    <Button onClick={() => scrollToDivWithOffset(Section.AboutMe)}>
      <ChevronsDown />
    </Button>
  );
};

export default NavigateToSectionButton;
