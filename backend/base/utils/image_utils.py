import cloudinary.api

class ImageUtils:
    @staticmethod
    def get_image_url(image):
        try:
            if image:
                url = cloudinary.api.resource(image.public_id).get("url")
                return url
            return None
        except Exception as e:
            return None

    @staticmethod
    def delete_image(image):
        try:
            if image:
                cloudinary_public_id = image.public_id
                cloudinary.api.delete_resources([cloudinary_public_id])
                return True
            return False
        except Exception as e:
            return False