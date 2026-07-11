import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { SPRING_HERO, SPRING_DESCRIPTION } from "@/lib/motion/presets";

type BaseProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

type RevealProps = {
  reveal?: boolean;
  trigger?: "mount" | "inView";
};

// Direct transcription of the 3-breakpoint (phone/tablet/desktop) type scale
// from the design audit. `reveal` opts into the word-tokenized RevealText
// treatment; when reveal is used, `children` must be a plain string.

export function H1({
  children,
  as: Tag = "h1",
  className,
  reveal,
  trigger = "mount",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[46px] tablet:text-[120px] desktop:text-[174px] font-extrabold leading-[0.9] tracking-[-0.02em] text-center",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText
        as={Tag}
        className={classes}
        transition={SPRING_HERO}
        blur={2}
        trigger={trigger}
      >
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function H1b({
  children,
  as: Tag = "h1",
  className,
  reveal,
  trigger = "mount",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[52px] tablet:text-[62px] desktop:text-[72px] font-bold leading-[1] tracking-[-0.02em] text-left text-balance",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText as={Tag} className={classes} splitBy="char" trigger={trigger}>
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function H2({
  children,
  as: Tag = "h2",
  className,
  reveal,
  trigger = "inView",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[46px] tablet:text-[62px] desktop:text-[76px] font-semibold leading-[1] tracking-[-0.02em]",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText as={Tag} className={classes} trigger={trigger}>
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function H2b({
  children,
  as: Tag = "h2",
  className,
  reveal,
  trigger = "inView",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[48px] tablet:text-[58px] desktop:text-[68px] font-semibold leading-[1]",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText as={Tag} className={classes} trigger={trigger}>
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function H2c({
  children,
  as: Tag = "h3",
  className,
  reveal,
  trigger = "inView",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[32px] tablet:text-[42px] desktop:text-[52px] font-semibold leading-[1.2]",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText as={Tag} className={classes} trigger={trigger}>
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function H3({ children, as: Tag = "h3", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[28px] tablet:text-[30px] desktop:text-[32px] font-medium leading-[1.2]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function H4({ children, as: Tag = "h4", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[22px] tablet:text-[24px] desktop:text-[26px] font-medium leading-[1.2]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function H5({ children, as: Tag = "h5", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[20px] tablet:text-[22px] desktop:text-[24px] font-semibold leading-[1.2] tracking-[-0.04em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function H6({ children, as: Tag = "h6", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[18px] tablet:text-[20px] desktop:text-[22px] font-semibold leading-[1.2] tracking-[-0.04em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Body18({
  children,
  as: Tag = "p",
  className,
  reveal,
  trigger = "inView",
}: BaseProps & RevealProps) {
  const classes = cn(
    "text-[18px] font-normal leading-[1.4] tracking-[-0.04em]",
    className,
  );
  if (reveal && typeof children === "string") {
    return (
      <RevealText
        as={Tag}
        className={classes}
        transition={SPRING_DESCRIPTION}
        staggerDelay={0}
        trigger={trigger}
      >
        {children}
      </RevealText>
    );
  }
  return <Tag className={classes}>{children}</Tag>;
}

export function Body16({ children, as: Tag = "p", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[16px] font-normal leading-[1.4] tracking-[-0.04em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Body16Light({ children, as: Tag = "p", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[16px] font-light leading-[1.4] tracking-[-0.04em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Title22({ children, as: Tag = "p", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[22px] font-semibold leading-[1.4] tracking-[-0.04em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Body44({ children, as: Tag = "p", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "text-[40px] tablet:text-[42px] desktop:text-[44px] font-normal leading-[1.2] tracking-[-0.02em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

// Small decorative "/Label" text (Clash Grotesk in the source design).
export function Label({ children, as: Tag = "span", className }: BaseProps) {
  return (
    <Tag
      className={cn(
        "font-clash text-[20px] font-normal leading-[1.2] tracking-[-0.02em] text-black/50",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
