export const returnSessionOfDate = () => {
  const date = new Date();
  let session = '';
  if (date.getHours() >= 6 && date.getHours() < 12) {
    session = 'sáng';
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    session = 'chiều';
  } else {
    session = 'tối';
  }

  return session;
};
