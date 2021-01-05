export interface IConfig {
	applicationUrl: string;
	apiGatewayUrl: string;
}

const localConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3000",
	applicationUrl: "http://localhost:3000",
};

const developmentConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3000",
	applicationUrl: "http://localhost:3000",
};


const stagingConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3000",
	applicationUrl: "http://localhost:3000",
};

const productionConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3000",
	applicationUrl: "http://localhost:3000",
};


const appConfig =
  process.env.REACT_APP_ENV === "production"
    ? productionConfig
    : process.env.REACT_APP_ENV === "staging"
    ? stagingConfig
    : process.env.REACT_APP_ENV === "development"
    ? developmentConfig
    : localConfig;

export default appConfig;

