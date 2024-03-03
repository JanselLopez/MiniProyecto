export const getPrettyDate = (date:string) =>
  new Date (date).toLocaleDateString ('es-es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
