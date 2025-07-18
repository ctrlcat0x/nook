"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash2, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");
  const [isEmptying, setIsEmptying] = useState(false);
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  const handleEmptyTrash = async () => {
    if (!documents || documents.length === 0) return;
    setIsEmptying(true);
    const ids = documents.map((doc) => doc._id);
    const promises = ids.map((id) => remove({ id }));
    toast.promise(Promise.all(promises), {
      loading: "Emptying trash...",
      success: "Trash emptied!",
      error: "Failed to empty trash",
    });
    // If current doc is in trash, redirect
    if (
      params.documentId &&
      ids.includes(params.documentId as Id<"documents">)
    ) {
      router.push("/documents");
    }
    await Promise.all(promises);
    setIsEmptying(false);
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="text-sm flex flex-col min">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1 flex-1">
        <p className="hidden last:block text-sm text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="w-4 h-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
      {/* Empty Trash Button */}
      {documents && documents.length > 0 && (
        <Button
          variant="default"
          className="mt-2 mx-2 mb-1 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed "
          onClick={handleEmptyTrash}
          disabled={isEmptying}
          aria-label="Empty Trash"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !isEmptying)
              handleEmptyTrash();
          }}
        >
          {isEmptying ? "Emptying..." : "Empty Trash"}
        </Button>
      )}
    </div>
  );
};
