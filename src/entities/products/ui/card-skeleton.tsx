import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full">
      <Skeleton className="h-36 w-full" />

      <Skeleton className="h-4 w-full" />

      <CardContent>
        <Skeleton className="h-8 w-full" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-4 w-full" />
      </CardFooter>
    </Card>
  );
};
