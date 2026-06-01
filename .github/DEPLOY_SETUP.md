# Деплой через Docker и GitHub Actions

При push в `main` или `master`:

1. GitHub собирает **Docker-образ** (linux/amd64) и публикует в **GitHub Container Registry** (`ghcr.io`)
2. По SSH на сервере выполняется `docker compose pull` и `docker compose up -d`

---

## 1. SSH-ключ для деплоя

Выполни **локально**:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/forestsaver_deploy -N ""
```

Скопируй публичный ключ на сервер (под пользователем `deploy`):

```bash
ssh-copy-id -i ~/.ssh/forestsaver_deploy.pub deploy@pirogylkin.duckdns.org
```

Или вручную на сервере:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "<содержимое forestsaver_deploy.pub>" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 2. Секреты в GitHub

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Значение |
|--------|----------|
| `SSH_HOST` | IP-адрес или домен сервера |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | содержимое файла `~/.ssh/forestsaver_deploy` (приватный ключ) |

`GITHUB_TOKEN` для публикации образа настраивается автоматически.

---

## 3. Подготовка сервера (один раз)

```bash
# Папка для проекта
mkdir -p /home/deploy/forestsaver

# Убедиться, что пользователь deploy входит в группу docker
sudo usermod -aG docker deploy
# перелогиниться в SSH после этого
```

---

## 4. Nginx

Конфиг лежит в `nginx/pirogylkin.duckdns.org.conf`.

```bash
# Скопировать на сервер
sudo cp /home/deploy/forestsaver/nginx/pirogylkin.duckdns.org.conf \
        /etc/nginx/sites-available/pirogylkin.duckdns.org

# Включить сайт
sudo ln -s /etc/nginx/sites-available/pirogylkin.duckdns.org \
           /etc/nginx/sites-enabled/

sudo nginx -t && sudo systemctl reload nginx
```

Для HTTPS через Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d pirogylkin.duckdns.org
```

---

## 5. Пакет GHCR

После первого успешного билда образ появится здесь:  
https://github.com/khvanches/ForestSaver/pkgs/container/forestsaver

Сделай пакет **Public** (Package settings → Change visibility) — тогда серверу не нужна авторизация для `docker pull`.

---

## Локальный запуск

```bash
docker build -t forestsaver .
docker compose up -d
```

Сайт: http://localhost:3000
