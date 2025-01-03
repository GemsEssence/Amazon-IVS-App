export interface StageResponse {
    channel: {
      ingestEndpoint: string;
      streamKey: string;
    };
    stage: {
      id: string;
      token: {
        token: string;
        participantId: string;
      };
    };
  }