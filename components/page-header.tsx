interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col mb-4 text-center md:text-left">
      <h1 className="text-2xl font-bold">{title}</h1>
      {!!description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
