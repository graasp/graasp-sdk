import { DiscriminatedItem, Member } from '..';

export enum ItemValidationStatus {
  Success = 'success',
  Failure = 'failure',
  Pending = 'pending',
  PendingManual = 'pending-manual',
}

export enum ItemValidationProcess {
  BadWordsDetection = 'bad-words-detection',
  ImageChecking = 'image-classification',
  // AggressiveAndHateSpeech = 'aggressive-language-classification',
}

export enum ItemValidationReviewStatus {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Pending = 'pending',
}

export interface ItemValidation {
  id: string;
  item: DiscriminatedItem;
  process: `${ItemValidationProcess}` | ItemValidationProcess;
  status: `${ItemValidationStatus}` | ItemValidationStatus;
  result: string;
  itemValidationGroup: ItemValidationGroup;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemValidationGroup {
  id: string;
  item: DiscriminatedItem;
  createdAt: Date;
  itemValidations: ItemValidation[];
}

export interface ItemValidationReview {
  id: string;
  itemValidation: ItemValidation;
  reviewer: Member | null;
  status: `${ItemValidationReviewStatus}` | ItemValidationReviewStatus;
  reason: string;
  updatedAt: Date;
  createdAt: Date;
}
