"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

interface MenuProps {
  documentId: Id<"documents">;
  isFavorite?: boolean;
}

export const Menu = ({ documentId, isFavorite }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);
  const toggleFavorite = useMutation(api.documents.toggleFavorite);
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);
  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);
  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
    router.push("/documents");
  };
  const onToggleFavorite = () => {
    setOptimisticFavorite((prev) => !prev);
    const promise = toggleFavorite({ id: documentId });
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
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
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-6 w-8" />;
};
