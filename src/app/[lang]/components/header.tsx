
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import LocaleSwitcher from './locale-switcher';

export default function Header({ dict, lang }: { dict: any, lang: string }) {
    return (
        <header className="w-full px-4 pt-4 sm:px-8">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-xl border border-[color:var(--border)] bg-card/80 px-3 py-2 uppercase backdrop-blur-sm sm:px-4">
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href={`/${lang}`} className="px-2 py-2 text-foreground hover:text-primary">{dict.header.home}</Link>
                    <Link href={`/${lang}/projects`} className="px-2 py-2 text-foreground hover:text-primary">{dict.header.projects}</Link>
                    <Link href={`/${lang}/cv`} className="px-2 py-2 text-foreground hover:text-primary">{dict.header.cv}</Link>
                    <a href="mailto:rudy.virquin@gmail.com" className="px-2 py-2 text-foreground hover:text-primary">{dict.header.contact}</a>
                </div>
                <div className="flex items-center gap-2">
                    <LocaleSwitcher />
                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
} 

/**
import Link from "next/link";

export default function Header({ dict, lang }: { dict: any; lang: string }) {
    return (
    <div className="header flex justify-between items-center py-4 max-w-[792px] w-full">
        <div className="flex-1 text-white text-base font-bold">{dict.title}</div>
        <div className="flex items-end">
        <Link href="/en">
            <div className={`p-3 ${lang === "en" ? "text-base" : "text-sm"}`}>
            EN
            </div>
        </Link>
        <Link href="/fr">
            <div className={`p-3 ${lang === "fr" ? "text-base" : "text-sm"}`}>
            FR
            </div>
        </Link>
        </div>
    </div>
    );
} **/