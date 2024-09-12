import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repo } from "@/lib/api";
import Link from "next/link";
import React from "react";

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <Card className="bg-slate-900 border-slate-500 shadow-md">
      <CardHeader>
        <CardTitle className="text-white text-xs hover:text-timeline-active">
          <Link href={repo.html_url} target="_blank">
            {repo.name}
          </Link>
        </CardTitle>
        <CardDescription className="truncate">
          {repo.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RepoCard;
