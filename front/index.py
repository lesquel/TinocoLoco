import requests

url = "http://127.0.0.1:8000/events/event/44/reviews/"  
# files = [
#     ('images', open(r'C:\Users\Bryan\Downloads\WhatsApp Image 2024-12-11 at 20.49.40_ea90082c.jpg', 'rb')),
#     ('images', open(r'C:\Users\Bryan\Downloads\TinocoLoco.png', 'rb')),
# ]


headers = {
    "Authorization": "Token 19722ccc03fc0a1a4f165701304df0b31a302aaf", 
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    # Parse the JSON response and print the reviews
    reviews = response.json()
    print("Reviews:", reviews)
else:
    # Print the error message if something went wrong
    print(f"Error: {response.status_code}")
    print(response.text)