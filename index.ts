import api from 'api';
import axios, { AxiosError } from 'axios';

const sdk = api('@render-api/v1.0#ja8rb1jlsxhh7qu');

// Configuration constants
const CONFIG = {
  serviceUrl: process.env.SERVICE_URL ?? '',
  serviceId: process.env.SERVICE_ID ?? '',
  bearerToken: process.env.BEARER_TOKEN_RENDER,
  timeoutDelay: parseInt(process.env.TIMEOUT_DELAY ?? '5000', 10)
} as const;

// Validate required environment variables
if (!CONFIG.serviceId || !CONFIG.bearerToken) {
  throw new Error('Missing required environment variables: SERVICE_ID or BEARER_TOKEN_RENDER');
}

async function restartRenderServer(serviceId: string): Promise<void> {
  try {
    sdk.auth(CONFIG.bearerToken);
    const { data } = await sdk.restartServer({ serviceId });
    console.log(`Server ${serviceId} restarting successfully...`, data);
  } catch (error) {
    console.error('Error restarting server:', error);
    throw error;
  }
}

async function checkServerAndRestart(): Promise<void> {
  try {
    await axios.get(CONFIG.serviceUrl, { timeout: CONFIG.timeoutDelay });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ECONNREFUSED') {
      console.log('Server DOWN (Timeout). Restarting server...');
      await restartRenderServer(CONFIG.serviceId);
    } else {
      console.error('Error:', axiosError.message);
      throw axiosError;
    }
  }
}

// Execute the main function
checkServerAndRestart()
.then(() => {
  console.log('Application finished successfully.');
  process.exit(0);
})
.catch(error => {
  console.error('Application error:', error);
  process.exit(1);
});