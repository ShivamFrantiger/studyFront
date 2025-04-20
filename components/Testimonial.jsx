const testimonials = [
    {
        content: "StudyBuddy AI transformed my study routine. The personalized practice questions helped me identify weak areas I didn't even know I had.",
        author: "Jamie Chen",
        role: "Computer Science Student",
        avatar: "/avatars/mn.jpg"
    },
    {
        content: "As a medical student, I have mountains of material to learn. StudyBuddy AI helped me organize concepts and create perfect flashcards automatically.",
        author: "Priya Sharma",
        role: "Medical Student",
        avatar: "/avatars/wm.jpg"
    },
    {
        content: "The exam simulation feature is incredibly realistic. It helped me overcome test anxiety and improved my scores dramatically.",
        author: "Marcus Johnson",
        role: "MBA Candidate",
        avatar: "/avatars/mn2.jpg"
    }
];

export default function Testimonials() {
    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        What Our Users Are Saying
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Students across different disciplines are transforming how they learn with StudyBuddy AI.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-xl">
                            <div className="flex items-center mb-6">
                                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
