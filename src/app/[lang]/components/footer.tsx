
export default function Footer ({ dict, lang } : { dict: any, lang: string }) {
    return (
        <footer className="flex justify-center p-4">
            <p className="text-foreground">{dict.footer}</p>
        </footer>
    );
}