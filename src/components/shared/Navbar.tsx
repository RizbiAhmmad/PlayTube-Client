"use client";

import { Menu, Film, Info, PlayCircle, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserInfo } from "@/types/user.types";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

import { ThemeToggle } from "./ThemeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  userInfo?: UserInfo | null;
}

const Navbar = ({ userInfo, className }: NavbarProps) => {
  const menu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Movies & Series", url: "/media" },
    { title: "Blog", url: "/blog" },
    {
       title: "Pages",
       url: "#",
       items: [
         {
           title: "About Us",
           description: "Learn more about PlayTube and our mission",
           icon: <Info className="size-5 shrink-0" />,
           url: "/about",
         },
         {
           title: "Pricing",
           description: "Check our subscription plans",
           icon: <Film className="size-5 shrink-0" />,
           url: "/pricing",
         },
       ],
     },
  ];

  const dashboardRoute = userInfo ? getDefaultDashboardRoute(userInfo.role) : "/dashboard";
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login"); // or just refresh with router.refresh()
    router.refresh();
  };


  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto px-8">
        {/* Desktop Menu */}
        <nav className="hidden h-16 items-center justify-between lg:flex">
          {/* Left: Logo */}
          <div className="flex w-[200px] items-center">
            <Link href="/" className="flex items-center gap-2">
              <PlayCircle className="size-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                PlayTube
              </span>
            </Link>
          </div>

          {/* Center: Menu Items */}
          <div className="flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Auth/Profile */}
          <div className="flex w-[200px] justify-end gap-4 items-center">
            <ThemeToggle />
            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 overflow-hidden ring-offset-background transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userInfo.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardRoute} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <PlayCircle className="size-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">PlayTube</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>

            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <PlayCircle className="size-8 text-primary" />
                    <span className="text-xl font-bold tracking-tight">PlayTube</span>
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu for PlayTube.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="px-4 py-2 flex flex-col gap-4">
                   {/* Non-accordion mobile links like Home / Media need padding too */}
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t">
                  {userInfo ? (
                    <>
                      <Button asChild variant="outline" className="justify-start gap-2">
                        <Link href={dashboardRoute}>
                          <LayoutDashboard className="size-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="destructive" onClick={handleLogout} className="justify-start gap-2">
                        <LogOut className="size-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-muted">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <SubMenuLink item={subItem} />
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-none px-4">
        <AccordionTrigger className="text-base py-3 font-medium hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pb-4 px-2">
          <div className="flex flex-col gap-2">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.url}
                className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
              >
                {subItem.icon}
                <div>
                  <div className="font-medium">{subItem.title}</div>
                  <div className="text-xs text-muted-foreground">{subItem.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="block py-3 px-4 text-base font-medium hover:text-primary"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-primary">{item.icon}</div>
      <div>
        <div className="text-sm font-bold">{item.title}</div>
        {item.description && (
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Navbar;
