from rest_framework.permissions import BasePermission

class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.user.is_superuser
    
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in ["GET", "HEAD", "OPTIONS"] or request.user.is_superuser
    
    def has_object_permission(self, request, view, obj):
        return request.method in ["GET", "HEAD", "OPTIONS"] or request.user.is_superuser    