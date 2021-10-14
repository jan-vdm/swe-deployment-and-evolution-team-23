import fetchWeather from "./fetchWeather";

describe("fetchWeather tests", () => {
  it("fetchWeather should return data in Weather Data format", async () => {
    // SETUP
    const expectedData = {
      location: {
        name: "Melbourne",
        region: "Victoria",
        country: "Australia",
        localtime: "2021-10-15 2:17",
      },
      current: {
        tempC: 8.0,
        condition: {
          text: "Clear",
          icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
          code: 1000,
        },
      },
    };
    const mockData = {
      location: {
        name: "Melbourne",
        region: "Victoria",
        country: "Australia",
        lat: -37.82,
        lon: 144.97,
        tz_id: "Australia/Melbourne",
        localtime_epoch: 1634224645,
        localtime: "2021-10-15 2:17",
      },
      current: {
        last_updated_epoch: 1634220000,
        last_updated: "2021-10-15 01:00",
        temp_c: 8.0,
        temp_f: 46.4,
        is_day: 0,
        condition: {
          text: "Clear",
          icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
          code: 1000,
        },
        wind_mph: 8.1,
        wind_kph: 13.0,
        wind_degree: 290,
        wind_dir: "WNW",
        pressure_mb: 1003.0,
        pressure_in: 29.62,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 87,
        cloud: 0,
        feelslike_c: 6.9,
        feelslike_f: 44.5,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 1.0,
        gust_mph: 7.2,
        gust_kph: 11.5,
      },
    };
    const fakeFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
    global.fetch = fakeFetch;

    const result = await fetchWeather("key");

    expect(result).toEqual(expectedData);
  });
});
