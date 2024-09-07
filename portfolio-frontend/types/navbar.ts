export interface Contact {
  label: string;
  icon: React.JSX.Element;
  url: string;
  onClick?: () => Promise<void>;
}

export type Contacts = Contact[];

export interface NavBarItem {
  label: string;
  icon: JSX.Element;
  id: string;
  onClick: () => void;
}

export type NavBarItems = NavBarItem[];

export enum Section {
  Init = "section-intro",
  AboutMe = "section-about-me",
  Skills = "section-skills",
  SideProjects = "section-side-projects",
  Resume = "section-resume",
  Portfolio = "section-portfolio",
}
