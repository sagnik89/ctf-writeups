import os
from pyzbar.pyzbar import decode
from PIL import Image
import base64

# Folder containing the QR images
FOLDER_PATH = "qrcodes"       # change this to your folder name
OUTPUT_FILE = "results.txt"

def read_qr_codes(folder_path):
    results = []
    count = 0

    for filename in os.listdir(folder_path):
        if count >= 100:
            break

        # Check for image extensions
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            img_path = os.path.join(folder_path, filename)
            try:
                img = Image.open(img_path)
                decoded = decode(img)
                if decoded:
                    for qr in decoded:
                        text = qr.data.decode('utf-8')

                        ans = base64.b64decode(text)
                        ans = ans.decode()
                        
                        text = ans

                        results.append(f"{filename}: {text}")
                else:
                    results.append(f"{filename}: [No QR found]")
            except Exception as e:
                results.append(f"{filename}: [Error - {e}]")
            count += 1

    return results

def main():
    results = read_qr_codes("qr")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for line in results:
            f.write(line + "\n")

    print(f"✅ Scanned {len(results)} images. Results saved in '{OUTPUT_FILE}'.")

if __name__ == "__main__":
    main()
