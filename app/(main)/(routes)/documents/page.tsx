"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Clock, Lightbulb, SquarePen, Star, View } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const recentDocs = useQuery(api.documents.getRecent);
  const favoriteDocs = useQuery(api.documents.getFavorites);
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
    <div className="h-full flex flex-col justify-start px-4 pt-12 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 w-full text-center">
        Good {getGreeting()}, {user?.firstName || user?.fullName || "there"}!
      </h1>
      <div className="w-full mb-10 text-muted-foreground">
        <div className="flex items-center mb-3 gap-x-2">
          <Clock className="w-4 h-4" />
          <h2 className="text-md font-semibold mb-0.5">Recent work</h2>
        </div>
        {recentDocs === undefined ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-48 h-32 bg-muted rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ) : recentDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">
              No recent documents yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {recentDocs.slice(0, 5).map((doc) => (
              <button
                key={doc._id}
                onClick={() => router.push(`/documents/${doc._id}`)}
                className="w-full h-32 bg-secondary border border-muted rounded-lg flex flex-col items-start justify-end p-4 shadow-sm hover:shadow-md transition group relative overflow-hidden"
                tabIndex={0}
                aria-label={`Open ${doc.title}`}
              >
                {/* Cover image */}
                {doc.coverImage && (
                  <Image
                    src={doc.coverImage}
                    alt="cover"
                    className="absolute top-0 left-0 w-full h-20 object-cover rounded-t-lg"
                  />
                )}
                {/* Icon */}
                <div className="z-10 relative flex items-center mb-2 mt-auto">
                  {doc.icon ? (
                    <span className="text-2xl mr-2">{doc.icon}</span>
                  ) : (
                    <File className="h-5 w-5 mr-2 text-muted-foreground" />
                  )}
                  <span className="font-semibold text-base truncate max-w-[140px]">
                    {doc.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Favourites Section */}
      <div className="w-full mb-10 text-muted-foreground">
        <div className="flex items-center justify-between mb-3 gap-x-2">
          <div className="flex items-center gap-x-2">
            <Star className="w-4 h-4" />
            <h2 className="text-md font-semibold mb-0.5">Starred Pages</h2>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/documents/starred")}
            className="flex items-center gap-x-2"
          >
            <View className="w-4 h-4" />
            <h2 className="text-md font-semibold mb-0.5">Show all</h2>
          </Button>
        </div>
        {favoriteDocs === undefined ? (
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-48 h-32 bg-muted rounded-lg animate-pulse flex-shrink-0"
              />
            ))}
          </div>
        ) : favoriteDocs.length === 0 ? (
          <div className="flex flex-col justify-center py-8">
            <p className="text-muted-foreground mb-4">
              No starred documents yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {favoriteDocs.slice(0, 5).map((doc) => (
              <button
                key={doc._id}
                onClick={() => router.push(`/documents/${doc._id}`)}
                className="w-full h-32 bg-secondary border-muted border rounded-lg flex flex-col items-start justify-end p-4 shadow-sm hover:shadow-md transition group relative overflow-hidden"
                tabIndex={0}
                aria-label={`Open ${doc.title}`}
              >
                {/* Cover image */}
                {doc.coverImage && (
                  <Image
                    src={doc.coverImage}
                    alt="cover"
                    className="absolute top-0 left-0 w-full h-20 object-cover rounded-t-lg"
                  />
                )}
                {/* Icon */}
                <div className="z-10 relative flex items-center mb-2 mt-auto">
                  {doc.icon ? (
                    <span className="text-2xl mr-2">{doc.icon}</span>
                  ) : (
                    <File className="h-5 w-5 mr-2 " />
                  )}
                  <span className="font-semibold text-base truncate max-w-[140px]">
                    {doc.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl bg-muted/60 dark:bg-secondary/80 rounded-xl shadow-sm flex items-center py-8 px-6 mt-2 mb-8 border border-muted/60">
          <Image
            src="/doc2-light.png"
            alt="Notebook illustration"
            width={300}
            height={300}
            className="mx-auto mb-4"
            priority
          />
          <div className="flex flex-col gap-x-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Lightbulb className="text-yellow-500 bg-yellow-100 dark:text-yellow-800 dark:bg-yellow-200 p-2 rounded-full h-10 w-10 mr-1 mt-0.5" />
              <h2 className="text-xl font-semibold">
                Let&apos;s get your thoughts out
              </h2>
            </div>
            <p className="text-muted-foreground text-base mb-4 mt-1">
              Capture your thoughts, plans, and inspirations in a fresh note.
              Nook is designed to be your inviting space for creativity,
              reflection, and productivity.
            </p>
            <p className="text-muted-foreground text-base  mb-4 mt-1">
              Whether it&apos;s a quick idea or a detailed plan, start writing
              and let your mind flow. Your next big breakthrough could begin
              right here.
            </p>
            <Button
              size="lg"
              onClick={onCreate}
              className="mx-auto font-semibold shadow-md"
              aria-label="Create a new note"
            >
              <SquarePen className="h-4 w-4 mr-1 mt-0.5" />
              Let&apos;s get your thoughts out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export default DocumentsPage;
