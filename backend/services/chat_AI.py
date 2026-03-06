import requests
from config.seeting import get_settings
import json
from database.connect import get_product_context
settings = get_settings()
import pytz
from datetime import datetime
def stream_chat(messages, model):
    
    user_message = messages[-1]['content'] if messages else ""
    product_info = get_product_context(user_message)
    
    tz_jkt = pytz.timezone('Asia/Jakarta')
    now = datetime.now(tz_jkt)
    current_time = now.strftime("%H:%M")
    
    
    SYSTEM_PROMPT = f"""
    Kamu adalah AI assistant Toko Es saya.
    Gunakan data Menu dari database kami di bawah ini untuk menjawab.
    Tugasmu adalah menjawab pertanyaan pelanggan berdasarkan data menu berikut:
    
    DATA Menu DARI DATABASE:
    {product_info}
    
    Kebijakan Toko:
     WAKTU SEKARANG: {current_time}."
    - Buka setiap hari jam 08.00 - 22.00.
    f"Kondisi Belum Buka (Sebelum 08:00): Jika  waktu sekarang({current_time}) < 08:00, AI wajib menjawab: Halo! Terima kasih telah menghubungi kami. Tapi Mohon maaf, saat ini toko kami belum buka".
    f"Kondisi Sudah Tutup (Setelah 22:00): Jika  waktu sekarang({current_time})> 22:00, AI wajib menjawab: Terima kasih telah menghubungi kami. Tapi Saat ini toko kami sudah tutup. Silakan tinggalkan pesan, dan kami akan kembali melayani Anda besok pagi pukul 08:00.".
    - Lokasi di Jl. Merdeka No. 10.
    Aturan:
    1. KAMU HANYA BOLEH MENJAWAB BERDASARKAN 'DATA Menu DARI DATABASE' DI ATAS.
    2. JIKA DATA KOSONG ATAU Menu TIDAK ADA DI DAFTAR, KATAKAN: "Maaf, saat ini kami hanya memiliki Es Teh Susu dan Es Teh Biasa."
    3. JANGAN PERNAH MENGARANG Menu LAIN (seperti es krim, es jeruk, dll) yang tidak ada dalam data.
    4. Jawab dalam Bahasa Indonesia yang sopan.
    5. jika user bertanya ok jawab terima kasih sudah menghubungi kami.
    6. Jika user bertanya 'ada Menu apa saja' atau pertanyaan umum, sebutkan semua daftar di atas.
    7. Jawablah dengan ramah. Jika Menu tidak ada, katakan belum tersedia.
    """

    model_name = model if model else settings.OLLAMA_MODEL

    payload = {
        "model": model_name,
        "messages": [
            {"role": "system",
             "content": SYSTEM_PROMPT
             }
        ] + messages,
        "stream": True
    }

    res = requests.post(
        f"{settings.OLLAMA_URL}/api/chat",
        json=payload,
        timeout=settings.REQUEST_TIMEOUT,
        stream=True
        
    )
    
    for line in res.iter_lines():
        if line:
            chunk = json.loads(line)
            if "message" in chunk and "content" in chunk["message"]:
                content = chunk["message"]["content"]
                print(chunk)
                yield content # Kirim potongan teks satu per satu

 
