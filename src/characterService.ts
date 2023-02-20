import { useReducer } from 'react';
import { v4 } from 'uuid';

export interface Roll {
  guid: string;
  title: string;
  /** script should eventually be a TROLL script */
  script: string;
}

export interface Character {
  guid: string;
  name: string;
  rolls: Roll[]
}

type Action<Name, Payload> = { type: Name, payload: Payload };
type CharacterActions = |
  Action<'new character', { name: string, }> |
  Action<'rename character', { name: string }> |
  // Action<'delete character', never> |
  Action<'new roll', Partial<{ title: string, script: string }>> |
  Action<'rename roll', { guid: string, title: string }> |
  Action<'change roll', { guid: string, script: string }> |
  Action<'delete roll', { guid: string }>;
type CharacterReducer = React.Reducer<Character, CharacterActions>;

const reducer: CharacterReducer = (state, { type, payload }) => {
  let character: Character;
  switch (type) {
    case 'new character':
      return characterFactory(payload.name);
    case 'rename character':
      character = { ...state };
      character.name = payload.name;
      return character;
    // case 'delete character':
    //   return characterFactory();
    case 'new roll':
      character = { ...state };
      character.rolls.push(rollFactory(payload));
      return character;
    case 'rename roll':
    case 'change roll':
      character = { ...state };
      const roll = character.rolls.find(({ guid }) => guid === payload.guid);
      if (!roll) return state;
      Object.assign(roll, payload)
      return character;
    case 'delete roll':
      const rolls = state.rolls.filter(({ guid }) => guid === payload.guid);
      if (rolls.length === state.rolls.length) return state;
      character = { ...state, rolls };
      return character;
    default:
      const never: never = payload
      return state;
  }
}

const defaultCharacter = characterFactory('Onthrop');
defaultCharacter.rolls.push(rollFactory({ title: 'Longsword', script: 'd8' }))
defaultCharacter.rolls.push(rollFactory({ title: 'Longsword (two-handed)', script: 'd10' }))

export function useCharacter() {
  const [character, dispatch] = useReducer(reducer, defaultCharacter);
  return [
    character,
    {
      newCharacter(name: string) {
        dispatch({ type: 'new character', payload: { name } });
      },
      renameCharacter(name: string) {
        dispatch({ type: 'rename character', payload: { name } })
      },
      newRoll(title: string, script: string) {
        dispatch({ type: 'new roll', payload: { title, script } });
      },
      renameRoll(guid: string, title: string) {
        dispatch({ type: 'rename roll', payload: { guid, title } });
      },
      changeRoll(guid: string, script: string) {
        dispatch({ type: 'change roll', payload: { guid, script } });
      },
      deleteRoll(guid: string) {
        dispatch({ type: 'delete roll', payload: { guid } });
      }
    }
  ] as const
}

function characterFactory(name?: string): Character {
  const guid = v4();
  return {
    guid,
    name: name || '',
    rolls: []
  }
}

function rollFactory(roll: Partial<Omit<Roll, 'guid'>>): Roll {
  const guid = v4();
  const title = roll.title || '';
  const script = roll.script || '';
  return { guid, title, script };
}