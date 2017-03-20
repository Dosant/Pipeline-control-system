export function getMessage(stateClass, criticalProperty) {
  let message = '';
  let shortMessage = '';
  const header = `Состояние узла: ${stateClass.name}.`;
  message = header;
  const isCritical = !(stateClass.id === '1' || stateClass.id === '2');
  const body = isCritical
    ? `Необходимо ${stateClass.action}.`
    : `Можно ${stateClass.action}.`;

  message = message + ' ' + body;

  const notify = `Сообщение отправлено ${stateClass.notifyLevel === 1 ? 'оперативной ремонтной бригаде' : 'бригаде с тяжелой техникой и топ-менеджеру'}.`;
  if (notify) {
    message = message + ' ' + notify;
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
