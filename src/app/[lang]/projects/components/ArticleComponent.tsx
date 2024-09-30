import React from "react";
import "../../globals.css";


interface ArticleProps {
    title: string;
    content: string;
    image: string;
  }
  
  const ArticleComponent: React.FC<ArticleProps> = ({ title, content, image }) => {
    return (
      <div className="bg-white shadow-md rounded-t-md p-4">
        <img src={image} alt={title} className="w-full rounded-t-md object-cover" />
        <h2 className="font-bold pt-4 text-background">{title}</h2>
        <p className="text-gray-600">
          {content.substring(0, 100)}...
          <span className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out">
            Read more <i className="fas fa-arrow-right"></i>
          </span>
        </p>
      </div>
    );
  };
  
export default ArticleComponent;