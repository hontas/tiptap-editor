import styles from "./Button.module.css";

type ButtonProps = React.PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}>;

export const Button = ({
  onClick,
  disabled = false,
  className,
  children,
  title,
}: ButtonProps) => {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export const ButtonRound = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={`${styles.round} ${className ? className : ""}`}
    />
  );
};
