import os

class ExperimentDetector:
    def __init__(self, image_folder="./data/sample_images"):
        """
        Initialize with the path to folder containing images.
        """
        self.image_folder = image_folder
        self.marker_id = None
        self.image_mapping = self._generate_image_mapping()

    def _generate_image_mapping(self):
        """
        Generate a mapping of image names to IDs.
        :return: Dictionary with keys as numbers and values as IDs (e.g., {"1":"ID1").
        """
        mapping = {}
        images = [f for f in os.listdir(self.image_folder) if f.endswith(('.jpg', '.jpeg', '.png'))]
        for idx, image_name in enumerate(sorted(images), start=1):
            mapping[idx] = f"ID{idx}"
        return mapping

    def get_marker_id(self, number):
        """
        Set and return the marker ID corresponding to the given number.
        :param number: The input number to fetch the corresponding ID.
        :return: Marker ID string (e.g., "ID1").
        """
        if number not in self.image_mapping:
            raise ValueError(f"No image corresponding to the number {number}.")
        self.marker_id = self.image_mapping[number]
        return self.marker_id
