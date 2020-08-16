if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const handleClick = async event => {
  console.log(event);

  const whereUserClickedX = Math.round(event.pageX);
  const whereUserClickedY = Math.round(event.pageY);
  const eventPath = event.path;
  const tracking = eventPath.find(
    item => item.dataset.trackingid !== undefined
  );
  console.log(tracking);
  const eventTarget = event.target.outerHTML;
  const timeUserClicked = Math.round(event.timeStamp);
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
      tracking: String(tracking),
      target: eventTarget,
      time: timeUserClicked,
      id: userId,
    }),
  });
};

window.addEventListener('click', handleClick);
