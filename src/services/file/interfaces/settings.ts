import { ItemSettings } from '@/services';

export enum MaxWidth {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export interface FileItemSettings extends ItemSettings {
  maxWidth?: MaxWidth;
}
