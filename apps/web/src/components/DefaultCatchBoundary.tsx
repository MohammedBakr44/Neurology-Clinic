import { ErrorComponent, Link, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@neurology/ui";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-4">
      <ErrorComponent error={error} />
      <div className="flex gap-2">
        <Button onClick={() => router.invalidate()}>Try again</Button>
        <Link to="/">
          <Button variant="outline">Home</Button>
        </Link>
      </div>
    </div>
  );
}

