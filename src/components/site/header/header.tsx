"use client";

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { logo } from "@/assets"
import { Button } from "@/components/ui/button"
import { UserIcon } from "lucide-react"
import { navigationLinks } from "@/lib/app-links"

interface HeaderProps {
    variant?: 'sticky' | 'fixed' | 'static';
}

export function Header({ variant = 'sticky' }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        if (variant === 'fixed') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [variant]);

    // Determine if logo should be inverted (dark) based on background
    const shouldInvertLogo = () => {
        if (variant === 'sticky' || variant === 'static') return true;
        return isScrolled;
    }

    return (
        <header className={`
                ${variant === 'static' ? 'relative' : variant === 'sticky' ? 'sticky' : 'fixed'} 
                top-0 z-50 pt-4 w-full 
        `}>
            <div className={`flex items-center justify-between h-12 sm:h-14 px-3 mx-auto container max-w-6xl rounded-full backdrop-blur-md border transform transition-all duration-300
                ${variant === 'sticky' || variant === 'static'
                    ? 'bg-white/90 border-border shadow-[0_8px_30px_-18px_rgba(23,20,15,0.25)]'
                    : isScrolled
                        ? 'bg-white/90 border-border shadow-[0_8px_30px_-18px_rgba(23,20,15,0.25)]'
                        : 'bg-white/10 border-white/20 shadow-none'
                }
            `}>
                {/* Logo Only - Correct 3:1 Aspect Ratio */}
                <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95">
                    <Image
                        src={logo}
                        alt="Luxe Screens"
                        className={`w-fit h-8 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 ${shouldInvertLogo()
                            ? 'filter invert-0 brightness-0 contrast-100'
                            : ''
                            }`}
                        priority
                        quality={100}
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 108px, (max-width: 1024px) 120px, (max-width: 1280px) 144px, (max-width: 1536px) 168px, 192px"
                    />
                    <h1 className={`ml-2 font-serif text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-tight transition-all duration-300 ${shouldInvertLogo()
                        ? 'text-foreground'
                        : 'text-white/90 drop-shadow-md'
                        }`}>
                        Luxe Screens
                    </h1>
                </Link>

                <nav className="hidden lg:flex space-x-4 xl:space-x-6 flex-1 justify-center">
                    {navigationLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`group/nav relative text-xs xl:text-sm font-medium transition-all duration-300 whitespace-nowrap ${variant === 'sticky' || variant === 'static'
                                ? 'text-foreground/70 hover:text-primary'
                                : isScrolled
                                    ? 'text-foreground/70 hover:text-primary'
                                    : 'text-white/90 hover:text-white drop-shadow-md'
                                }`}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover/nav:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 shrink-0">
                    <div className="hidden md:flex items-center gap-1 sm:gap-2">
                        <Link href="/auth/signin" className="flex items-center gap-1 sm:gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`rounded-full px-2 sm:px-3 lg:px-4 h-7 sm:h-8 lg:h-9 transition-all duration-300 hover:scale-105 active:scale-95 ${variant === 'sticky' || variant === 'static'
                                    ? 'text-foreground/70 hover:bg-muted border border-border/70 hover:border-border'
                                    : isScrolled
                                        ? 'text-foreground/70 hover:bg-muted border border-border/70 hover:border-border'
                                        : 'text-white/90 hover:bg-white/10 border border-white/20 hover:border-white/30 backdrop-blur-sm'
                                    }`}
                            >
                                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                <span className="text-xs sm:text-sm font-medium">Sign In</span>
                            </Button>
                        </Link>
                        <Link href="/booking" className="text-xs sm:text-sm font-medium whitespace-nowrap">
                            <Button
                                size="sm"
                                className={`btn-shine cursor-pointer rounded-full px-2 sm:px-3 lg:px-4 h-7 sm:h-8 lg:h-9 transition-all duration-300 hover:scale-105 active:scale-95 ${variant === 'sticky' || variant === 'static'
                                    ? 'bg-primary hover:bg-primary text-primary-foreground shadow-sm'
                                    : isScrolled
                                        ? 'bg-primary hover:bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-white/90 hover:bg-white text-foreground shadow-lg backdrop-blur-sm'
                                    }`}
                            >
                                Book Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}