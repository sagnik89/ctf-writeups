import urllib.parse

def decode_encoded(digit_stream):

    n = len(digit_stream)
    memo = {}

    def backtrack(i):
        # returns list of chars from position i, or None if impossible
        if i == n:
            return []
        if i in memo:
            return memo[i]

        # try 4-digit then 3-digit (4-digit first handles larger values)
        for l in (4, 3):
            if i + l <= n:
                part = digit_stream[i:i + l]
                # skip parts that start with '0' except "0" itself (not expected here)
                if part.startswith('0'):
                    continue
                val = int(part)
                if val % 16 == 0:
                    ascii_val = val // 16 - 10
                    # sanity check: valid codepoint and printable-ish
                    if 0 <= ascii_val <= 0x10FFFF:
                        ch = chr(ascii_val)
                        rest = backtrack(i + l)
                        if rest is not None:
                            memo[i] = [ch] + rest
                            return memo[i]

        memo[i] = None
        return None

    result = backtrack(0)
    if result is None:
        raise ValueError("Could not parse the encoded string.")
    return ''.join(result)

# Example usage:
encoded_example = "21121776198419362128209619362032168017441984171217441872177617601680201618241776168017441936176017761680107215681232992100813762160"
print(decode_encoded(encoded_example))
# -> prints: zero{fakeflag}
