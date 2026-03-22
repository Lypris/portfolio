import Header from "./header";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
  dict: any;
  lang: string;
};

export default function MainLayout({ children, dict, lang }: Props) {
  return (
    <div className="flex flex-col h-full">
      <Header dict={dict} lang={lang} />
      <div className="main flex-grow flex justify-center">{children}</div>
      <Footer dict={dict} />
    </div>
  );
}