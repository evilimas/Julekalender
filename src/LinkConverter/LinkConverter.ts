

export function useFixLink() {
  function linkConverter(url: string): string {
    const toReplace = "watch?v=";
    const replaceWith = "embeded/";

    if(!url) {
      console.error('Url is empty.');
      return "";
    }

    const link = url.split('&')[0];

    if(!link) {
      console.error('Link could not be found.');
      return "";
    }
    return link.replace(toReplace, replaceWith);
  }

  return { linkConverter };
}

