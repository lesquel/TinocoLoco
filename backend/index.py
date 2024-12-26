import requests

image_path = r"C:\Users\Bryan\Downloads\WhatsApp Image 2024-12-11 at 20.49.40_ea90082c.jpg"

api_url = "https://tinocoloco.onrender.com/services/service/{id}/upload-images/"

resource_id = 1
upload_url = api_url.format(id=resource_id)

auth_token = "3ee2be17d4be5470de03942cb4e889eb5af9e5c8"

headers = {
    "Authorization": f"token {auth_token}",
}

with open(image_path, "rb") as image_file:
    files = {"images": image_file}
    response = requests.post(upload_url, headers=headers, files=files)

if response.status_code == 201:
    print("Imagen subida exitosamente:")
    print(response.json())
else:
    print(f"Error al subir la imagen: {response.status_code}")
    print(response.text)
