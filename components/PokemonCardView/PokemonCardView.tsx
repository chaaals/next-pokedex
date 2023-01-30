import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import CardImage from "../CardImage/CardImage";
import pokeball from "../../public/assets/pokeball.svg";

import styles from "./PokemonCardView.module.css";

interface CardProps {
  name: string;
  imageURL: string;
  pid: string;
  version: string;
  from: string | number;
}

const PokemonCardView: FC<CardProps> = ({
  pid,
  name,
  imageURL,
  version,
  from,
}) => {
  return (
    <section className={styles["card-container"]}>
      <Image
        className={styles["card-bg"]}
        priority={true}
        src={pokeball}
        alt="pokeball"
        width={145}
        height={145}
      />

      <CardImage
        src={imageURL}
        fallback="https://img.pokemondb.net/sprites/home/normal/unown-qm.png"
        name={name}
        width={85}
        height={85}
      />

      <div className={styles["card-content"]}>
        <div className={styles["card-content-text"]}>
          <p>{pid.padStart(4, "0")}</p>
          <p className={styles["card-name"]}>{name}</p>
        </div>

        <Link
          className={styles["card-link"]}
          href={`/pokemon/${pid}${`?version=${version}&from=${from}`}`}
          as={`/pokemon/${pid}`}
        >
          select
        </Link>
      </div>
    </section>
  );
};

export default PokemonCardView;
