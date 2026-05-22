# Деплой через Docker и GitHub Actions

При push в `main` или `master`:

1. GitHub собирает **Docker-образ** и публикует в **GitHub Container Registry** (`ghcr.io`)
2. По SSH на сервере выполняется `docker compose pull` и `docker compose up -d`

## Секреты в GitHub (обязательно)

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Пример | Описание |
|--------|--------|----------|
| `SSH_HOST` | `123.45.67.89` | IP или домен сервера |
| `SSH_USER` | `deploy` | SSH-пользователь |
| `SSH_PRIVATE_KEY` | содержимое ключа | Приватный SSH-ключ целиком |
| `DEPLOY_PATH` | `/opt/forestsaver` | Папка с `docker-compose.yml` на сервере |

## Секреты (по желанию)

| Secret | По умолчанию | Описание |
|--------|--------------|----------|
| `SSH_PORT` | `22` | Порт SSH |
| `APP_PORT` | `3000` | Порт на хосте (проброс в контейнер) |
| `GHCR_DEPLOY_TOKEN` | — | PAT с `read:packages`, если образ **приватный** |

`GITHUB_TOKEN` для публикации образа настраивается автоматически.

## Один раз на сервере

```bash
# Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# перелогиньтесь в SSH

sudo mkdir -p /opt/forestsaver
sudo chown -R $USER:$USER /opt/forestsaver
```

Публичный SSH-ключ — в `~/.ssh/authorized_keys` пользователя `SSH_USER`.

## Пакет GHCR

После первого успешного билда образ появится здесь:  
https://github.com/khvanches/ForestSaver/pkgs/container/forestsaver

Для **публичного** репозитория сделайте пакет **Public** (Package settings → Change visibility), тогда `GHCR_DEPLOY_TOKEN` не нужен.

## Локально

```bash
docker build -t forestsaver .
docker compose up -d
```

Сайт: http://localhost:3000
