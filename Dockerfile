FROM ubuntu:xenial

RUN \
  # configure the "jbooter" user
  groupadd jbooter && \
  useradd jbooter -s /bin/bash -m -g jbooter -G sudo && \
  echo 'jbooter:jbooter' |chpasswd && \
  mkdir /home/jbooter/app && \

  # install open-jdk 8
  apt-get update && \
  apt-get install -y openjdk-8-jdk && \

  # install utilities
  apt-get install -y \
    wget \
    curl \
    vim \
    git \
    zip \
    bzip2 \
    fontconfig \
    python \
    g++ \
    build-essential && \

  # install node.js
  curl -sL https://deb.nodesource.com/setup_6.x | bash && \
  apt-get install -y nodejs && \

  # upgrade npm
  npm install -g npm && \

  # install yarn
  npm install -g yarn && \
  su -c "yarn config set prefix /home/jbooter/.yarn-global" jbooter && \

  # install yeoman bower gulp
  su -c "yarn global add yo bower gulp-cli" jbooter && \

  # cleanup
  apt-get clean && \
  rm -rf \
    /home/jbooter/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# copy sources
COPY . /home/jbooter/generator-jbooter

RUN \
  # fix jbooter user permissions
  chown -R jbooter:jbooter \
    /home/jbooter \
    /usr/lib/node_modules && \

  # install jbooter
  rm -Rf /home/jbooter/generator-jbooter/node_modules \
    /home/jbooter/generator-jbooter/yarn.lock \
    /home/jbooter/generator-jbooter/yarn-error.log && \
  su -c "cd /home/jbooter/generator-jbooter && yarn install" jbooter && \
  su -c "yarn global add file:/home/jbooter/generator-jbooter" jbooter && \

  # cleanup
  rm -rf \
    /home/jbooter/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# expose the working directory, the Tomcat port, the BrowserSync ports
USER jbooter
ENV PATH $PATH:/usr/bin:/home/jbooter/.yarn-global/bin:/home/jbooter/.yarn/bin:/home/jbooter/.config/yarn/global/node_modules/.bin
WORKDIR "/home/jbooter/app"
VOLUME ["/home/jbooter/app"]
EXPOSE 8080 9000 3001
CMD ["tail", "-f", "/home/jbooter/generator-jbooter/generators/server/templates/src/main/resources/banner-no-color.txt"]
