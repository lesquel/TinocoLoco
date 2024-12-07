from cloudinary.templatetags.cloudinary import cloudinary_url

class ImageUtils:
    @staticmethod
    def get_image_url(image, transformations=None):

        if image:
            url, options = cloudinary_url(image.public_id, **(transformations or {}))
            return url
        return None