import React from "react";
import "../../globals.css";


interface ArticleProps {
    title: string;
    content: string;
    image: string;
  }
  
  const ArticlePreview: React.FC<ArticleProps> = ({ title, content, image }) => {
    return (
      <div className="md:p-4 lg:p-8 flex flex-row snap-start h-full w-full">
        <img src={image} alt={title} className="w-full basis-1/3 rounded-[50px] object-cover" />
        <div className="basis-2/3 p-4">
            <h2 className="font-bold pt-4 text-background">{title}</h2>
            <p className="text-gray-600">
            {content.substring(0, 100)}...
            <span className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out">
                Read more <i className="fas fa-arrow-right"></i>
            </span>
            </p>
        </div>
      </div>
    );
  };
  
export default ArticlePreview;