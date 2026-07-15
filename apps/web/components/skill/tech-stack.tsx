import type { IconType } from 'react-icons'
import { FaAws, FaMasksTheater } from 'react-icons/fa6'
import {
  SiAstro,
  SiCloudflare,
  SiCss,
  SiDjango,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiGooglecloud,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiNuxt,
  SiPhp,
  SiPnpm,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiPython,
  SiReact,
  SiRemix,
  SiRuby,
  SiRubyonrails,
  SiSass,
  SiStorybook,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiVuedotjs,
  SiWordpress,
} from 'react-icons/si'

type Tech = { name: string; Icon: IconType; color: string }

const TECH_STACK: Tech[] = [
  { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', Icon: SiCss, color: '#663399' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Vue', Icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Nuxt', Icon: SiNuxt, color: '#00DC82' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Remix', Icon: SiRemix, color: '#FFFFFF' },
  { name: 'Astro', Icon: SiAstro, color: '#FF5D01' },
  { name: 'Sass', Icon: SiSass, color: '#CC6699' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Storybook', Icon: SiStorybook, color: '#FF4785' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', Icon: SiExpress, color: '#FFFFFF' },
  { name: 'NestJS', Icon: SiNestjs, color: '#E0234E' },
  { name: 'Ruby', Icon: SiRuby, color: '#CC342D' },
  { name: 'Rails', Icon: SiRubyonrails, color: '#D30001' },
  { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
  { name: 'WordPress', Icon: SiWordpress, color: '#21759B' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Django', Icon: SiDjango, color: '#44B78B' },
  { name: 'GraphQL', Icon: SiGraphql, color: '#E10098' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Prisma', Icon: SiPrisma, color: '#FFFFFF' },
  { name: 'Drizzle', Icon: SiDrizzle, color: '#C5F74F' },
  { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
  { name: 'Jest', Icon: SiJest, color: '#C21325' },
  { name: 'Vitest', Icon: SiVitest, color: '#6E9F18' },
  { name: 'Playwright', Icon: FaMasksTheater, color: '#2EAD33' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
  { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
  { name: 'GitLab', Icon: SiGitlab, color: '#FC6D26' },
  { name: 'AWS', Icon: FaAws, color: '#FF9900' },
  { name: 'Google Cloud', Icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Vercel', Icon: SiVercel, color: '#FFFFFF' },
  { name: 'Cloudflare', Icon: SiCloudflare, color: '#F38020' },
  { name: 'Turborepo', Icon: SiTurborepo, color: '#EF4444' },
  { name: 'pnpm', Icon: SiPnpm, color: '#F69220' },
  { name: 'Vite', Icon: SiVite, color: '#646CFF' },
  { name: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
  { name: 'Notion', Icon: SiNotion, color: '#FFFFFF' },
  { name: 'ESLint', Icon: SiEslint, color: '#4B32C3' },
  { name: 'Prettier', Icon: SiPrettier, color: '#F7B93E' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
]

export function TechStack() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {TECH_STACK.map(({ name, Icon, color }) => (
        <li
          key={name}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-colors hover:bg-white/10"
        >
          <Icon size={18} style={{ color }} aria-hidden />
          <span className="font-sans text-sm font-bold">{name}</span>
        </li>
      ))}
    </ul>
  )
}
