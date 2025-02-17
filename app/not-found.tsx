import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="border rounded-full py-2 px-4 hover:bg-muted-foreground/10 mt-2"
      >
        👈 Return Home
      </Link>
    </div>
  );
}
