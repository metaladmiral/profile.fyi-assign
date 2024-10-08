type AlertProps = {
  type: string;
  display: string;
  children: React.ReactNode;
};

export default function Alert({ type, display, children }: AlertProps) {
  return (
    <div
      role="alert"
      className={`alert alert-${type} w-auto fixed right-5 top-5 ${display}`}
    >
      {type === "error" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}

      <span>{children}</span>
    </div>
  );
}
