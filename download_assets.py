import urllib.request
import os

images = {
    "hero_cake.jpg": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    "vanilla_cream.jpg": "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80",
    "choc_cream.jpg": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80",
    "coffee_cream.jpg": "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1000&q=80",
    "choc_fudge.jpg": "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80",
    "custard_fudge.jpg": "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=1000&q=80",
    "brownie.jpg": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80",
    "orange_cake.jpg": "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1000&q=80",
    "strawberry_cake.jpg": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=80"
}

os.makedirs("images", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    path = os.path.join("images", name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(path, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {name} ({os.path.getsize(path)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")
