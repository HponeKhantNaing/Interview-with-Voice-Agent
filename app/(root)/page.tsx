"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

function Home() {
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<Interview[] | null>(
    null
  );
  const [allInterview, setAllInterview] = useState<Interview[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser?.id) {
          const [userInterviewsData, allInterviewData] = await Promise.all([
            getInterviewsByUserId(currentUser.id),
            getLatestInterviews({ userId: currentUser.id }),
          ]);
          setUserInterviews(userInterviewsData);
          setAllInterview(allInterviewData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteInterview = (interviewId: string) => {
    // Remove from userInterviews
    setUserInterviews(
      (prev) =>
        prev?.filter((interview) => interview.id !== interviewId) || null
    );
    // Remove from allInterview
    setAllInterview(
      (prev) =>
        prev?.filter((interview) => interview.id !== interviewId) || null
    );
  };

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="card-cta">
        <Image
          src="/imageR.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />

        <div className="flex flex-col gap-6 max-w-lg">
          <p className="text-4xl font-bold">
            Start Interview with AI-Powered Practice and Feedback
          </p>
          <p className="text-lg">
            Practice real interview questions and get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                onDelete={() => handleDeleteInterview(interview.id)}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                onDelete={() => handleDeleteInterview(interview.id)}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
