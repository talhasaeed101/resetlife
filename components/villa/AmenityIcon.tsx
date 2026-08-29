function AmenityIcon({ name }: { name: string }) {
  switch (name) {
    case "bed":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 11V8C4 6.343 5.343 5 7 5H11V19H5C4.448 19 4 18.552 4 18V11ZM13 5H17C18.657 5 20 6.343 20 8V11V18C20 18.552 19.552 19 19 19H13V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "bath":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12H19V16C19 18.761 16.761 21 14 21H10C7.239 21 5 18.761 5 16V12ZM5 12V9C5 7.343 6.343 6 8 6H9M19 12V9C19 7.343 17.657 6 16 6H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pool":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 10C5.5 11.5 6.5 11.5 8 10C9.5 8.5 10.5 8.5 12 10C13.5 11.5 14.5 11.5 16 10C17.5 8.5 18.5 8.5 20 10M4 14C5.5 15.5 6.5 15.5 8 14C9.5 12.5 10.5 12.5 12 14C13.5 15.5 14.5 15.5 16 14C17.5 12.5 18.5 12.5 20 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "wifi":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 9.5C8.5 6.5 15.5 6.5 19 9.5M8 13C10 11.2 14 11.2 16 13M11 16.5H11.01M12 16.5C12 17.052 11.552 17.5 11 17.5C10.448 17.5 10 17.052 10 16.5C10 15.948 10.448 15.5 11 15.5C11.552 15.5 12 15.948 12 16.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "kitchen":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 4V10M12 4V10M17 4V10M5 10H19V20H5V10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "parking":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 4H13C15.761 4 18 6.239 18 9C18 11.761 15.761 14 13 14H10V20H7V4ZM10 7V11H13C14.105 11 15 10.105 15 9C15 7.895 14.105 7 13 7H10Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 17H19V19H5V17ZM7 11H9V15H7V11ZM11 8H13V15H11V8ZM15 10H17V15H15V10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export { AmenityIcon };
