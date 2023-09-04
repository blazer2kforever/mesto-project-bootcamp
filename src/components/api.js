import { networkConfig } from './utils.js';

function sendRequest(url, method, data) {
  const base = {
    method: `${method}`,
    headers: networkConfig.headers,
    body: JSON.stringify(data),
  };
  return fetch(url, base).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() {
  return sendRequest(`${networkConfig.url}/users/me`, 'GET');
}

function changeUserInfo(userName, aboutText) {
  return sendRequest(`${networkConfig.url}/users/me`, 'PATCH', {
    name: userName,
    about: aboutText,
  });
}

function setAvatar(link) {
  return sendRequest(`${networkConfig.url}/users/me/avatar`, 'PATCH', {
    avatar: link,
  });
}

function sendCard(card) {
  return sendRequest(`${networkConfig.url}/cards`, 'POST', {
    name: card.name,
    link: card.link,
  });
}

function deleteCard(card, node) {
  return sendRequest(`${networkConfig.url}/cards/${card.cardId}`, 'DELETE', {
    name: card.name,
    link: card.link,
  })
    .then(() => {
      node.remove();
    })
    .catch((err) => {
      alert(err);
    });
}

function likeCard(card, method) {
  return sendRequest(`${networkConfig.url}/cards/likes/${card.cardId}`, method);
}

function getCard(card) {
  return sendRequest(
    `${networkConfig.url}/cards/likes/${card.cardId}`,
    'DELETE'
  );
}

function getCards() {
  return sendRequest(`${networkConfig.url}/cards`, 'GET');
}

export {
  getUserInfo,
  getCards,
  changeUserInfo,
  sendCard,
  deleteCard,
  likeCard,
  getCard,
  setAvatar,
};
