import React, { FC, PropsWithChildren } from "react";
import styles from "./center.module.css";

const Center: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.center}>{children}</div>;
};

export default Center;
