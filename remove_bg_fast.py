from PIL import Image
import os

def process_transparent_bg(file_path):
    if not os.path.exists(file_path):
        return
    img = Image.open(file_path).convert('RGBA')
    pix = img.load()
    width, height = img.size

    for x in range(width):
        for y in range(height):
            r, g, b, a = pix[x, y]
            # Near-white background cutoff
            if r > 225 and g > 225 and b > 225:
                # distance from 255
                diff = min(r, g, b)
                if diff > 240:
                    pix[x, y] = (r, g, b, 0)
                else:
                    alpha = int((255 - diff) * (255 / 15))
                    pix[x, y] = (r, g, b, min(a, alpha))

    img.save(file_path, 'PNG')
    print(f"Removed background for {file_path}")

assets = [
    'src/assets/main_salad_bowl.png',
    'src/assets/mini_burger.png',
    'src/assets/mini_cake.png',
    'src/assets/mini_salad.png',
    'src/assets/cherry_tomato_slice.png',
    'src/assets/red_chili_pepper.png',
    'src/assets/parsley_leaf.png'
]

for a in assets:
    process_transparent_bg(a)
