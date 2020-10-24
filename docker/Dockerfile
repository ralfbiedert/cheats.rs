FROM ubuntu:latest

ARG ZOLA_URL
ARG CHROME_URL

WORKDIR /workspace

COPY generate_pdf.sh /workspace

RUN export DEBIAN_FRONTEND=noninteractive              \
 && apt update                                         \
 # Install required packages.
 && apt-get install --yes --no-install-recommends      \
      wget                                             \
      ca-certificates                                  \
      netcat                                           \
 # Download & unpack zola.
 && wget --progress=dot:mega $ZOLA_URL -O zola.tgz     \
 && tar zxf zola.tgz                                   \
 # Download & install chrome.
 && wget --progress=dot:mega $CHROME_URL -O chrome.deb \
 && apt-get install --yes --no-install-recommends      \
      $PWD/chrome.deb                                  \
      fonts-noto-color-emoji                           \
 # Clean-up.
 && rm -rf /var/lib/apt/lists/* zola.tgz chrome.deb    \
 && apt-get clean

RUN useradd --create-home runner \
 && chown runner:runner /workspace

USER runner
