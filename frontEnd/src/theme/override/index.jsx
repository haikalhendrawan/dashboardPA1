//
import Card from './Card';
import Button from './Button';
import Input from './Input'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Button(theme),
    Input(theme)
  );
}