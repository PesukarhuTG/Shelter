export const getData = async () => {
  const response = await fetch('../../assets/pets.json');
  const data = await response.json();
  return data;
}