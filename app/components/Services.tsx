"use client";
import { useState } from "react";
import styles from "./flip.module.css";

const COUNT = 12;

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const list = Array.from({ length: showAll ? COUNT : 8 }, (_, i) => i + 1);

  return (
    <section id="services" className="py-16 bg-[#2b3439]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold mb-8 text-slate-100">
          Common Gumboot Services
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {list.map((n) => (
            <div
              key={n}
              className={`${styles.card} bg-transparent rounded-xl`}
              tabIndex={0}
              aria-label={`Service ${n}`}
            >
              <div className={styles.inner}>
                {/* FRONT */}
                <div className={`${styles.face} ${styles.front}`}>
                  <img
                    src={`/services/${n}.svg`}
                    alt={`Service ${n} front`}
                    draggable={false}
                  />
                </div>
                {/* BACK */}
                <div className={`${styles.face} ${styles.back}`}>
                  <img
                    src={`/services/${n}x.svg`}
                    alt={`Service ${n} back`}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="rounded-xl bg-white/40 text-white text-sm px-4 py-2 hover:bg-white/20 transition"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      </div>
    </section>
  );
}
