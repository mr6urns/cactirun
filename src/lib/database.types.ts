export interface Database {
  public: {
    Tables: {
      scores: {
        Row: {
          id: string;
          player_name: string;
          score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          player_name: string;
          score: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          player_name?: string;
          score?: number;
          created_at?: string;
        };
      };
    };
  };
}