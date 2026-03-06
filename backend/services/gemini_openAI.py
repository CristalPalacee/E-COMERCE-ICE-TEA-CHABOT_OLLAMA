# import google.generativeai as genai
# from config.seeting import get_settings
# from services.product_service import get_product_context

# settings = get_settings()

# # Konfigurasi API Key
# genai.configure(api_key=settings.GEMINI_API_KEY)

# def stream_chat(messages, model_name):
#     # 1. Ambil data produk dari PostgreSQL sebagai konteks
#     user_query = messages[-1]['content'] if messages else ""
#     product_info = get_product_context(user_query)

#     # 2. Inisialisasi model (contoh: 'gemini-1.5-flash')
#     model = genai.GenerativeModel(
#         model_name=model_name,
#         system_instruction=f"Kamu adalah admin toko Es Teh. Gunakan data ini: {product_info}"
#     )

#     # 3. Konversi format pesan (Gemini pakai 'user' & 'model', bukan 'assistant')
#     history = []
#     for msg in messages[:-1]:
#         role = "user" if msg["role"] == "user" else "model"
#         history.append({"role": role, "parts": [msg["content"]]})

#     # 4. Mulai chat dengan streaming
#     chat = model.start_chat(history=history)
#     response = chat.send_message(messages[-1]['content'], stream=True)

#     for chunk in response:
#         if chunk.text:
#             yield chunk.text


#OPEN AI 

# from openai import OpenAI
# from config.seeting import get_settings
# from services.product_service import get_product_context

# settings = get_settings()

# # Inisialisasi Client
# client = OpenAI(api_key=settings.OPENAI_API_KEY)

# def stream_chat(messages, model):
#     user_query = messages[-1]['content']
#     product_info = get_product_context(user_query)

#     # Tambahkan System Prompt dengan Data Produk
#     full_messages = [
#         {"role": "system", "content": f"Kamu admin toko. Data produk: {product_info}"}
#     ] + messages

#     # Gunakan fungsi library
#     response = client.chat.completions.create(
#         model=model, # misal "gpt-4o"
#         messages=full_messages,
#         stream=True
#     )

#     for chunk in response:
#         if chunk.choices[0].delta.content:
#             yield chunk.choices[0].delta.content