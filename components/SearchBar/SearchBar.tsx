import React, { FC, FormEvent } from "react";
import clsx from "clsx";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  handleChange,
  handleSubmit,
}) => {
  const inputClassNames = clsx(
    styles["search-input"],
    value === "" && styles.error
  );

  const buttonClassNames = clsx(
    styles["search-submit"],
    value === "" && styles.disabled
  );

  return (
    <form className={styles["search-bar"]} onSubmit={handleSubmit}>
      <input
        className={inputClassNames}
        name="keyword"
        type="text"
        placeholder="Enter Pokemon name..."
        onChange={handleChange}
        value={value}
      />
      <button
        className={buttonClassNames}
        type="submit"
        disabled={value === ""}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
