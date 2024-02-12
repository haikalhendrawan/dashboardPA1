//
import Card from './Card';
import Button from './Button';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Button(theme)
  );
}