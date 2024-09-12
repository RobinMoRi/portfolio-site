import {
  AboutMe,
  Footer,
  Intro,
  Portfolio,
  Resume,
  SideProjects,
  Skills,
} from "@/app/components/sections";

export default function Home() {
  return (
    <>
      <Intro />
      <AboutMe />
      <Skills />
      <Resume />
      <SideProjects />
      <Portfolio />
      <Footer />
    </>
  );
}

// OBS: Do NOT make client component
