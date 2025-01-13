// This config file contains the structure for all
// forms data, controls and inputs

// Defines every input of the sign up form
export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

// Defines every input of the login form
export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

// Object to fill the signup form at first
export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};

// Object to fill the login form at first
export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

// Defines the select values to display
export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];

// Defines the select values to display
export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

// Defines the select values to display
export const courseCategories = [
  { id: "personal-development", label: "Personal Development" },
  { id: "mental-health", label: "Mental Health & Well Being" },
  { id: "professional-skills", label: "Professional Skills" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "financial-literacy", label: "Financial Literacy" },
  { id: "communication-skills", label: "Communication Skills" },
  { id: "tech-skills", label: "Technology & Digital Skills" },
  { id: "art-expression", label: "Creative Arts & Expression" },
  { id: "health-fitness", label: "Health & Fitness" },
  { id: "legal-rights", label: "Legal Awareness & Rights" },
];

// Defines every input of the add course landing page form
export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

// Object to fill the add course landing page form at first
export const courseLandingPageInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: 0,
  objectives: "",
  welcomeMessage: "",
  image: "",
};

// Object to fill the add course curriculum form at first
export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
