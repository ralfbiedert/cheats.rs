FROM ubuntu:latest

ARG ZOLA_URL

WORKDIR /workspace

RUN export DEBIAN_FRONTEND=noninteractive           \
 && apt update                                      \
 # Install required packages.
 && apt-get install --yes --no-install-recommends   \
      wget                                          \
      ca-certificates                               \
      wkhtmltopdf                                   \
 # Download & unpack zola.
 && wget --progress=dot:mega $ZOLA_URL -O zola.tgz  \
 && tar zxf zola.tgz                                \
 # Clean-up.
 && rm -rf /var/lib/apt/lists/* zola.tgz            \
 && apt-get clean

COPY generate_pdf.sh /workspace

