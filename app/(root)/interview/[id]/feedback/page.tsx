"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import DisplayTechIcons from "@/components/DisplayTechIcons";

import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import dayjs from "dayjs";

const FeedbackPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [interview, setInterview] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;
        const [interviewData, userData] = await Promise.all([
          getInterviewById(id),
          getCurrentUser(),
        ]);

        if (interviewData && userData) {
          setInterview(interviewData);
          setUser(userData);

          const feedbackData = await getFeedbackByInterviewId({
            interviewId: id,
            userId: userData.id,
          });
          setFeedback(feedbackData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  if (!interview || !feedback) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Feedback Not Found
          </h2>
          <p className="text-gray-600">
            The requested feedback could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Bar / Tags Row */}
        <motion.div
          className="flex flex-wrap gap-4 items-center justify-center"
          variants={itemVariants}
        >
          <motion.span
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-xs font-semibold shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 font-['Lexend']"
            variants={scaleIn}
            whileHover={{ y: -2 }}
          >
            ✨ Interview
          </motion.span>
          <motion.span
            className="px-5 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 font-['Lexend']"
            variants={scaleIn}
            whileHover={{ y: -2 }}
          >
            <span>🚀 Techstack:</span>
            <span className="font-bold">{interview.techstack.join(", ")}</span>
          </motion.span>
          <motion.span
            className="px-5 py-2.5 bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 rounded-full text-xs font-semibold shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 font-['Lexend']"
            variants={scaleIn}
            whileHover={{ y: -2 }}
          >
            📋 {interview.type}
          </motion.span>
        </motion.div>

        {/* Title Section */}
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <motion.h1
            className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-['Lexend']"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" as const }}
          >
            Interview Feedback
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 font-light italic font-['Lexend']"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" as const }}
          >
            Your Performance Journey Visualized
          </motion.p>
          <motion.div
            className="relative mx-auto w-40 h-1"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" as const }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-lg" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>

        {/* Score Card and Action Buttons Row */}
        <motion.div
          className="flex flex-col lg:flex-row gap-10 items-start justify-between"
          variants={itemVariants}
        >
          {/* Overall Score Card */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 flex-1 max-w-lg relative overflow-hidden"
            variants={slideInLeft}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-60" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full translate-y-12 -translate-x-12 opacity-60" />

            <div className="text-center space-y-8 relative z-10">
              <motion.div
                className="relative mx-auto w-44 h-44"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 1,
                  duration: 1,
                  ease: "easeOut" as const,
                  type: "spring" as const,
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center border-8 border-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/50 via-purple-200/50 to-pink-200/50 animate-pulse" />
                  <span className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
                    {feedback.totalScore}
                  </span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-8 border-transparent border-t-indigo-500 border-r-purple-500 border-b-pink-500"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: (feedback.totalScore / 100) * 360,
                  }}
                  transition={{
                    delay: 1.8,
                    duration: 2,
                    ease: "easeOut" as const,
                  }}
                />
              </motion.div>
              <motion.h3
                className="text-2xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Overall Score
              </motion.h3>
              <motion.div
                className="flex items-center justify-center gap-3 text-gray-500 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <div className="w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Image
                    src="/calendar.svg"
                    width={12}
                    height={12}
                    alt="calendar"
                    className="filter dark:invert"
                  />
                </div>
                <span>
                  {feedback.createdAt
                    ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                    : "N/A"}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-row gap-4 lg:ml-auto"
            variants={slideInRight}
          >
            <Button
              asChild
              className="bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:border-indigo-300 group"
            >
              <Link href="/" className="flex items-center gap-2">
                <span>←</span>
                Back to Dashboard
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 hover:scale-105 hover:shadow-2xl transition-all duration-300 px-8 py-4 rounded-2xl font-semibold shadow-xl group"
            >
              <Link
                href={`/interview/${interview.id}`}
                className="flex items-center gap-2"
              >
                <span>🔄</span>
                Retake Interview
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Strengths & Weaknesses Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          variants={itemVariants}
        >
          {/* Strengths Card */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
            variants={slideInLeft}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-20 translate-x-20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center shadow-xl border-4 border-emerald-200 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-['Lexend']">
                Strengths
              </h3>
            </div>
            <ul className="space-y-4 relative z-10">
              {feedback.strengths?.map((strength: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-gray-700 text-base p-3 rounded-xl hover:bg-emerald-50/50 transition-colors duration-200 font-['Lexend']"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + index * 0.15, duration: 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mt-2 flex-shrink-0 shadow-md" />
                  {strength}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Weaknesses Card */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
            variants={slideInRight}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-rose-100 to-red-100 rounded-full -translate-y-20 -translate-x-20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-red-100 rounded-full flex items-center justify-center shadow-xl border-4 border-rose-200 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent font-['Lexend']">
                Areas for Improvement
              </h3>
            </div>
            <ul className="space-y-4 relative z-10">
              {feedback.areasForImprovement?.map(
                (area: string, index: number) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4 text-gray-700 text-base p-3 rounded-xl hover:bg-rose-50/50 transition-colors duration-200 font-['Lexend']"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + index * 0.15, duration: 0.6 }}
                    whileHover={{ x: -5 }}
                  >
                    <span className="w-3 h-3 bg-gradient-to-r from-rose-400 to-red-400 rounded-full mt-2 flex-shrink-0 shadow-md" />
                    {area}
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        </motion.div>

        {/* Detailed Breakdown Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-24 translate-x-24 opacity-40" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full translate-y-16 -translate-x-16 opacity-40" />

          <div className="flex items-center gap-5 mb-10 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-xl border-4 border-blue-200">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Detailed Breakdown
            </h3>
          </div>

          <div className="space-y-8 relative z-10">
            {feedback.categoryScores?.map((category: any, index: number) => (
              <motion.div
                key={index}
                className="space-y-5 p-8 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-700 group-hover:text-gray-800 transition-colors duration-200">
                    {index + 1}. {category.name}
                  </span>
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {category.score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200/80 rounded-full h-5 shadow-inner overflow-hidden">
                  <motion.div
                    className="h-5 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 shadow-md relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${category.score}%` }}
                    transition={{
                      delay: 3 + index * 0.15,
                      duration: 1.5,
                      ease: "easeOut" as const,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </motion.div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-200">
                  {category.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Assessment Block */}
        <motion.div
          className="bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30 relative overflow-hidden"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-100/60 to-purple-100/60 rounded-full -translate-y-32 -translate-x-32" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-pink-100/60 to-rose-100/60 rounded-full translate-y-24 translate-x-24" />

          <motion.h3
            className="text-4xl font-bold text-center mb-8 relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            Final Assessment
          </motion.h3>
          <motion.p
            className="text-gray-700 text-2xl leading-relaxed text-center max-w-6xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
          >
            {feedback.finalAssessment}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeedbackPage;
