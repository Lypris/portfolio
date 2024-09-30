'use client'
import React, { useEffect, useRef, useState } from 'react';
import "../style.css";
import ArticlePreview from './ArticlePreview';

const useVerticalScrollHandler = (containerRef: React.RefObject<HTMLElement>, numberOfSections: number) => {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => {
            const scrollTop = container.scrollTop;
            const sectionHeight = container.offsetHeight;
            const scrollPosition = Math.round(scrollTop / sectionHeight); // Round to force snapping
            setActiveSection(scrollPosition);
        };

        container.addEventListener('scroll', onScroll);
        return () => container.removeEventListener('scroll', onScroll);
    }, [containerRef, numberOfSections]);

    return activeSection;
};

const SliderView: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberOfSections = 3; // Update this if you add more items
    const activeSection = useVerticalScrollHandler(containerRef, numberOfSections);

    return (
        <div
            id="scrollContainer"
            ref={containerRef}
            className="relative h-96 w-5/6 overflow-y-scroll snap-y snap-mandatory hide-scrollbar tab rounded-[50px]"
        >
            {/* Wrapper for items displayed 2 per "page" */}
            <div className="grid snap-y snap-mandatory h-full grid-auto-rows: 1fr"
            style={{ gridTemplateRows: 'repeat(auto-fill, 100%)' }}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center h-full snap-center"  // Flexbox to center the articles
                    >
                        <div className="grid grid-cols-2 gap-8 w-full"> {/* Set width of article grid */}
                            <ArticlePreview
                                title={`Title ${index * 2 + 1}`}
                                content={`Content ${index * 2 + 1}`}
                                image={`https://via.placeholder.com/150`}
                            />
                            <ArticlePreview
                                title={`Title ${index * 2 + 2}`}
                                content={`Content ${index * 2 + 2}`}
                                image={`https://via.placeholder.com/150`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress indicators (dots on the right) */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
                {Array.from({ length: numberOfSections }).map((_, index) => (
                    <div
                        key={index}
                        id={`indicator-${index}`}
                        aria-label={`Section ${index + 1}`}
                        className={`h-4 w-4 rounded-full ${activeSection === index ? 'bg-gray-100' : 'bg-gray-400'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SliderView;