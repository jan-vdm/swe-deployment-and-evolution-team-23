import { Component, createEffect, createResource } from "solid-js";
import { Show } from "solid-js/web";
import fetchWeather from "./fetchWeather";

import styles from "./App.module.css";

const App: Component = () => {
  const [data, { refetch }] = createResource(() =>
    fetchWeather(import.meta.env.VITE_API_KEY as string)
  );
  createEffect(() => {
    console.log(data());
  });
  setInterval(() => refetch(), 10 * 60 * 1000);
  return (
    <div class={styles.App}>
      <main class={styles.main}>
        <h1>Weather</h1>
        <p>
          <img
            src={data()?.current.condition.icon}
            width={84}
            height={84}
            alt="weather icon"
          />
          <br />
          <span>It is currently,</span>
          <br />
          <Show when={!data.loading} fallback={<div>Loading Weather...</div>}>
            <span>{data()?.current.tempC}&deg;C</span>
            <br />
            <span>
              in {data()?.location.name}, {data()?.location.region},{" "}
              {data()?.location.country}
            </span>
            <br />
            <span>
              it is considered to be{" "}
              {data()?.current.condition.text.toLowerCase()} ✨
            </span>
            <br />
            <span class={styles.small}>
              last updated at {data()?.location.localtime}
            </span>
          </Show>
        </p>
      </main>
    </div>
  );
};

export default App;
