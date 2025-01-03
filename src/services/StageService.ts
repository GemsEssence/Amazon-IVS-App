import { NativeModules } from 'react-native';
import { API_URL } from '../constants/config';
import type { StageResponse } from './types';

const { BroadcastManager } = NativeModules;

export const createStage = async (): Promise<StageResponse> => {
  try {
    const response = await BroadcastManager.createStage();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const initializeBroadcast = async (
  ingestEndpoint: string,
  streamKey: string
): Promise<void> => {
  try {
    await BroadcastManager.initializeBroadcast(ingestEndpoint, streamKey);
  } catch (error) {
    throw new Error(error);
  }
};

export const stopBroadcast = async (): Promise<void> => {
  try {
    await BroadcastManager.stopBroadcast();
  } catch (error) {
    throw new Error(error);
  }
};