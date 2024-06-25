document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('card-login');
  const usernameInput = document.getElementById('username');

  userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();

    if (username) {
      fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
          if (data.message !== 'Not Found') {
            userName.textContent = data.login;
            avatar.src = data.avatar_url;
            followers.textContent = data.followers + ' Seguidores';
            followings.textContent = data.following + ' Seguindo';
            repository.textContent = data.public_repos + ' Repositórios';
            company.textContent = data.company === null ? '@Rocketseat' : data.company;
            locations.textContent = data.location === null ? 'País' : data.location;
          } else {
            message();
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          alert('Failed to load user data.');
        })
        .finally(() => {
          usernameInput.value = '';
        });
    }
  });
});

function message() {
  var notification = document.getElementById('notification-user');
  notification.style.display = 'block';
  
  setTimeout(function() {
    notification.style.display = 'none';
  }, 2500);
}

function randomColor() {
  let red = Math.ceil(Math.random() * 255);
  let green = Math.ceil(Math.random() * 255);
  let blue = Math.ceil(Math.random() * 255);
  return `rgb(${red},${green},${blue})`;
}

document.getElementById('change-background').addEventListener('click', () => {
  const color = randomColor()
  document.querySelector('.card').style.background = color
  document.querySelector('#avatar').style.borderColor = color
})

document.querySelector('#black').addEventListener('click', () => {
  document.querySelector('.card').style.background = '#000'
  document.querySelector('#avatar').style.borderColor = '#8257e5'
})

document.querySelector('#purple').addEventListener('click', () => {
  document.querySelector('.card').style.background = '#8257e5'
  document.querySelector('#avatar').style.borderColor = '#8257e5'
})

document.querySelector('#white').addEventListener('click', () => {
  document.querySelector('.card').style.background = '#fff'
  document.querySelector('#avatar').style.borderColor = '#8257e5'
})

async function downloadCard() {
  document.querySelectorAll('canvas').forEach((canvas) => canvas.remove());

  html2canvas(document.querySelector('#card'), {
    backgroundColor: null,
    allowTaint: false,
    useCORS: true,
  }).then((canvas) => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'RocketCard.png';
    link.click();

  }).catch((erro) => {
    console.error('Erro ao capturar o card:', erro);
  });
}

function clipBoard() {
  var card = document.getElementById('card');

  var textarea = document.createElement('textarea');
  textarea.value = card.innerText;
  document.body.appendChild(textarea);
  
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(textarea);

  notification();
}

function notification() {
  var message = document.getElementById('notification-clipboard');
  message.style.display = 'block';
  
  setTimeout(function() {
    message.style.display = 'none';
  }, 1500);
}
