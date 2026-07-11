import { Mail, Globe } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/icons";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  x: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  email: Mail,
  website: Globe,
};

export function SocialIcon({
  platform,
  size = 16,
  className,
}: {
  platform: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[platform.toLowerCase()] ?? Globe;
  return <Icon width={size} height={size} className={className} />;
}
