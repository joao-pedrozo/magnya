interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
}

export default function SectionTitle({
  subtitle,
  title,
  ...rest
}: SectionTitleProps) {
  return (
    <div {...rest}>
      <h1 className="text-4xl font-bold text-blue-600">{title}</h1>
      {subtitle && <p className="text-lg mt-2">{subtitle}</p>}
    </div>
  );
}
