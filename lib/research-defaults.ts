import type { ResearchGoal, ResearchWizardData } from "@/lib/types";

export const researchGoals: { value: ResearchGoal; description: string }[] = [
  { value: "Collect Survey", description: "Gather structured answers at scale." },
  { value: "Find Interview Participants", description: "Recruit relevant people for conversations." },
  { value: "Prototype Test", description: "Learn how people use an early experience." },
  { value: "Validate Business Idea", description: "Test a problem, audience, or value proposition." },
  { value: "Design Feedback", description: "Get focused critique on a design direction." },
  { value: "Open Discussion", description: "Explore a question through community insight." },
];

export const suggestedAudiences = [
  "Students",
  "Startup Founders",
  "UX Designers",
  "Product Managers",
  "Pet Owners",
  "Drivers",
  "Parents",
  "Restaurant Owners",
  "Business Owners",
];

export const suggestedHashtags = [
  "Survey",
  "Interview",
  "Prototype",
  "DesignFeedback",
  "IdeaValidation",
  "Students",
  "Startups",
  "FoodBusiness",
  "Automotive",
  "PetOwners",
  "UIUX",
];

export const initialResearchData: ResearchWizardData = {
  goal: null,
  title: "",
  description: "",
  responseMethod: "external",
  externalLink: "",
  formQuestions: [],
  estimatedTime: "5 min",
  targetAudience: [],
  responseMode: "limited",
  responseTarget: 30,
  timeMode: "no_deadline",
  deadline: "",
  hashtags: [],
};
