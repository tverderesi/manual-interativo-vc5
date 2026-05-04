export type ColorGroup = 'brancas' | 'claras' | 'escuras' | 'mistas';
export type SoilLevel = 'leve' | 'normal' | 'pesada';
export type LoadSize = 'minima' | 'pequena' | 'media' | 'cheia';
export type DryingPreference = 'sim' | 'nao' | 'talvez';

export type WasherInput = {
  description: string;
  colorGroup?: ColorGroup;
  soilLevel?: SoilLevel;
  loadSize?: LoadSize;
  wantsDrying?: DryingPreference;
  quiet?: boolean;
  allergySensitive?: boolean;
  hurry?: boolean;
};

export type WasherRecommendation = {
  programId: string;
  programName: string;
  temperature: string;
  spin: string;
  maxLoad: string;
  drying?: {
    recommended: boolean;
    modeName?: string;
    reason?: string;
  };
  extraOptions: string[];
  warnings: string[];
  reasons: string[];
};
