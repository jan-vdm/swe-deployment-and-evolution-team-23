import { Component, createEffect, createResource } from "solid-js";

import styles from "./App.module.css";
import { Show } from "solid-js/web";

type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    tempC: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
};

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=Melbourne`,
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    const weatherData: WeatherData = {
      location: {
        name: responseData.location.name,
        region: responseData.location.region,
        country: responseData.location.country,
        localtime: responseData.location.localtime,
      },
      current: {
        tempC: responseData.current["temp_c"],
        condition: {
          text: responseData.current.condition.text,
          icon: responseData.current.condition.icon,
          code: responseData.current.condition.code,
        },
      },
    };
    return weatherData;
  } catch (error) {
    console.error(error);
  }
};

const App: Component = () => {
  const [data, { refetch }] = createResource(fetchWeather);
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
