"use client";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ItemProps {
  id?: Id<"documents">;
  docmentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  isFavorite?: boolean;
  lastEdited?: number;
}

export const Item = ({
  id,
  active,
  docmentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
  label,
  onClick,
  icon: Icon,
  isFavorite,
  lastEdited,
}: ItemProps) => {
  const user = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const toggleFavorite = useMutation(api.documents.toggleFavorite);
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);
  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => router.push(`/documents/`));
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note",
    });
  };
  const onToggleFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    setOptimisticFavorite((prev) => !prev);
    const promise = toggleFavorite({ id });
    toast.promise(promise, {
      loading: optimisticFavorite
        ? "Removing from favourites..."
        : "Adding to favourites...",
      success: optimisticFavorite
        ? "Removed from favourites!"
        : "Added to favourites!",
      error: "Failed to update favourite status",
    });
  };
  const handleExpand = () => {
    onExpand?.();
  };
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 6}px` : "6px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 rounded-sm mb-0.5 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {/* Icon/Chevron stack for document items, plain icon for others */}
      {!!id && onExpand ? (
        <div className="relative shrink-0 mr-2 w-[18px] h-[18px] flex items-center justify-center">
          {docmentIcon ? (
            <span className="absolute inset-0 flex items-center justify-center transition-opacity opacity-100 group-hover:opacity-0">
              {docmentIcon}
            </span>
          ) : (
            <Icon className="absolute inset-0 h-[18px] w-[18px] text-muted-foreground transition-opacity opacity-100 group-hover:opacity-0" />
          )}
          <div
            role="button"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={(e) => {
              e.stopPropagation();
              handleExpand();
            }}
            tabIndex={0}
            aria-label={expanded ? "Collapse" : "Expand"}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                handleExpand();
              }
            }}
          >
            {!expanded ? (
              <ChevronRight className="h-4 w-4 shrink-0 to-muted-foreground/50 rotate-0 transition ease-in-out" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 to-muted-foreground/50 rotate-90 transition ease-in-out" />
            )}
          </div>
        </div>
      ) : docmentIcon ? (
        <div className="shrink-0 mr-2">{docmentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl K</span>
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className=" transition ease-in-out opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onToggleFavorite}>
                {optimisticFavorite ? (
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-yellow-400" />
                ) : (
                  <Star className="h-4 w-4 mr-2" />
                )}
                {optimisticFavorite ? "Remove from starred" : "Add to starred"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}>
                <Trash2 className="h-4 w-4 mr-2" />
                <p className="text-destructive">Move to trash</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user.user?.fullName}
                {typeof lastEdited === "number" && (
                  <div className="mt-1">
                    Last edited: {formatTimeAgo(lastEdited)}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 transition ease-in-out group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

function formatTimeAgo(date: number) {
  const now = Date.now();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  if (diff < 172800) return "yesterday";
  return `${Math.floor(diff / 86400)} days ago`;
}
