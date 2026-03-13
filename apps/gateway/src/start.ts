import { config } from 'dotenv';
import { join } from 'node:path';
config({ path: join(process.cwd(), '.env') });

import { buildServer } from './index';
import { AppConfig } from './config/app';
import { startTelemetry, stopTelemetry } from './observability/otel.node';

async function main(){
  await startTelemetry();
  const app = buildServer();
  await app.listen({ port: AppConfig.port, host: '0.0.0.0' });
  console.log('Gateway running on http://localhost:'+AppConfig.port);
}

main().catch(err => { 
  console.error(err); 
  stopTelemetry(); 
  process.exit(1); 
});
