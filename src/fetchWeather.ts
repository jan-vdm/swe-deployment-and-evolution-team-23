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

export const fetchWeather = async (key: string) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=Melbourne`,
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

export default fetchWeather;
export { WeatherData };
