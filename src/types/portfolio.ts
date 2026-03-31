export type Locale = "ru" | "en";

export type ProjectId = "p0" | "p1" | "p2" | "p3" | "p4" | "p5";

export interface ProjectItem {
  id: ProjectId;
  image: string;
  demoUrl?: string;
  repoUrl: string;
}

export interface LocalizedProjectCopy {
  name: string[];
  category: string;
  summary: string;
  tech: string;
  note: string;
}

export interface StackEntry {
  name: string;
  focus: string;
  detail?: string;
}

export interface StackGroup {
  title: string;
  eyebrow: string;
  items: StackEntry[];
}

export interface PortfolioCopy {
  htmlLang: string;
  ui: {
    loading: string;
    loaderLead: string;
    loaderTrail: string;
    viewLabel: string;
    liveLabel: string;
    repoLabel: string;
    scrollLabel: string;
  };
  hero: {
    eyebrow: string;
    status: string;
    name: string[];
    role: string;
    trajectory: string;
    summary: string;
    orbit: string[];
  };
  sections: {
    projects: string;
    stack: string;
    contact: string;
  };
  projectIntro: string;
  projects: Record<ProjectId, LocalizedProjectCopy>;
  stack: {
    heading: string[];
    intro: string;
    terminalCommand: string;
    terminalHint: string;
    marquee: string[];
    groups: StackGroup[];
  };
  contact: {
    heading: string[];
    subline: string;
    telegramLabel: string;
    githubLabel: string;
    availability: string;
  };
  footer: {
    rights: string;
    signature: string;
  };
}
