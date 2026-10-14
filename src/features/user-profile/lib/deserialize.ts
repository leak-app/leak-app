export interface UserIdentityModel {
  initials: string;
  displayName: string;
  email: string;
}

interface UserSource {
  email: string;
  name?: string;
}

const FALLBACK_NAME = 'Người dùng';

const firstLetter = (word: string) => Array.from(word)[0] ?? '';

/** "Minh Anh" becomes "MA", "Minh" becomes "M"; with no name the email's first letter is used. */
export function initialsOf(source: UserSource): string {
  const words = (source.name ?? '').trim().split(/\s+/).filter(Boolean);
  const letters =
    words.length === 0
      ? firstLetter(source.email)
      : words.length === 1
        ? firstLetter(words[0])
        : firstLetter(words[0]) + firstLetter(words[words.length - 1]);
  return letters.toLocaleUpperCase('vi') || '?';
}

export function deserializeUserIdentity(source: UserSource): UserIdentityModel {
  return {
    initials: initialsOf(source),
    displayName: source.name?.trim() || FALLBACK_NAME,
    email: source.email,
  };
}
