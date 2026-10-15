import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_DEPLOYMENT_ENVIRONMENT } from '@opentelemetry/semantic-conventions';

let sdk: NodeSDK | null = null;

export async function startTelemetry(serviceName='@marsh/gateway'){
  if (process.env.ENABLE_OTEL !== 'true') return;
  const url = (process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318').replace(/\/$/,'') + '/v1/traces';
  const exporter = new OTLPTraceExporter({ url });
  const resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development'
  });
  sdk = new NodeSDK({
    traceExporter: exporter,
    resource,
    instrumentations: [getNodeAutoInstrumentations()]
  });
  await sdk.start();
  console.debug('[otel] exporting to', url);
}

export async function stopTelemetry(){ 
  if (sdk) await sdk.shutdown().catch(()=>{}); 
}
