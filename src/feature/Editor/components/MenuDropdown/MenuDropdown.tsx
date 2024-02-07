import { useState } from "react";

import { IconChevronDown } from "../icons";
import { Button, ButtonProps } from "../Button";
import styles from "./MenuDropdown.module.css";

interface MenuDropdownProps {
  options: (ButtonProps & { children: React.ReactNode })[];
  title: string;
}
export const MenuDropdown = ({ options, title }: MenuDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      <Button onClick={() => setShowDropdown((prev) => !prev)}>
        <span className={styles.title}>{title}</span>
        <IconChevronDown />
      </Button>
      {showDropdown && (
        <div className={styles.dropdown} onClick={() => setShowDropdown(false)}>
          {options.map(({ className, ...option }, index) => (
            <Button
              key={index}
              {...option}
              className={`${styles.menuItem} ${className ? className : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
