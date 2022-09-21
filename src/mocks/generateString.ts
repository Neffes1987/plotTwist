export function generateString(range: number, schemaString = '123456789abcdef'): string {
  let result = '';
  const schema = schemaString.split('');

  for (let i = 0; i < range; i++) {
    const randomIndex = Math.floor(Math.random() * schema.length - 1);

    result += schema[randomIndex];
  }

  return result;
}
