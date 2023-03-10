import os

folder_path = "C:/Users/tomas/OneDrive/Obrázky/Prifest"
 
counter = 1

for filename in os.listdir(folder_path):
    old_path = os.path.join(folder_path, filename)
    new_path = os.path.join(folder_path, (str(counter)+".jpg"))
    os.rename(old_path, new_path)
    counter += 1
