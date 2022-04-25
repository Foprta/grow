FROM ubuntu:20.04

RUN echo 'nameserver 8.8.8.8' >> /etc/resolv.conf 

RUN cat /etc/resolv.conf 

RUN apt update -y

RUN apt install -y python3.8 python3-pip

COPY requirements.txt /app/requirements.txt

COPY . /app

WORKDIR /app 

RUN pip3 install -r requirements.txt

CMD python3 main.py
