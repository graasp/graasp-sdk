export const MemberConstants = {
  USERNAME_FORBIDDEN_CHARS_REGEX:
    /["<>^%\\\u{0000}-\u{001F}\u{007F}-\u{009F}]+/u,
  USERNAME_FORMAT_REGEX: /^[^"<>^%\\\u{0000}-\u{001F}\u{007F}-\u{009F}]+$/u,
};
