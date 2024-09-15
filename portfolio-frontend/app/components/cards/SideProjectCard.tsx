import { Button } from "@/components/ui/button";
import { SideprojectDocument } from "@/prismicio-types";
import { asLink } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { Calendar, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="mb-3 text-3xl font-bold text-gray-900">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mb-4 text-2xl font-bold text-gray-900">{children}</h3>
  ),
  paragraph: ({ children }) => (
    <p className="my-2 text-slate-400 text-xs">{children}</p>
  ),
};

const SideProjectCard = ({
  sideProject,
}: {
  sideProject: SideprojectDocument<string>;
}) => {
  const data = sideProject.data;

  return (
    <div className="rounded-lg bg-slate-900 w-full">
      <div className="rounded-t-lg relative max-h-40 overflow-hidden">
        <div className="overlay ease-in absolute top-0 h-full w-full flex items-center justify-center gap-2 bg-slate-500/50 opacity-0 hover:opacity-100">
          {data.externalurls.map((url) => {
            return (
              <Link
                key={asLink(url.externalurl)}
                href={asLink(url.externalurl) as string}
                target="_blank"
              >
                <Button>
                  <LinkIcon />
                </Button>
              </Link>
            );
          })}
        </div>
        <Image
          src={`${data.image.url}` || ""} //TODO: add default image...
          alt={data.image.alt || "Side project image"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="px-2 pb-2">
        <div className="mt-4">{data.title}</div>
        <div className="flex gap-2 text-slate-400 text-xs mt-2">
          <Calendar size={18} />
          <div>
            {format(new Date(String(data.start)), "MMM. yyyy")} -{" "}
            {data.end
              ? format(new Date(String(data.end)), "MMM. yyyy")
              : "Ongoing"}
          </div>
        </div>
        <PrismicRichText field={data.description} components={components} />
      </div>
    </div>
  );
};

export default SideProjectCard;
