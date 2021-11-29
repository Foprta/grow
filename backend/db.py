import psycopg2
from psycopg2 import sql
import uuid
#conn = psycopg2.connect(dbname='grow', user='postgres', 
#                       password='12345', host='localhost')
#cursor = conn.cursor()
#insert = sql.SQL("CREATE TABLE Users (UserId varchar(256), UNIQUE (UserId))")
#cursor.execute(insert)
#conn.commit()
def new_user():
    ID = str(uuid.uuid4())
    try:
        conn = psycopg2.connect(dbname='grow', user='postgres', 
                        password='12345', host='localhost')
        cursor = conn.cursor()
        cursor.execute(sql.SQL("INSERT INTO Users VALUES ('" + ID + "');"))
        conn.commit()
        conn.close()
        cursor.close()
        return ID
    except Exception:
        return Exception

#сделать апи чтобы добавлять новых юзеров 
