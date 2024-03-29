import Head from "next/head";
import Container from "../components/container";
import SiteHero from "../components/site-hero";
import Layout from "../components/layout";
import {
  getItemsByType,
  getRecentItemsByType,
  POSTS,
  PROJECTS,
} from "../lib/api";
import { AUTHOR_NAME, AUTHOR_SLOGAN } from "../lib/constants";
import About from "../components/about";
import SectionSeparator from "../components/section-separator";
import SectionWrapper from "../layouts/section-wrapper";
import PostPreview from "../components/post-preview";
import ProjectPreview from "../components/project-preview";
import { useRouter } from "next/router";

export default function Index({ posts, projects }) {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Head>
          <title>
            {AUTHOR_NAME} | {AUTHOR_SLOGAN}
          </title>
        </Head>
        <SiteHero />
        <Container>
          <About />
          <SectionSeparator />
          <SectionWrapper
            title="Recent Posts"
            footerText="See more..."
            footerAction={() => router.push("/blog")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 gap-6 pb-12">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  readTime={post.readTime}
                />
              ))}
            </div>
          </SectionWrapper>
          <SectionWrapper title="Recent Projects">
            <div className="grid grid-cols-1 md:gap-y-8 gap-y-6 pb-24">
              {projects.map((project, idx) => (
                <ProjectPreview
                  flipLayout={idx % 2}
                  key={project.slug}
                  title={project.title}
                  coverImage={project.coverImage}
                  date={project.date}
                  author={project.author}
                  slug={project.slug}
                  excerpt={project.excerpt}
                  readTime={project.readTime}
                  technologies={project.technologies}
                  githubLink={project.githubLink}
                />
              ))}
            </div>
          </SectionWrapper>
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const posts = getRecentItemsByType(POSTS, [
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  const projects = getItemsByType(PROJECTS, [
    "title",
    "date",
    "slug",
    "technologies",
    "coverImage",
    "excerpt",
    "githubLink",
  ]);

  return {
    props: { posts, projects },
  };
}
