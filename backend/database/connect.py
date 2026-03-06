import psycopg2
from psycopg2.extras import RealDictCursor
from config.seeting import get_settings


settings = get_settings()
def get_product_context(query_text: str):
    try:
        # Sesuaikan dengan kredensial database Anda
        conn = psycopg2.connect(
            dbname=settings.DB_NAME, 
            user=settings.DB_USER,
            password=settings.DB_PASS,
            host=settings.DB_HOST,
            port=settings.DB_PORT,
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Cari produk yang namanya mirip dengan input user
        sql = 'SELECT name, price, category FROM "Product" WHERE name ILIKE %s LIMIT 3'
        cur.execute(sql, (f"%{query_text}%",))
        products = cur.fetchall()
        
        cur.close()
        conn.close()

        if not products:
            return "Informasi produk tidak ditemukan."

        context = "Berikut daftar produk yang tersedia:\n"
        for p in products:
            context += f"- {p['name']} (Kategori: {p['category']}): Harga Rp {p['price']}\n"
        return context
    except Exception as e:
        print(f"Database Error: {e}")
        return ""