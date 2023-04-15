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
