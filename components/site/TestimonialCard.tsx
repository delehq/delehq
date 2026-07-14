"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Body16, H6 } from "@/components/ui/typography";
import { getMediaUrl } from "@/lib/supabase/storage";

type Testimonial = {
  quote: string;
  back_content: string | null;
  author_name: string;
  author_role: string | null;
  avatar_path?: string | null;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [flipped, setFlipped] = useState(false);
  const canFlip = Boolean(testimonial.back_content);
  const avatarUrl = getMediaUrl(testimonial.avatar_path);

  return (
    <div
      className="relative h-[340px] [perspective:1200px]"
      onMouseEnter={() => canFlip && setFlipped(true)}
      onMouseLeave={() => canFlip && setFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full rounded-2xl bg-black [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.15 }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
          <Body16 className="text-cream/80">{testimonial.quote}</Body16>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image src={avatarUrl} alt="" fill className="object-cover" />
              </div>
            )}
            <div>
              <H6 as="p" className="text-cream">
                {testimonial.author_name}
              </H6>
              {testimonial.author_role && (
                <Body16 className="text-cream/50">{testimonial.author_role}</Body16>
              )}
            </div>
          </div>
        </div>
        {canFlip && (
          <div className="absolute inset-0 flex flex-col justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Body16 className="text-cream/80">{testimonial.back_content}</Body16>
          </div>
        )}
      </motion.div>
    </div>
  );
}
