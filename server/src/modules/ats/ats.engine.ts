
type Skill = {
  name: string;
  keywords: string[];
};

type SkillPriority = "required" | "preferred";

const SKILLS: Skill[] = [
  // Programming languages
  { name: "JavaScript", keywords: ["javascript"] },
  { name: "TypeScript", keywords: ["typescript"] },
  { name: "Python", keywords: ["python"] },
  { name: "Java", keywords: ["java"] },
  { name: "C", keywords: ["c programming", "c language"] },
  { name: "C++", keywords: ["c++", "cpp"] },
  { name: "C#", keywords: ["c#", "c sharp"] },
  { name: "Go", keywords: ["golang", "go language"] },
  { name: "Rust", keywords: ["rust programming"] },
  { name: "PHP", keywords: ["php"] },
  { name: "Ruby", keywords: ["ruby programming"] },
  { name: "Kotlin", keywords: ["kotlin"] },
  { name: "Swift", keywords: ["swift programming"] },

  // Frontend
  { name: "HTML", keywords: ["html", "hypertext markup language"] },
  { name: "CSS", keywords: ["css", "cascading style sheets"] },
  { name: "React", keywords: ["react.js", "reactjs", "react"] },
  { name: "Next.js", keywords: ["next.js", "nextjs"] },
  { name: "Angular", keywords: ["angular framework"] },
  { name: "Vue.js", keywords: ["vue.js", "vuejs"] },
  { name: "Tailwind CSS", keywords: ["tailwind css", "tailwind"] },
  { name: "Bootstrap", keywords: ["bootstrap framework"] },
  { name: "Redux", keywords: ["redux"] },

  // Backend
  { name: "Node.js", keywords: ["node.js", "nodejs", "node js"] },
  { name: "Express.js", keywords: ["express.js", "expressjs", "express framework"] },
  { name: "Django", keywords: ["django"] },
  { name: "Flask", keywords: ["flask framework"] },
  { name: "FastAPI", keywords: ["fastapi", "fast api"] },
  { name: "Spring Boot", keywords: ["spring boot"] },
  { name: "REST API", keywords: ["rest api", "restful api"] },
  { name: "GraphQL", keywords: ["graphql"] },
  { name: "Microservices", keywords: ["microservices", "microservice architecture"] },

  // Databases
  { name: "SQL", keywords: ["sql"] },
  { name: "MySQL", keywords: ["mysql"] },
  { name: "PostgreSQL", keywords: ["postgresql", "postgres"] },
  { name: "MongoDB", keywords: ["mongodb", "mongo db"] },
  { name: "Redis", keywords: ["redis"] },
  { name: "Oracle Database", keywords: ["oracle database", "oracle sql"] },
  { name: "SQLite", keywords: ["sqlite"] },
  { name: "Firebase", keywords: ["firebase"] },
  { name: "Database Design", keywords: ["database design", "database modeling"] },

  // AI and Data Science
  { name: "Artificial Intelligence", keywords: ["artificial intelligence"] },
  { name: "Machine Learning", keywords: ["machine learning"] },
  { name: "Deep Learning", keywords: ["deep learning"] },
  { name: "Natural Language Processing", keywords: ["natural language processing", "nlp"] },
  { name: "Computer Vision", keywords: ["computer vision"] },
  { name: "Data Science", keywords: ["data science"] },
  { name: "Data Analysis", keywords: ["data analysis", "data analytics"] },
  { name: "Statistics", keywords: ["statistics", "statistical analysis"] },
  { name: "Data Visualization", keywords: ["data visualization", "data visualisation"] },
  { name: "TensorFlow", keywords: ["tensorflow"] },
  { name: "PyTorch", keywords: ["pytorch"] },
  { name: "Pandas", keywords: ["pandas"] },
  { name: "NumPy", keywords: ["numpy"] },
  { name: "Scikit-learn", keywords: ["scikit-learn", "scikit learn"] },
  { name: "Generative AI", keywords: ["generative ai"] },
  { name: "Large Language Models", keywords: ["large language models", "llm", "llms"] },

  // Computer Science
  { name: "Data Structures", keywords: ["data structures"] },
  { name: "Algorithms", keywords: ["algorithms", "algorithm design"] },
  {
    name: "Object-Oriented Programming",
    keywords: ["object-oriented programming", "object oriented programming", "oop"],
  },
  { name: "Operating Systems", keywords: ["operating systems", "operating system"] },
  { name: "Computer Networks", keywords: ["computer networks", "computer networking"] },
  {
    name: "Database Management Systems",
    keywords: ["database management systems", "dbms"],
  },
  { name: "System Design", keywords: ["system design"] },
  { name: "Problem Solving", keywords: ["problem solving", "problem-solving"] },

  // Cloud and DevOps
  { name: "AWS", keywords: ["aws", "amazon web services"] },
  { name: "Microsoft Azure", keywords: ["microsoft azure", "azure cloud"] },
  { name: "Google Cloud", keywords: ["google cloud", "gcp"] },
  { name: "Docker", keywords: ["docker"] },
  { name: "Kubernetes", keywords: ["kubernetes", "k8s"] },
  { name: "Jenkins", keywords: ["jenkins"] },
  {
    name: "CI/CD",
    keywords: ["ci/cd", "continuous integration", "continuous deployment"],
  },
  { name: "Terraform", keywords: ["terraform"] },
  { name: "Linux", keywords: ["linux"] },

  // Tools and practices
  { name: "Git", keywords: ["git"] },
  { name: "GitHub", keywords: ["github"] },
  { name: "GitLab", keywords: ["gitlab"] },
  { name: "Agile", keywords: ["agile methodology", "agile development"] },
  { name: "Scrum", keywords: ["scrum"] },
  { name: "Unit Testing", keywords: ["unit testing"] },
  { name: "Integration Testing", keywords: ["integration testing"] },
  { name: "Jest", keywords: ["jest"] },
  { name: "Postman", keywords: ["postman"] },
  { name: "Figma", keywords: ["figma"] },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function escapeRegex(keyword: string): string {
  return keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsSkill(text: string, keyword: string): boolean {
  const escapedKeyword = escapeRegex(keyword);

  const pattern = new RegExp(
    `(^|[^a-z0-9+#])${escapedKeyword}($|[^a-z0-9+#])`,
    "i"
  );

  return pattern.test(text);
}

function detectPriority(line: string): SkillPriority | null {
  const heading = normalize(line).replace(/^[#*\-\s]+/, "");

  const preferredHeadings = [
    "preferred",
    "preferred qualifications",
    "preferred skills",
    "nice to have",
    "nice-to-have",
    "bonus",
    "bonus skills",
    "desirable qualifications",
    "additional skills",
  ];

  const requiredHeadings = [
    "required",
    "required qualifications",
    "required skills",
    "requirements",
    "technical requirements",
    "mandatory skills",
    "must have",
    "must-have",
  ];

  if (
    preferredHeadings.some(
      (item) => heading === item || heading.startsWith(`${item}:`)
    )
  ) {
    return "preferred";
  }

  if (
    requiredHeadings.some(
      (item) => heading === item || heading.startsWith(`${item}:`)
    )
  ) {
    return "required";
  }

  return null;
}

function findSkillsByPriority(
  jobDescription: string
): Map<string, SkillPriority> {
  const detectedSkills = new Map<string, SkillPriority>();
  let currentPriority: SkillPriority = "required";

  const lines = jobDescription.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) continue;

    const detectedPriority = detectPriority(trimmedLine);

    if (detectedPriority) {
      currentPriority = detectedPriority;
      continue;
    }

    const normalizedLine = normalize(trimmedLine);

    for (const skill of SKILLS) {
      const found = skill.keywords.some((keyword) =>
        containsSkill(normalizedLine, normalize(keyword))
      );

      if (!found) continue;

      const existingPriority = detectedSkills.get(skill.name);

      // A skill found as required takes priority over preferred.
      if (
        !existingPriority ||
        currentPriority === "required"
      ) {
        detectedSkills.set(skill.name, currentPriority);
      }
    }
  }

  return detectedSkills;
}

class ATSEngine {
  analyze(resumeText: string, jobDescription: string) {
    const resumeSkills = new Set(
      findSkillsByPriority(resumeText).keys()
    );

    const requiredSkills = new Set<string>();
    const preferredSkills = new Set<string>();

    for (const [skill, priority] of findSkillsByPriority(jobDescription)) {
      if (priority === "required") {
        requiredSkills.add(skill);
      } else {
        preferredSkills.add(skill);
      }
    }

    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    const matchedRequired: string[] = [];
    const missingRequired: string[] = [];
    const matchedPreferred: string[] = [];
    const missingPreferred: string[] = [];

    for (const skill of requiredSkills) {
      if (resumeSkills.has(skill)) {
        matchedSkills.push(skill);
        matchedRequired.push(skill);
      } else {
        missingSkills.push(skill);
        missingRequired.push(skill);
      }
    }

    for (const skill of preferredSkills) {
      if (resumeSkills.has(skill)) {
        matchedSkills.push(skill);
        matchedPreferred.push(skill);
      } else {
        missingSkills.push(skill);
        missingPreferred.push(skill);
      }
    }

    // Required skills carry twice the weight of preferred skills.
    const totalWeight =
      requiredSkills.size * 2 + preferredSkills.size;

    const achievedWeight =
      matchedRequired.length * 2 + matchedPreferred.length;

    const score =
      totalWeight === 0
        ? 0
        : Math.round((achievedWeight / totalWeight) * 100);

    const suggestions: string[] = [];

    if (missingRequired.length > 0) {
      suggestions.push(
        `Focus on the required skills missing from your resume: ${missingRequired.join(", ")}.`
      );
    }

    if (missingPreferred.length > 0) {
      suggestions.push(
        `Consider developing these preferred skills: ${missingPreferred.join(", ")}.`
      );
    }

    if (requiredSkills.size === 0 && preferredSkills.size === 0) {
      suggestions.push(
        "No recognized technical skills were detected in the job description. Add specific skills and qualifications before running the analysis."
      );
    }

    if (missingSkills.length === 0 && totalWeight > 0) {
      suggestions.push(
        "Your resume mentions all detected skills. Strengthen it with measurable project outcomes and relevant achievements."
      );
    }

    return {
      score,
      matchedSkills,
      missingSkills,
      suggestions,
    };
  }
}

export default new ATSEngine();
