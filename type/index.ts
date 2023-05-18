export type Event = {
  serviceName: string;
  payload: Object;
};

export type Response = {
  result?: any;
  body?: string;
  statusCode?: number;
};
