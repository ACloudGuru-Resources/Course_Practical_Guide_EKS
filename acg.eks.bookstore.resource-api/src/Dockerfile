FROM python:3
ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . /
CMD [ "gunicorn", "--worker-tmp-dir", "/dev/shm", "--bind", "0.0.0.0:5000", "wsgi:app" ]