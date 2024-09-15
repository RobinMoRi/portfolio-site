import LineProgress, {
  DataPoint,
} from "@/app/components/progress/LineProgress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repo } from "@/lib/api";
import { languageColorMap } from "@/lib/contants";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import React from "react";

const RepoCard = ({ repo }: { repo: Repo }) => {
  const totalBytes = Object.values(repo.languages).reduce(
    (tot, curr) => tot + curr,
    0
  );
  const dataPoints: DataPoint[] = Object.entries(repo.languages).map(
    ([lang, bytes]) => {
      let language = "default";
      if (lang) {
        language = lang.toLowerCase();
      }
      return {
        lang,
        color: languageColorMap[language],
        width: Math.round((bytes / totalBytes) * 100) / 100,
      };
    }
  );
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
        <Separator className="bg-slate-500 dark:bg-slate-500" />
        <CardContent className="p-0">
          <LineProgress dataPoints={dataPoints} />
          <div className="flex flex-wrap mt-2 gap-1">
            {Object.keys(repo.languages).map((lang) => {
              return (
                <Badge
                  key={`${repo.id}-${lang}`}
                  style={{
                    backgroundColor: `${languageColorMap[lang.toLowerCase()]}A6`,
                  }}
                >
                  {lang}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RepoCard;
