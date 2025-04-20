import Head from 'next/head';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonial';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <>
      <Head>
        <title>StudyBuddy AI - Personalized Learning & Exam Prep Platform</title>
        <meta 
          name="description" 
          content="StudyBuddy AI transforms your course materials into personalized learning experiences using artificial intelligence." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
    </>
  );
}
