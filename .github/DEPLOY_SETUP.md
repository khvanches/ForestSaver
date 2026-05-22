# Деплой через GitHub Actions

При каждом push в `main` или `master` GitHub собирает проект и выкладывает его на ваш VPS по SSH.

## Секреты в GitHub (обязательно)

Репозиторий → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Пример | Описание |
|--------|--------|----------|
| `SSH_HOST` | `123.45.67.89` | IP или домен сервера |
| `SSH_USER` | `deploy` | SSH-пользователь на сервере |
| `SSH_PRIVATE_KEY` | содержимое `id_rsa` | Приватный SSH-ключ (весь файл, с `BEGIN`/`END`) |
| `DEPLOY_PATH` | `/var/www/forestsaver` | Папка на сервере, куда кладётся сайт |

## Секреты (по желанию)

| Secret | По умолчанию | Описание |
|--------|--------------|----------|
| `SSH_PORT` | `22` | Порт SSH |
| `APP_PORT` | `3000` | Порт, на котором слушает Next.js |

## Один раз на сервере

```bash
# Node.js 20+ и pm2
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Папка для сайта
sudo mkdir -p /var/www/forestsaver
sudo chown -R $USER:$USER /var/www/forestsaver

# Публичный ключ (пара к SSH_PRIVATE_KEY в GitHub) — в ~/.ssh/authorized_keys
```

Проверка: **Actions** → workflow **Build and Deploy** → зелёная галочка после push.
