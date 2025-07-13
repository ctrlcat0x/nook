"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { File } from "lucide-react";
import Image from "next/image";

const StarredDocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const favoriteDocs = useQuery(api.documents.getFavorites);

  return (
    <div className="h-full flex flex-col justify-start px-4 pt-12 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2 w-full text-center">
        Good {getGreeting()}, {user?.firstName || user?.fullName || "there"}!
      </h1>
      <p className="text-muted-foreground text-center mb-8 text-base">
        Your starred pages are collected here for quick access.
      </p>
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
          <p className="text-muted-foreground mb-4 text-center">
            No starred documents yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {favoriteDocs.map((doc) => (
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
  );
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

export default StarredDocumentsPage;
