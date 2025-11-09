// src/types/app.types.ts

export type AppMode = "educational" | "romantic";

export interface AppState {
  showLanding: boolean;
  mode: AppMode;
}
