import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import TiltedCard from "./ui/TiltedCard";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  const image = getRandomInterviewCover();

  return (
    <TiltedCard
      imageSrc={image}
      altText={`${role} Interview`}
      captionText={`${role} - ${normalizedType}`}
      containerHeight="400px"
      containerWidth="360px"
      imageHeight="400px"
      imageWidth="360px"
      rotateAmplitude={10}
      scaleOnHover={1.08}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
        <div className="card-interview -space-y-6.5 p-4 w-full bg-white rounded-[15px] shadow-md">
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={image}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-2 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5 text-sm">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>

          <div className="flex flex-row justify-between mt-5">
            <DisplayTechIcons techStack={techstack} />
            <Button className="btn-primary">
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? "Check Feedback" : "View Interview"}
              </Link>
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default InterviewCard;
