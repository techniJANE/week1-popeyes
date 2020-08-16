if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const handleClick = async event => {
  console.log(event);

  const whereUserClickedX = Math.round(event.pageX);
  const whereUserClickedY = Math.round(event.pageY);
  const eventPath = event.path.find(
    item => item.dataset.trackingId !== undefined
  );
  const eventTarget = event.target.innerText;
  const timeUserClicked = Math.round(event.timestamp);
  const userId = localStorage.getItem('userId');

  const url = '/clicks';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      clickX: whereUserClickedX,
      clickY: whereUserClickedY,
      path: eventPath,
      target: eventTarget,
      time: timeUserClicked,
      id: userId,
    }),
  });
};

window.addEventListener('click', handleClick);
