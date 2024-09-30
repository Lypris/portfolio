import Header from "./header";
import Footer from "./footer";

type Props = {
    children: React.ReactNode;
    lang: string;
    dict: any;
};

export default function MainLayout({ children, lang, dict }: Props) {
    return (
        <div className="flex flex-col h-full items-center">
            <Header dict={dict} lang={lang} />
            <div className="flex-grow flex justify-center">
                {children}
            </div>
            <Footer dict={dict} lang={lang} />
        </div>
    );
}