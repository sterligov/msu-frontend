#!/bin/sh

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ${USER}@${HOST} "\
    set -e && \
    cd ${PROJECT_PATH} && \
    git pull && \
    docker build -t msu-front . && \
    docker stop msu-front && \
    docker rm msu-front && \
    docker run -p '5000:80' -d --name msu-front msu-front"