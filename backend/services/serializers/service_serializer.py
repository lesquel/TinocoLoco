from rest_framework import serializers
from services.models import Service
from photos.serializers import RetrievePhotoSerializer, CreatePhotoSerializer

class ServiceSerializer(serializers.ModelSerializer):
    photos = RetrievePhotoSerializer(many=True, required=False)
    new_photos  = CreatePhotoSerializer(many=True, required=False)
    class Meta:
        model = Service
        fields = "__all__"
        
    def create(self, validated_data):
        photos_data = validated_data.pop('new_photos')
        service = Service.objects.create(**validated_data)
        for photo_data in photos_data:
            photo_serializer = CreatePhotoSerializer(data=photo_data)
            photo_serializer.is_valid(raise_exception=True)
            photo_serializer.save(content_object=service)
            
        return service
    def update(self, instance, validated_data):
        new_photos = validated_data.pop('new_photos')
        
        new_photos_data = validated_data.pop("new_photos", [])

        for photo_data in new_photos_data:
            photo_serializer = CreatePhotoSerializer(data=photo_data)
            photo_serializer.is_valid(raise_exception=True)
            photo_serializer.save(content_object=instance) 

        return super().update(instance, validated_data)