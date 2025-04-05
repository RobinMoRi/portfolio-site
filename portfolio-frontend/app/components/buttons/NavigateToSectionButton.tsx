"use client";
import { Button } from "@/components/ui/button";
import { Section } from "@/types/navbar";
import { scrollToDivWithOffset } from "@/utils";
import { ChevronsDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const NavigateToSectionButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const initSection = document.getElementById(Section.Init);
      if (initSection) {
        const rect = initSection.getBoundingClientRect();
        setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Button onClick={() => scrollToDivWithOffset(Section.AboutMe)}>
      <ChevronsDown />
    </Button>
  );
};

export default NavigateToSectionButton;
