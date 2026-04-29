import base64

text = "aGVsbG8K"

ans = base64.b64decode(text)
ans = ans.decode()
print(ans)
