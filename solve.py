import os
import re

# regex to match "name <32 hex chars>"
HASH_PATTERN = re.compile(r"^(.*)\s[0-9a-f]{32}(\.[^.]+)?$")

def clean_name(name):
    match = HASH_PATTERN.match(name)
    if match:
        base = match.group(1)
        ext = match.group(2) or ""
        return base + ext
    return name

def rename_path(path):
    dir_name, base_name = os.path.split(path)
    new_name = clean_name(base_name)

    if new_name != base_name:
        new_path = os.path.join(dir_name, new_name)

        # Handle name conflicts
        counter = 1
        temp_path = new_path
        while os.path.exists(temp_path):
            name, ext = os.path.splitext(new_name)
            temp_path = os.path.join(dir_name, f"{name}_{counter}{ext}")
            counter += 1

        print(f"Renaming: {path} -> {temp_path}")
        os.rename(path, temp_path)
        return temp_path

    return path

def process_directory(root):
    # bottom-up traversal
    for current_root, dirs, files in os.walk(root, topdown=False):

        # rename files
        for file in files:
            full_path = os.path.join(current_root, file)
            rename_path(full_path)

        # rename directories
        for dir in dirs:
            full_path = os.path.join(current_root, dir)
            rename_path(full_path)

if __name__ == "__main__":
    target_dir = input("Enter directory path: ").strip()
    
    if not os.path.isdir(target_dir):
        print("Invalid directory")
    else:
        process_directory(target_dir)
        print("Done.")
