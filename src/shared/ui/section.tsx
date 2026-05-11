import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const Section = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <section className={cn("py-4 md:py-8 lg:py-12", className)} {...props} />
  );
};
