import styles from "./Button.module.css";

type ButtonProps = React.PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}>;

export const Button = ({
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
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
