import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { appEnvs } from "../../app/envs";
import { postgresEnvs } from "../../app/envs/postgres.env";

const isProduction = appEnvs.ambiente === "production";

const isTest = appEnvs.ambiente?.toLocaleLowerCase() === "test";
const rootDir = isProduction ? "dist" : "src";

// export default new DataSource({
//   type: "postgres",
//   url: isTest ? postgresEnvs.urlTest : postgresEnvs.url,
//   entities: [rootDir + "/app/shared/database/entities/**/*"],
//   migrations: [rootDir + "/app/shared/database/migrations/**/*"],
//   synchronize: false,
//   logging: false,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

let config: DataSourceOptions;

if (isTest) {
  config = {
    type: "postgres",
    url: postgresEnvs.urlTest,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: false,
    logging: false,
    entities: [rootDir + "/app/shared/database/entities/**/*"],
    migrations: [rootDir + "/app/shared/database/migrations/**/*"],
  };
} else {
  const isProduction = appEnvs.ambiente?.toLocaleLowerCase() === "production";
  const usingDocker = process.env.USING_DOCKER === "true";

  const rootDir = isProduction ? "dist" : "src";

  const ssl = !usingDocker
    ? {
        rejectUnauthorized: false,
      }
    : undefined;

  config = {
    type: "postgres",
    url: postgresEnvs.url,
    synchronize: false,
    logging: false,
    ssl,
    entities: [rootDir + "/app/shared/database/entities/**/*"],
    migrations: [rootDir + "/app/shared/database/migrations/**/*"],
  };
}

export default config;
