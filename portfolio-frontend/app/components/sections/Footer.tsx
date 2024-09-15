import React from "react";

import { SliceZone } from "@prismicio/react";
import { Metadata } from "next";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function FooterContent() {
  const client = createClient();
  const page = await client.getSingle("footercontent");

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("footercontent");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

const AboutMe = () => {
  return (
    <div className="bg-slate-900 mt-8 p-8 text-xs">
      <FooterContent />
    </div>
  );
};

export default AboutMe;
