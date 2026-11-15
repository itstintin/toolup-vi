import { getAllQuestions } from "@/lib/db";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 60; // ISR revalidation

export default function HomePage() {
  const questions = getAllQuestions();

  return <HomeClient initialQuestions={questions} />;
}

