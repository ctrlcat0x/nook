"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="flex">
        <Image
          src="/doc2-light.png"
          height="400"
          width="400"
          alt="empty"
          className="block"
        />
        <Image
          src="/doc-light.png"
          height="400"
          width="400"
          alt="empty"
          className="hidden lg:block"
        />
      </div>
      <h2 className="text-xl md:text-2xl font-medium">
        Welcome {user?.fullName}, let&apos;s get your thoughts out
      </h2>
      <Button size="lg" onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-1 mt-0.5" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
