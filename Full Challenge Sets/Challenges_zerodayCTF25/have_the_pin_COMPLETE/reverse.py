text = "954312"
data = text.encode('utf-8')
decoded = data.decode()
print(data)        # b'hello world'
print(decoded)
print(type(data))  # <class 'bytes'>
