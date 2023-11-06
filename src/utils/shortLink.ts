import { CLIENT_PREFIX, Context } from '@/constants';

export function getPlatformPrefix(shortLinkView: Context) {
  const [BUILDER_PREFIX, PLAYER_PREFIX, LIBRARY_PREFIX] = CLIENT_PREFIX;

  switch (shortLinkView) {
    case Context.Builder:
      return BUILDER_PREFIX;
    case Context.Library:
      return LIBRARY_PREFIX;
    case Context.Player:
      return PLAYER_PREFIX;
    default:
      throw new Error(`The given context '${shortLinkView}' is not valid`);
  }
}
