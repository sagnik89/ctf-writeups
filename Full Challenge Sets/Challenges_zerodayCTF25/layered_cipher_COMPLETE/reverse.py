import base64

def rotr8(x, r):
    return ((x >> r) | (x << (8 - r))) & 0xFF

def lcg_stream(seed, n):
    a = 1664525
    c = 1013904223
    m = 2**32
    s = seed & 0xFFFFFFFF
    out = []
    for _ in range(n):
        s = (a * s + c) % m
        out.append((s >> 16) & 0xFF)
    return out

def decode_flag(encoded: str) -> str:
    # Pad base64 string if needed
    padded = encoded + '=' * (-len(encoded) % 4)
    data = base64.urlsafe_b64decode(padded)

    # Extract header
    L = data[0] | (data[1] << 8)
    payload = data[2:]

    # Regenerate keystream
    seed = (L * 0x9E3779B1) & 0xFFFFFFFF
    ks = lcg_stream(seed, len(payload))

    # XOR decryption
    rotated = bytes(b ^ k for b, k in zip(payload, ks))

    # Reverse rotation
    rev = bytes(rotr8(byte, (i % 7) + 1) for i, byte in enumerate(rotated))

    # Reverse byte order
    flag_bytes = rev[::-1]

    return flag_bytes.decode('utf-8')

if __name__ == "__main__":
    enc = input("Enter encoded flag: ").strip()
    print(decode_flag(enc))
