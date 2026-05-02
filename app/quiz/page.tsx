import type { Metadata } from "next";
import { BagQuiz } from "@/components/bag-quiz";

export const metadata: Metadata = {
  title: "Which Bag Is Right for You? | Alongway",
  description: "Answer a few quick questions and we'll point you to the right bag.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
      <BagQuiz />
    </div>
  );
}
