/* eslint-disable @next/next/no-img-element */
import React, { FC, ChangeEvent } from "react";
import styles from "./SelectVersion.module.css";

interface SelectProps {
  version: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const versions = [
  { value: "dream_world", display: "Dream World" },
  { value: "crystal", display: "Crystal" },
  { value: "emerald", display: "Emerald" },
  { value: "platinum", display: "Platinum" },
];

const SelectVersion: FC<SelectProps> = ({ version, handleChange }) => {
  return (
    <div className={styles["select-container"]}>
      <img
        className={styles.icon}
        src={"/_next/static/media/pokeball.419244e9.svg"}
        alt="pokeball"
      />

      <select className={styles.select} value={version} onChange={handleChange}>
        <option value="default">Select a version</option>
        {versions.map(({ value, display }) => (
          <option key={value} value={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectVersion;
