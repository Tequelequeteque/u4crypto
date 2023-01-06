import { ReqRefDefaults, Server as HapiServer, ServerRoute } from '@hapi/hapi';

interface IServerOptions {
    port?: number;
    host?: string;
}

export class Server {
    private app: HapiServer;
    constructor({
        port = 3000,
        host = '0.0.0.0',
    }: IServerOptions = {}) {
        this.app = new HapiServer({
            port,
            host,
        });
    }

    public async start(): Promise<void> {
        await this.app.start();
        console.log(`Server running at: ${this.app.info.uri}`);
    }

    private async loadSwagger(): Promise<void> {
        await this.app.register([
            {
                plugin: require('@hapi/inert'),
            },
            {
                plugin: require('@hapi/vision'),
            },
            {
                plugin: require('hapi-swagger'),
                options: {
                    info: {
                        title: 'u4crypto API Documentation',
                        version: '1.0.0',
                    },
                    grouping: 'tags',
                }
            }
        ])
    }
    public async setRoutes(routes: ServerRoute<ReqRefDefaults>[]): Promise<void> {
        await this.loadSwagger();
        this.app.route(routes);
    }

    public getApp(): HapiServer {
        return this.app;
    }

}