from cloudinary.templatetags.cloudinary import cloudinary_url
import cloudinary.api


class ImageUtils:
    @staticmethod
    def get_image_url(image):
        try:
            if image:
                print(image.public_id)
                url = cloudinary.api.resource(image.public_id).get("url")
                print(url)
                return url
            return None
        except Exception as e:
            print(e)
            return None
