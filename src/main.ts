import 'dotenv/config';
import { loadControllers } from './controllers';
import { Database } from './database/database';
import { loadRepositories } from './repositories';
import { loadRoutes } from './routes';
import { Server } from './server';
import { loadServices } from './services';


export const loadServer = async () => {
    const databaseConnection = await Database.getConnection();
    const repositories = loadRepositories(databaseConnection);
    const services = loadServices(repositories);
    const controllers = loadControllers(services);
    const routes = loadRoutes(controllers);
    const server = new Server({
        port: parseInt(process.env.APP_PORT as string),
        host: process.env.APP_HOST,
    });
    await server.setRoutes(routes);
    return server;
}

export const main = async () => {
    const server = await loadServer();
    await server.start();
}