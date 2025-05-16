interface DateProps extends React.HTMLAttributes<HTMLParagraphElement> {
  from?: string;
  to?: string;
  className?: string;
}
import { formatDate } from "@/utils";

export default function Date({ from, to, className, ...rest }: DateProps) {
  return (
    <p className={`not-prose text-zinc-500 italic dark:text-zinc-400 ${className}`} {...rest}>
      {from && <span>{formatDate(from)}</span>}
      {to && <span> ─ </span>}
      {to === "Present" ? (
        <span className="me-highlight px-1.5 py-0.5">Present</span>
      ) : (
        to && <span>{formatDate(to)}</span>
      )}
    </p>
  );
}
