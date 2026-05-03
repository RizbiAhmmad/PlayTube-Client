export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "0",
    title: "The Future of Cinema: VR and Beyond",
    excerpt: "How virtual reality is changing the way we experience storytelling in the 21st century.",
    content: `
      Virtual Reality (VR) is no longer a science fiction concept. It's rapidly becoming a mainstream medium for entertainment, particularly in the world of cinema. Filmmakers are now exploring ways to place the audience directly inside the movie, allowing them to look around and interact with the environment.

      This shift from passive viewing to active participation opens up endless possibilities. Imagine standing in the middle of an intergalactic battle or walking through a historical scene as it unfolds. However, VR also presents unique challenges for directors, such as how to guide the viewer's attention when they have 360 degrees of freedom.

      As technology advances, we can expect more immersive experiences that blur the line between movies and video games. The future of cinema is not just about watching a story; it's about living it.
    `,
    date: "May 1, 2024",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2000&auto=format&fit=crop",
    category: "Technology",
  },
  {
    id: "1",
    title: "10 Must-Watch Documentaries This Month",
    excerpt: "From deep-sea explorations to historical mysteries, here are the top picks for you.",
    content: `
      Documentaries have the power to educate, inspire, and provoke change. This month, we've curated a list of ten exceptional documentaries that cover a wide range of subjects.

      1. **Deep Blue Horizon**: A breathtaking look at the mysteries of the deep ocean.
      2. **The Forgotten City**: Uncovering the secrets of an ancient civilization lost to time.
      3. **Code Breakers**: The story of the men and women who revolutionized modern computing.
      ...and seven more incredible stories that will change the way you see the world.

      Whether you're interested in science, history, or social issues, there's something on this list for everyone. Grab some popcorn and get ready for a deep dive into reality.
    `,
    date: "April 28, 2024",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
    category: "Recommendations",
  },
  {
    id: "2",
    title: "Behind the Scenes: Directing a Blockbuster",
    excerpt: "An exclusive interview with the director of the year's biggest sci-fi epic.",
    content: `
      Directing a major Hollywood blockbuster is a monumental task that requires a unique blend of creative vision and logistical mastery. We sat down with the director of "Star Horizon" to discuss the challenges of bringing a massive sci-fi world to life.

      "It's about balance," the director explains. "You have these huge action sequences with thousands of moving parts, but at the heart of it, you need a human story that people can connect with."

      From coordinating massive stunt teams to working with world-class VFX artists, the process is grueling but rewarding. In this exclusive interview, we explore the creative process, the pressure of a massive budget, and the joy of seeing a vision finally hit the big screen.
    `,
    date: "April 25, 2024",
    author: "Michael Ross",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop",
    category: "Interview",
  },
];
