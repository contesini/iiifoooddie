export interface Event {
  createdAt: string;
  fullCode: string;
  code: string;
  orderId: string;
  id: string;
  metadata: Metadata;
}

export interface Metadata {
  [key: string]: string;
}
