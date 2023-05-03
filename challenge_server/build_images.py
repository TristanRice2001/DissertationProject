import os

dir_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "challenges")

files = os.scandir(dir_path)

for file in files:
    image_name = file.name.replace("_", "-")
    build_image_command = f"docker build {file.path} -t {image_name}"
    os.system(build_image_command)
