# artifact.py

from PIL import Image, ImageDraw, ImageFont

class InfoBoxGenerator:
    """
    A class to generate an information box as an image based on an Image ID.
    """

    def __init__(self):
        """
        Initialize the generator with predefined information for each Image ID.
        """
        self.info_texts = {
            "ID1": "Portrait 1\nBirth Year: \nAbout: ",
            "ID2": "Portrait 2\nBirth Year: \nAbout: ",
            "ID3": "Portrait 3\nBirth Year: \nAbout: ",
            "ID4": "Portrait 4\nBirth Year: \nAbout: "
        }

    def generate_info_image(self, marker_id):
        """
        Create and display an information box as an image based on the Image ID.
        :param marker_id: The ID of the image (e.g., "ID1", "ID2").
        """
        # Get the info text for the given ID
        info = self.info_texts.get(marker_id, "No information available for this ID.")

        # Create an image to display the info
        img = Image.new("RGB", (400, 200), color=(255, 255, 255))
        draw = ImageDraw.Draw(img)

        # Use default font for simplicity
        font = ImageFont.load_default()

        # Draw the text on the image
        draw.multiline_text((10, 10), f"Information for {marker_id}:\n{info}", fill=(0, 0, 0), font=font)

        # Display the image
        img.show()

