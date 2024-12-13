from photos.models import Photo
from ..interfaces.Iservice import IService

class PhotoService(IService):
    model = Photo