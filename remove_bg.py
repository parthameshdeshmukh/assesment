from PIL import Image

def convert_to_transparent_png(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if pixel is close to pure white (#FFFFFF or > 245)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent PNG: {output_path}")

if __name__ == "__main__":
    convert_to_transparent_png(
        r"c:\Users\prath\OneDrive\Desktop\assesment\assets\images\hero_avatar.jpg",
        r"c:\Users\prath\OneDrive\Desktop\assesment\assets\images\hero_avatar_trans.png"
    )
    convert_to_transparent_png(
        r"c:\Users\prath\OneDrive\Desktop\assesment\assets\images\laptop_avatar.jpg",
        r"c:\Users\prath\OneDrive\Desktop\assesment\assets\images\laptop_avatar_trans.png"
    )
