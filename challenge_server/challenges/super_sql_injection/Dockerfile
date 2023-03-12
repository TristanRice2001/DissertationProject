FROM python:3.11-alpine
COPY ./app /app
COPY ./app/database.db /app/database.db
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["app.py"]

EXPOSE 80
EXPOSE 5000

