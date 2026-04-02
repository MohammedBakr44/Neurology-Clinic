import { Link } from "@tanstack/react-router";
import { Button } from "@neurology/ui";

export function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link to="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}

