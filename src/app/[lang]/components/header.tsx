
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Header({ dict, lang }: { dict: any, lang: string }) {
    return (
        <nav className="flex space-x-6 uppercase">
            <Link href={`/${lang}`} className="md:p-4 text-foreground hover:text-primary">{dict.header.home}</Link>
            <Link href={`/${lang}/projects`} className="md:p-4 text-foreground hover:text-primary">{dict.header.projects}</Link>
            <Link href={`/${lang}/cv`} className="md:p-4 text-foreground hover:text-primary">{dict.header.cv}</Link>
            <a href="mailto:rudy.virquin@gmail.com" className="md:p-4 text-foreground hover:text-primary">{dict.header.contact}</a>
            <ModeToggle />
        </nav>
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