import { H4, Body16 } from "@/components/ui/typography";

export function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-black/10 py-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:pr-36 desktop:pr-44">
      <H4 as="h3">{title}</H4>
      <Body16 className="max-w-105 text-black/60">{description}</Body16>
    </div>
  );
}
