"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Removed unused import
import { Menu, User, Tv, Trophy, LayoutDashboard, Building, Settings, Scan } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Empire", href: "/", icon: <User className="h-4 w-4" /> },
        { name: "Watch", href: "/watch", icon: <Tv className="h-4 w-4" /> },
        { name: "League", href: "/league", icon: <Trophy className="h-4 w-4" /> },
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        { name: "Franchise", href: "/franchise", icon: <Building className="h-4 w-4" /> },
        { name: "Admin", href: "/admin/league", icon: <Settings className="h-4 w-4" /> },
        { name: "Scanner", href: "/access-control", icon: <Scan className="h-4 w-4" /> },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary tracking-tighter">EMPIRE</span>
                        <span className="text-sm font-light text-muted-foreground hidden sm:inline-block">/ 2076</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button variant="default" size="sm" className="ml-4">
                        Connexion
                    </Button>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
            </div>

            {/* Simple Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background absolute w-full shadow-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-accent rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-2">
                        <Button className="w-full">Connexion</Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
