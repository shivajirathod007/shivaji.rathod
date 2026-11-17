import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { AchievementsSection } from '@/components/achievements/AchievementsSection';
import { CertificationsSection } from '@/components/certifications/CertificationsSection';
import { LatestWriteupsStrip } from '@/components/blog/LatestWriteupsStrip';
import { ContactSection } from '@/components/contact/ContactSection';
import { getLatestPosts } from '@/lib/mdx';

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        {/* Merged Recognition anchor for Achievements + Credentials */}
        <div id="recognition">
          <AchievementsSection />
          <CertificationsSection />
        </div>
        <LatestWriteupsStrip posts={latestPosts} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
