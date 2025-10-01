import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-sm font-medium text-accent">Page not found</p>
        <h1 className="text-2xl font-semibold text-foreground">We could not find what you were looking for.</h1>
        <p className="text-sm text-muted-foreground">Check the URL or head back to the homepage to continue exploring FarmLink.</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-accent px-6 py-2 text-sm font-medium text-accent-foreground shadow hover:bg-accent/90"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
