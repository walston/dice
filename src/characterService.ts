export interface Roll {
  title: string;
  /** script should eventually be a TROLL script */
  script: string;
}

export interface Character {
  name: string;
  rolls: Roll[]
}

export function loadCharacter(): Character {
  /** @todo save these in `window.localstorage` for the time being */
  return {
    name: 'Onthrop',
    rolls: [
      { title: 'Longsword', script: '1d8+4' },
      { title: 'Longsword (2-handed)', script: '2d8+4' }
    ]
  }
}

