export interface IConfig {
  mode: string;
  debugLogging: boolean;
  elastic: {
    username: string;
    password: string;
    node: string;
  };
  apm: {
    serverUrl: string;
  };
}
