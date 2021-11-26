import psycopg2
from psycopg2 import sql
#conn = psycopg2.connect(dbname='grow', user='postgres', 
#                       password='12345', host='localhost')
#cursor = conn.cursor()
#insert = sql.SQL("CREATE TABLE Users (UserId varchar(256), UNIQUE (UserId))")
#cursor.execute(insert)
#conn.commit()
def Check_User(ID):
    try:
        conn = psycopg2.connect(dbname='grow', user='postgres', 
                        password='12345', host='localhost')
        cursor = conn.cursor()
        cursor.execute(sql.SQL("INSERT INTO Users VALUES (" +"'" + ID + "'" + ");"))
        conn.commit()
        conn.close()
        cursor.close()
        return ID
    except:
        return ValueError("Smth is broken")

#сделать апи чтобы добавлять новых юзеров 
