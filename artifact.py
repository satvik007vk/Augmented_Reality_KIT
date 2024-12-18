"""This code creates a temporary Artifact based on the marker id. Currently, it only pops up an image that contains
image randomly generated from a marker ID"""
from PIL import Image, ImageDraw, ImageFont

class InfoBoxGenerator:
    """
    A class to generate an information box based on a marker ID.
    """

    def __init__(self):
        """
        Initialize with predefined information for each market ID.
        """
        self.info_texts = {
            "ID1": "Portrait 1\nBirth Year: xxxx \nAbout: info about the person comes here... ",
            "ID2": "Portrait 2\nBirth Year: xxxx \nAbout: info about the person comes here...",
            "ID3": "Portrait 3\nBirth Year: xxxx \nAbout: info about the person comes here... ",
            "ID4": "Portrait 4\nBirth Year: xxxx \nAbout: info about the person comes here... "
        }

    def generate_info_image(self, marker_id):
        """
        Create and display an information box for the marker ID.
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

