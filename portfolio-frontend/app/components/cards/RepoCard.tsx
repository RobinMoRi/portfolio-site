import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
        <CardTitle className="text-white text-md hover:text-timeline-active">
          <Link href={repo.html_url} target="_blank">
            {repo.name}
          </Link>
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      {/* <CardContent className="text-white">
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default RepoCard;
