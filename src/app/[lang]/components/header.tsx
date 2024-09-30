import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

export default function Header({ dict, lang } : { dict: any, lang: string }) {
    return (
        <nav className="flex space-x-6">
            <a href="/" className="md:p-4 text-foreground hover:text-primary">HOME</a>
            <a href="/projects" className="md:p-4 text-foreground hover:text-primary">PROJECTS</a>
            <a href="/cv" className="md:p-4 text-foreground hover:text-primary">CV</a>
            <a href="mailto:rudy.virquin@gmail.com" className="md:p-4 text-foreground hover:text-primary">{dict.contact}</a>
            <ModeToggle/>
        </nav>
    );
}