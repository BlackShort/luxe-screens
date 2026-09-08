import { Separator } from "@/components/ui/separator"
import { logo } from "@/assets"
import Image from "next/image"
import Link from "next/link"
import { MailIcon } from "lucide-react"
import { footerSections, socialLinks, bottomLinks } from "@/lib/navigation"

export function Footer() {
    return (
        <footer className="border-t border-border bg-secondary/40">
            <div className="container px-4 pt-12 pb-6 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Company Info Section */}
                    <div className="flex flex-col lg:w-80 lg:shrink-0 gap-4">
                        <div className="flex flex-row items-start gap-4">
                            <Link href="/" className="w-fit h-8 sm:h-9 md:h-10 lg:h-12 xl:h-14 2xl:h-16 transition-all duration-300 hover:scale-105 active:scale-95">
                                <Image
                                    src={logo}
                                    alt="Luxe Screens"
                                    className="w-full h-full filter invert-0 brightness-0 contrast-100 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                                    priority
                                    quality={100}
                                    sizes="(max-width: 640px) 96px, (max-width: 768px) 108px, (max-width: 1024px) 120px, (max-width: 1280px) 144px, (max-width: 1536px) 168px, 192px"
                                />
                            </Link>
                            <p className="flex flex-col text-sm leading-relaxed text-muted-foreground">
                                <span>Luxe Screens, Sector 16,</span>
                                <span>Noida - 110090</span>
                                <span>Uttar Pradesh, India</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center text-primary gap-2 text-sm font-medium">
                                <MailIcon className="w-4 h-4 shrink-0" />
                                <Link href={'mailto:hello@luxescreens.com'} className="transition-colors hover:text-gold-deep">
                                    hello@luxescreens.com
                                </Link>
                            </div>

                            {/* Improved Social Media Icons */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.label}
                                        target="_blank"
                                        href={social.href}
                                        className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-transparent hover:text-white ${social.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                    >
                                        <Image
                                            src={social.icon}
                                            alt={social.label}
                                            width={20}
                                            height={20}
                                            className="w-5 h-5 transition-transform duration-150 group-hover:brightness-0 group-hover:invert"
                                        />
                                        <span className="sr-only">{social.label}</span>

                                        {/* Tooltip */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                            {social.label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Links Sections */}
                    <div className="flex flex-1 justify-between flex-col md:flex-row gap-8 md:gap-6 lg:gap-8 xl:gap-12">
                        {footerSections.map((section) => (
                            <div key={section.title} className="flex flex-col w-max min-w-0">
                                <h3 className="mb-4 text-sm font-semibold uppercase text-foreground tracking-wide">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-muted-foreground hover:text-foreground transition-colors leading-relaxed block py-0.5"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Copyright © {new Date().getFullYear()} Luxe Screens. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
                        {bottomLinks.map((link) => (
                            <div key={link.label} className="flex items-center">
                                <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}