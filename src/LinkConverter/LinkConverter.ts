

export function useFixLink() {
  function linkConverter(link?: string): string {
    if(!link) {
      console.error('Link could not be found.')
      return "";
    }

    /*return link.split('&')[0].replace('watch?v=', "embed/");*/
  }

  return { linkConverter }
}

