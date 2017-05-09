function getMessage(stateClass, criticalProperty) {
  let message = '';
  let shortMessage = '';
  const header = `Состояние узла: ${stateClass.name}.`;
  message = header;
  const isCritical = !(stateClass._id === '1' || stateClass._id === '2');
  const body = isCritical && `Необходимо ${stateClass.action.message}.`
  if (body) {
    message = message + ' ' + body;
  }

  if (stateClass.notification.length > 0){
    const notify = `Сообщение отправлено: ` + stateClass.notification.map((notif) => notif.name).join(', ');
    message = message + ' ' + notify + '.';
  }


  if (isCritical) {
    let reason;
    switch (criticalProperty) {
      case 'isolation':
        reason = 'Авария. «Намокание изоляции» или «Замыкание сигнального провода на трубу»';
        break;
      case 'resistance':
        reason = 'Проблема с сигнальными проводниками. Обрыв сигнальных проводников';
        break;
      case 'power':
        reason = 'Проблема с энергоснабжением датчика.';
        break;
      default:
        reason = 'Причина неопределана';
        break;
    }

    if (reason) {
      message = message + ' ' + reason;
      shortMessage = reason;
    }
  } else {
    shortMessage = 'Все хорошо.'
  }

  return {
    message,
    shortMessage
  };
}

module.exports = {
  getMessage
}
