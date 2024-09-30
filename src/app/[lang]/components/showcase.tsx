import React from 'react';

interface Testimonial {
    name: string;
    username: string;
    text: string;
    time: string;
    date: string;
    likes: number;
    retweets: number;
    height: string;
}

const testimonials: Testimonial[] = [
    {
        name: "John Doe",
        username: "@johndoe",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        time: "10:00 AM",
        date: "Jan 1, 2022",
        likes: 10,
        retweets: 5,
        height: "h-40",
    },
    {
        name: "Jane Smith",
        username: "@janesmith",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        time: "2:30 PM",
        date: "Jan 2, 2022",
        likes: 20,
        retweets: 8,
        height: "h-48",
    },
    // Add more testimonials here
];

const Showcase: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <div className="text-2xl font-bold">"cal.com (@calcom) is awesome AND built on open source"</div>
                <div className="text-lg mt-2">Andy Randall</div>
            </div>
            <div className="fade-out">
                <div className="grid grid-cols-3 gap-4">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`bg-white p-4 rounded-lg shadow-md border border-gray-300 ${testimonial.height}`}>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full mr-2"></div>
                                <div>
                                    <div className="font-bold">{testimonial.name}</div>
                                    <div className="text-gray-500">{testimonial.username}</div>
                                </div>
                            </div>
                            <div className="mb-2 whitespace-pre-line">{testimonial.text}</div>
                            <div className="text-gray-500 text-sm">{testimonial.time} {testimonial.date}</div>
                            <div className="flex items-center mt-2 text-gray-500">
                                <div className="mr-4"><i className="far fa-heart"></i> {testimonial.likes}</div>
                                <div><i className="fas fa-retweet"></i> {testimonial.retweets}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8">
                <button className="bg-black text-white py-2 px-4 rounded-full">SHOW MORE +</button>
            </div>
        </div>
    );
};

export default Showcase;