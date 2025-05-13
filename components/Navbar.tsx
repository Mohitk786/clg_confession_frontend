"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { Separator } from "./ui/separator";
import { logout } from "@/actions/auth";

const Navbar = () => {
  const path = usePathname();
  const { data }: any = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, pending] = useActionState(logout, undefined);
  
  const user = data?.data?.user;
  console.log("user", user);
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <header className="border-b border-campus-gold/30">
      <div className="container mx-auto py-4 px-6">
        <div className="flex justify-between items-center">
          {/* Logo - visible on all screens */}
          <Link href="/" className="md:flex hidden  items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-campus-navy">
              Campus <span className="italic text-campus-forest">Whispers</span>
            </h1>
          </Link>

          {/* Desktop navigation - visible only on medium screens and above */}
          <nav className="hidden md:flex items-center space-x-6 font-medium text-campus-navy/80">
            <Link
              href="/"
              className={`${
                path === "/" ? "text-campus-gold" : ""
              } hover:text-campus-gold transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/confessions"
              className={`${
                path === "/confessions" ? "text-campus-gold" : ""
              } hover:text-campus-gold transition-colors`}
            >
              Confessions
            </Link>
            <Link
              href="/campus-corner"
              className={`${
                path === "/campus-corner" ? "text-campus-gold" : ""
              } hover:text-campus-gold transition-colors`}
            >
              Campus Corner
            </Link>
          </nav>

          {/* Mobile hamburger menu - visible only on small screens */}
          <div className="md:hidden flex items-center ">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-campus-navy"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-playfair font-bold text-campus-navy">
                    Campus{" "}
                    <span className="italic text-campus-forest">Whispers</span>
                  </SheetTitle>
                </SheetHeader>

                <Separator className="text-campus-forest" />

                <div className="flex flex-col justify-between h-full">
                  <nav className="flex flex-col md:hidden gap-3 mt-5 font-medium text-campus-navy/80">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`${
                        path === "/" ? "text-campus-gold" : ""
                      } hover:text-campus-gold transition-colors`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/confessions"
                      onClick={() => setIsOpen(false)}
                      className={`${
                        path === "/confessions" ? "text-campus-gold" : ""
                      } hover:text-campus-gold transition-colors`}
                    >
                      Confessions
                    </Link>
                    <Link
                      href="/campus-corner"
                      onClick={() => setIsOpen(false)}
                      className={`${
                        path === "/campus-corner" ? "text-campus-gold" : ""
                      } hover:text-campus-gold transition-colors`}
                    >
                      Campus Corner
                    </Link>
                  </nav>

                  <div className="w-full mb-4">
                    <Separator />
                    <button  onClick={logout} className="flex items-center justify-center bg-campus-forest p-4 text-white w-full transition-colors">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Profile dropdown - visible only on medium screens and above */}
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border-2 border-campus-gold hover:border-campus-forest transition-colors">
                  <AvatarFallback className="bg-campus-navy text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.college || "Your University"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href={"/profile"}
                      className="flex  text-campus-navy  cursor-pointer transition-colors"
                    >
                      <User className="mr-2 h-4 w-4 text-campus-forest" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4 text-campus-forest" />
                    <span>Settings</span>
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
