import Link from 'next/link';

export default function CallToAction() {
    return (
        <div className="bg-indigo-700 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to transform your learning experience?
                    </h2>
                    <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
                        Join thousands of students who are studying smarter, not harder, with StudyBuddy AI's personalized learning platform.
                    </p>
                    <div className="mt-10">
                        <Link href="/signup" className="px-8 py-4 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors inline-block">
                            Start Your Free Trial
                        </Link>
                    </div>
                    <p className="mt-4 text-indigo-200">
                        No credit card required. Free for 14 days.
                    </p>
                </div>
            </div>
        </div>
    );
}
