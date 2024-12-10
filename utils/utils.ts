export const formatTimeStamp = (timeStamp: any) => {
  const day = timeStamp;
  const year = day.getFullYear();
  const month = ('0' + (day.getMonth() + 1)).slice(-2);
  const days = ('0' + day.getDate()).slice(-2);
  const hours = ('0' + day.getHours()).slice(-2);
  const minutes = ('0' + day.getMinutes()).slice(-2);
  const seconds = ('0' + day.getSeconds()).slice(-2);

  const dateString = month + '-' + days;
  const timeString = hours + ':' + minutes;

  const newTime = dateString + ' ' + timeString;

  return newTime;
};
