export const TAG_NAME_MAX_LENGTH = 255;

// does not allow punctuation only
// should have spaces only in between words (not at beginning, not at the end)
// allow any punctuation
// bug: allows punctuation only (#.) and many spaces in between words (my    tag)
export const TAG_NAME_PATTERN = /^[^\.\,\s \-\#\_\/\@]{0,1}$|^\S[\S ]*\S$/;
