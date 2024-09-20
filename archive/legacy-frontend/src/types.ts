export interface GlobalState {
  appbar: {
    height: number;
    width: number;
  };
  window: {
    height: number;
    width: number;
  };
  scroll: {
    scrollPositionPercentage: number;
    scrollY: number;
  };
  chatSession: ChatSession;
}

export interface ChatSession {
  sessionId: string;
  name: string;
  title: string;
}
