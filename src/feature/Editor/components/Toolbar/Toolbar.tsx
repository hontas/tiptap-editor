import { PropsWithChildren } from "react";
import styles from "./Toolbar.module.css";

export const Toolbar = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export const ToolbarDivider = () => <div className={styles.divider} />;
