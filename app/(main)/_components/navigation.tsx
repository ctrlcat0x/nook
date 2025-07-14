"use client";

import {
  ChevronsLeft,
  Home,
  MenuIcon,
  Plus,
  Search,
  Settings2,
  ChevronDown,
  ChevronRight,
  SquarePen,
  MoreHorizontal,
  ArrowUpAZ,
  ArrowDownAZ,
  Clock,
  Trash2,
  Check,
  Lock,
  Globe,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { UserItem } from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import { Navbar } from "./navbar";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";

export const Navigation = () => {
  const router = useRouter();
  const settings = useSettings();
  const search = useSearch();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isReseting, setIsReseting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isPrivateOpen, setIsPrivateOpen] = useState(true);
  const allDocuments = useQuery(api.documents.getSearch);
  const publicDocs =
    allDocuments?.filter(
      (doc: Doc<"documents">) => doc.isPublished && !doc.isArchived
    ) || [];
  const privateDocs =
    allDocuments?.filter(
      (doc: Doc<"documents">) => !doc.isPublished && !doc.isArchived
    ) || [];
  type PrivateSort = "az" | "za" | "lastEditedDesc" | "lastEditedAsc";
  const [privateSort, setPrivateSort] = useState<PrivateSort>("lastEditedDesc");
  const [sortPopoverOpen, setSortPopoverOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLSpanElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsReseting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "280px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 280px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "280px");
      setTimeout(() => setIsReseting(false), 300);
    }
  };
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsReseting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsReseting(false), 300);
    }
  };
  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
      plusRef.current?.blur();
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };
  const homePush = () => {
    router.push(`/documents`);
  };
  // For sorting privateDocs before rendering:
  const sortedPrivateDocs = [...privateDocs].sort((a, b) => {
    switch (privateSort) {
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "lastEditedAsc":
        return a.lastEdited - b.lastEdited;
      case "lastEditedDesc":
        return b.lastEdited - a.lastEdited;
      default:
        return b.lastEdited - a.lastEdited;
    }
  });
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <UserItem />
        <div className="mx-2">
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Home" icon={Home} onClick={homePush} />
          <Item label="Settings" icon={Settings2} onClick={settings.onOpen} />
          <Item label="Add a page" icon={SquarePen} onClick={handleCreate} />
          <DropdownMenuSeparator className="my-2" />
        </div>
        <div className="mx-2">
          {/* Public Section */}
          <div
            role="button"
            tabIndex={0}
            aria-expanded={isPublicOpen}
            onClick={() => setIsPublicOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setIsPublicOpen((v) => !v);
            }}
            className="flex items-center justify-between text-xs mb-2 p-1.5 text-muted-foreground font-semibold cursor-pointer group rounded-sm transition hover:bg-primary/5"
          >
            <div className="flex items-center gap-x-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>Public</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 ml-1 text-muted-foreground transition-transform opacity-0 group-hover:opacity-100",
                isPublicOpen ? "rotate-0" : "-rotate-90"
              )}
            />
          </div>
          {isPublicOpen &&
            (publicDocs.length > 0 ? (
              <DocumentList data={publicDocs} />
            ) : (
              <div className="text-xs text-muted-foreground py-2 text-center">
                No pages published
              </div>
            ))}
          {/* Private Section */}
          <div className="my-2"></div>
          <div
            role="button"
            tabIndex={0}
            aria-expanded={isPrivateOpen}
            className="flex items-center justify-between text-xs mb-2 p-1 text-muted-foreground font-semibold cursor-pointer group rounded-sm transition hover:bg-primary/5 focus-within:bg-primary/5"
          >
            <span
              className="flex-1"
              onClick={() => setIsPrivateOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setIsPrivateOpen((v) => !v);
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isPrivateOpen}
            >
              <div className="flex items-center gap-x-1">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span>Private</span>
              </div>
            </span>
            <div className="flex items-center gap-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition">
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <span
                    ref={moreRef}
                    className="rounded-sm p-1 transition hover:bg-primary/5"
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={0}
                    aria-label="Private options"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="right"
                  forceMount
                  className="w-48"
                >
                  <DropdownMenuItem asChild>
                    <Popover
                      open={sortPopoverOpen}
                      onOpenChange={setSortPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <div
                          className={cn(
                            "flex items-center w-full rounded-sm px-2 py-1.5 text-sm transition cursor-pointer select-none hover:bg-accent hover:text-accent-foreground",
                            sortPopoverOpen &&
                              "bg-accent text-accent-foreground"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSortPopoverOpen((v) => !v);
                          }}
                          tabIndex={0}
                          role="menuitem"
                          aria-haspopup="menu"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Sort by</span>
                          <span className="ml-auto text-xs text-muted-foreground font-normal">
                            {privateSort === "az"
                              ? "A-Z"
                              : privateSort === "za"
                                ? "Z-A"
                                : privateSort === "lastEditedAsc"
                                  ? "Oldest"
                                  : "Newest"}
                          </span>
                          <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        side="right"
                        alignOffset={4}
                        className="w-56 p-2 ml-2 space-y-1"
                      >
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          Sort by
                        </div>
                        <button
                          className={cn(
                            "flex items-center w-full rounded px-2 py-1.5 text-sm transition hover:bg-primary/10",
                            privateSort === "az" &&
                              "bg-primary/10 font-semibold"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrivateSort("az");
                            setSortPopoverOpen(false);
                            setDropdownOpen(false);
                            moreRef.current?.blur();
                          }}
                        >
                          <ArrowUpAZ className="h-4 w-4 mr-2" />
                          Title: A-Z
                          {privateSort === "az" && (
                            <Check className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </button>
                        <button
                          className={cn(
                            "flex items-center w-full rounded px-2 py-1.5 text-sm transition hover:bg-primary/10",
                            privateSort === "za" &&
                              "bg-primary/10 font-semibold"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrivateSort("za");
                            setSortPopoverOpen(false);
                            setDropdownOpen(false);
                            moreRef.current?.blur();
                          }}
                        >
                          <ArrowDownAZ className="h-4 w-4 mr-2" />
                          Title: Z-A
                          {privateSort === "za" && (
                            <Check className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </button>
                        <button
                          className={cn(
                            "flex items-center w-full rounded px-2 py-1.5 text-sm transition hover:bg-primary/10",
                            privateSort === "lastEditedDesc" &&
                              "bg-primary/10 font-semibold"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrivateSort("lastEditedDesc");
                            setSortPopoverOpen(false);
                            setDropdownOpen(false);
                            moreRef.current?.blur();
                          }}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Last Edited: Newest
                          {privateSort === "lastEditedDesc" && (
                            <Check className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </button>
                        <button
                          className={cn(
                            "flex items-center w-full rounded px-2 py-1.5 text-sm transition hover:bg-primary/10",
                            privateSort === "lastEditedAsc" &&
                              "bg-primary/10 font-semibold"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrivateSort("lastEditedAsc");
                            setSortPopoverOpen(false);
                            setDropdownOpen(false);
                            moreRef.current?.blur();
                          }}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Last Edited: Oldest
                          {privateSort === "lastEditedAsc" && (
                            <Check className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </button>
                      </PopoverContent>
                    </Popover>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreate();
                }}
                className="rounded-sm p-1 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring"
                tabIndex={0}
                aria-label="Add a page"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          {isPrivateOpen &&
            (sortedPrivateDocs.length > 0 ? (
              <DocumentList data={sortedPrivateDocs} />
            ) : (
              <div className="text-xs text-muted-foreground text-center pb-2">
                No private pages
              </div>
            ))}
          <DropdownMenuSeparator className="my-2" />
          <Popover>
            <PopoverTrigger className="w-full">
              <Item icon={Trash2} label="Trash" />
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="p-0 w-72"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
