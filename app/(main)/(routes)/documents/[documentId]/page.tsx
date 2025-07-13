"use client";

import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { X } from "lucide-react";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const { documentId } = React.use(params);
  const document = useQuery(api.documents.getById, {
    documentId: documentId as Id<"documents">,
  });
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  if (!documentId) {
    return <div>Invalid document ID</div>;
  }

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Not Found</div>;
  }
  const onChange = (content: string) => {
    update({
      id: documentId as Id<"documents">,
      content,
    });
  };
  const handleRemoveIcon = () => {
    removeIcon({ id: documentId as Id<"documents"> });
  };
  return (
    <div className="pb-40">
      <div className="relative">
        <Cover url={document.coverImage} />
        {!!document.icon && (
          <div className="absolute left-[7%] -bottom-[2.5rem] -translate-x-1/2 z-20 group">
            <div
              className="relative w-20 h-20 flex items-center justify-center text-5xl select-none"
              aria-label="Document icon"
              tabIndex={0}
            >
              {document.icon}
              {/* Remove Icon Button */}
              <button
                type="button"
                onClick={handleRemoveIcon}
                className="absolute -top-1 -right-1 bg-white border rounded-md p-1 shadow hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-ring/50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                aria-label="Remove icon"
                tabIndex={0}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="md:max-w-3xl lg:max-w-5xl mx-8">
        <Toolbar initialData={document} hideIcon />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
