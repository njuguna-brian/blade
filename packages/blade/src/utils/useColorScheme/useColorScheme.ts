import { useState, useCallback } from 'react';
import { getColorScheme } from '../getColorScheme';
import { colorSchemeNamesInput } from '~tokens/theme/theme';
import type { ColorSchemeNames, ColorSchemeNamesInput } from '~tokens/theme';
import { throwBladeError } from '~utils/logger';

export type UseColorScheme = {
  colorScheme: ColorSchemeNames;
  setColorScheme: (colorScheme: ColorSchemeNamesInput) => void;
};

export const useColorScheme = (
  initialColorScheme: ColorSchemeNamesInput = 'light',
): UseColorScheme => {
  // if colorScheme defined use that else fallback to 'light'
  const [colorSchemeState, setColorSchemeState] = useState<ColorSchemeNames>(() =>
    getColorScheme(initialColorScheme),
  );

  const setColorScheme = useCallback(function setThemeMode(colorScheme: ColorSchemeNamesInput) {
    if (__DEV__) {
      if (!colorSchemeNamesInput.includes(colorScheme)) {
        throwBladeError({
          message: `Expected color scheme to be one of [${colorSchemeNamesInput.toString()}] but received ${colorScheme}`,
          moduleName: 'useColorScheme',
        });
      }
    }
    setColorSchemeState(getColorScheme(colorScheme));
  }, []);

  return {
    colorScheme: colorSchemeState,
    setColorScheme,
  };
};
