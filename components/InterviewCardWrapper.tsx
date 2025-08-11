"use client";

import { useState } from "react";
import InterviewCard from "./InterviewCard";

interface InterviewCardWrapperProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCardWrapper = (props: InterviewCardWrapperProps) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null; // Don't render the card if it's been deleted
  }

  return <InterviewCard {...props} onDelete={handleDelete} />;
};

export default InterviewCardWrapper;
