"use client";

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import TiltedCard from "./ui/TiltedCard";
import DeleteButton from "./DeleteButton";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
  onDelete,
}: InterviewCardProps) => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (userId && interviewId) {
        try {
          const feedbackData = await getFeedbackByInterviewId({
            interviewId,
            userId,
          });
          setFeedback(feedbackData);
        } catch (error) {
          console.error("Error fetching feedback:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [userId, interviewId]);

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeClass =
    {
      Behavioral: "badge-behavioral",
      Mixed: "badge-mixed",
      Technical: "badge-technical",
    }[normalizedType] || "badge-mixed";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  const image = getRandomInterviewCover();

  if (loading) {
    return (
      <div className="w-[360px] h-[400px] bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <TiltedCard
      imageSrc={image}
      altText={`${role} Interview`}
      captionText={`${role} - ${normalizedType}`}
      containerHeight="400px"
      containerWidth="360px"
      imageHeight="400px"
      imageWidth="360px"
      rotateAmplitude={8}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <div className="card-interview -space-y-6.5 p-4 w-full bg-card text-card-foreground rounded-[15px] shadow-lg border border-border">
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg font-semibold",
              badgeClass
            )}
          >
            <p className="badge-text text-white">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={image}
            alt="cover-image"
            width={48}
            height={48}
            className="rounded-full object-fit size-[48px]"
          />

          {/* Interview Role */}
          <h3 className="mt-2 capitalize text-card-foreground font-semibold text-lg">
            {role} Interview
          </h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
                className="filter dark:invert"
              />
              <p className="text-card-foreground font-medium">
                {formattedDate}
              </p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/star.svg"
                width={22}
                height={22}
                alt="star"
                className="filter dark:invert"
              />
              <p className="text-card-foreground font-medium">
                {feedback?.totalScore || "---"}/100
              </p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 text-sm text-muted-foreground leading-relaxed">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>

          <div className="flex flex-row justify-between mt-3">
            <DisplayTechIcons techStack={techstack} />
            <div className="flex gap-2 items-center">
              <Button className="btn-primary">
                <Link
                  href={
                    feedback
                      ? `/interview/${interviewId}/feedback`
                      : `/interview/${interviewId}`
                  }
                  className="text-primary-foreground font-semibold"
                >
                  {feedback ? "Check Feedback" : "View Interview"}
                </Link>
              </Button>
              {interviewId && (
                <DeleteButton interviewId={interviewId} onDelete={onDelete} />
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default InterviewCard;
