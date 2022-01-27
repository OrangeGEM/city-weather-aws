export interface WeatherInterface {
    current: {
      temperature: {
        data: {
          value: string;
        }
      },
      weather: {
        data: {
          value: string;
        }
      },
      wind: {
        direction: {
          data: {
            code: string;
            name: string;
          }
        },
        speed: {
          data: {
            value: number;
            unit: string;
          }
        }
      },
      pressure: {
        data: {
          value: number;
          unit: string;
        }
      },
      humidity: {
        data: {
          value: number;
          unit: string;
        }
      }
    }
  }
  