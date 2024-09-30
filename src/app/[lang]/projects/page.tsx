
import React from 'react';

import ArticleComponent from './components/ArticleComponent';

export default function ProjectsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <ArticleComponent
                title="My Article 1"
                content="This is the content of my first article. It is a very interesting article. You should read it. It is very interesting. You will learn a lot from it." 
                image="https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <ArticleComponent
                title="My Article 2"
                content="This is the content of my second article. It is a very interesting article. You should read it. It is very interesting. You will learn a lot from it." 
                image="https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <ArticleComponent
                title="My Article 3"
                content="This is the content of my third article. It is a very interesting article. You should read it. It is very interesting. You will learn a lot from it." 
                image="https://images.unsplash.com/photo-1647427060118-4911c9821b82?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        </div>
    );
};
